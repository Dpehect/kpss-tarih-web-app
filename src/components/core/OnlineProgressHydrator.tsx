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

export function OnlineProgressHydrator() {
  const hydrateFromRemote = useStudyProgressStore((state) => state.hydrateFromRemote);
  const getSnapshot = useStudyProgressStore((state) => state.getSnapshot);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!supabase) return;

    const client = supabase;
    let cancelled = false;

    async function hydrateAndMaybeSync() {
      const {
        data: { user }
      } = await client.auth.getUser();

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

    const { data } = client.auth.onAuthStateChange((_event, session) => {
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
