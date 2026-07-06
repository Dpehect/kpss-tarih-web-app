"use client";

import { useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  fetchOnlineProgress,
  syncLocalProgressToOnline,
  type RemoteProgressPayload
} from "@/lib/progress/online-progress";
import { useStudyProgressStore } from "@/store/useStudyProgressStore";

function hasProgress(payload: RemoteProgressPayload) {
  return (
    payload.completedTopicIds.length > 0 ||
    payload.questionAttempts.length > 0 ||
    payload.flashcardReviews.length > 0 ||
    payload.examResults.length > 0 ||
    payload.notes.length > 0
  );
}

/**
 * Supabase progress senkronizasyonu sessiz çalışır.
 * Eski sürümde local veriyi her girişte tekrar upload etme riski vardı; bu durum
 * question_attempts / flashcard_reviews satırlarını şişirebiliyordu.
 */
export function OnlineProgressHydrator() {
  const hydrateFromRemote = useStudyProgressStore((state) => state.hydrateFromRemote);
  const getSnapshot = useStudyProgressStore((state) => state.getSnapshot);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let cancelled = false;

    async function hydrateAndMaybeSync() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user || cancelled) return;

      const localSnapshot = getSnapshot();
      const localHasData = hasProgress(localSnapshot);
      const remoteProgress = await fetchOnlineProgress();

      if (cancelled) return;

      const remoteHasData = remoteProgress ? hasProgress(remoteProgress) : false;
      const syncKey = `kpss-tarih-local-progress-synced:${user.id}`;
      const alreadySynced = localStorage.getItem(syncKey) === "1";

      if (remoteProgress) {
        hydrateFromRemote(remoteProgress);
      }

      /**
       * Yalnızca remote tamamen boşsa ve bu kullanıcı için daha önce local upload yapılmadıysa
       * localStorage fallback verisini Supabase'e taşır. Böylece tekrar tekrar insert oluşmaz.
       */
      if (localHasData && !remoteHasData && !alreadySynced) {
        const result = await syncLocalProgressToOnline(localSnapshot);
        localStorage.setItem(syncKey, result.ok ? "1" : "0");

        const refreshed = await fetchOnlineProgress();
        if (!cancelled && refreshed) {
          hydrateFromRemote(refreshed);
        }
      }
    }

    void hydrateAndMaybeSync();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        void hydrateAndMaybeSync();
      }
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, [getSnapshot, hydrateFromRemote, supabase]);

  return null;
}
