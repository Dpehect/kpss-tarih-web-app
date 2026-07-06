-- KPSS Tarih Web App — user progress schema
-- İçerikler JSON'da kalır; kullanıcıya özel ilerleme Supabase'de tutulur.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_topic_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null,
  completed boolean not null default true,
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(user_id, topic_id)
);

create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  topic_id text not null,
  selected_choice_id text not null,
  correct_choice_id text not null,
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);

create table if not exists public.flashcard_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  topic_id text not null,
  remembered boolean not null,
  reviewed_at timestamptz not null default now()
);

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_id text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  completed_at timestamptz not null default now()
);

create table if not exists public.user_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_user_topic_progress_user_id
  on public.user_topic_progress(user_id);

create index if not exists idx_question_attempts_user_id_answered_at
  on public.question_attempts(user_id, answered_at desc);

create index if not exists idx_question_attempts_user_id_topic_id
  on public.question_attempts(user_id, topic_id);

create index if not exists idx_flashcard_reviews_user_id_reviewed_at
  on public.flashcard_reviews(user_id, reviewed_at desc);

create index if not exists idx_exam_results_user_id_completed_at
  on public.exam_results(user_id, completed_at desc);

create index if not exists idx_user_notes_user_id_created_at
  on public.user_notes(user_id, created_at desc);

-- Yeni Google kullanıcısı oluşunca profile satırı otomatik oluşturulur.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;

create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_user_profile();

-- RLS
alter table public.profiles enable row level security;
alter table public.user_topic_progress enable row level security;
alter table public.question_attempts enable row level security;
alter table public.flashcard_reviews enable row level security;
alter table public.exam_results enable row level security;
alter table public.user_notes enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles for select
using ((select auth.uid()) = id);

create policy "profiles_update_own"
on public.profiles for update
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "topic_progress_select_own" on public.user_topic_progress;
drop policy if exists "topic_progress_insert_own" on public.user_topic_progress;
drop policy if exists "topic_progress_update_own" on public.user_topic_progress;
drop policy if exists "topic_progress_delete_own" on public.user_topic_progress;

create policy "topic_progress_select_own"
on public.user_topic_progress for select
using ((select auth.uid()) = user_id);

create policy "topic_progress_insert_own"
on public.user_topic_progress for insert
with check ((select auth.uid()) = user_id);

create policy "topic_progress_update_own"
on public.user_topic_progress for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "topic_progress_delete_own"
on public.user_topic_progress for delete
using ((select auth.uid()) = user_id);

drop policy if exists "question_attempts_select_own" on public.question_attempts;
drop policy if exists "question_attempts_insert_own" on public.question_attempts;
drop policy if exists "question_attempts_delete_own" on public.question_attempts;

create policy "question_attempts_select_own"
on public.question_attempts for select
using ((select auth.uid()) = user_id);

create policy "question_attempts_insert_own"
on public.question_attempts for insert
with check ((select auth.uid()) = user_id);

create policy "question_attempts_delete_own"
on public.question_attempts for delete
using ((select auth.uid()) = user_id);

drop policy if exists "flashcard_reviews_select_own" on public.flashcard_reviews;
drop policy if exists "flashcard_reviews_insert_own" on public.flashcard_reviews;
drop policy if exists "flashcard_reviews_delete_own" on public.flashcard_reviews;

create policy "flashcard_reviews_select_own"
on public.flashcard_reviews for select
using ((select auth.uid()) = user_id);

create policy "flashcard_reviews_insert_own"
on public.flashcard_reviews for insert
with check ((select auth.uid()) = user_id);

create policy "flashcard_reviews_delete_own"
on public.flashcard_reviews for delete
using ((select auth.uid()) = user_id);

drop policy if exists "exam_results_select_own" on public.exam_results;
drop policy if exists "exam_results_insert_own" on public.exam_results;
drop policy if exists "exam_results_delete_own" on public.exam_results;

create policy "exam_results_select_own"
on public.exam_results for select
using ((select auth.uid()) = user_id);

create policy "exam_results_insert_own"
on public.exam_results for insert
with check ((select auth.uid()) = user_id);

create policy "exam_results_delete_own"
on public.exam_results for delete
using ((select auth.uid()) = user_id);

drop policy if exists "user_notes_select_own" on public.user_notes;
drop policy if exists "user_notes_insert_own" on public.user_notes;
drop policy if exists "user_notes_update_own" on public.user_notes;
drop policy if exists "user_notes_delete_own" on public.user_notes;

create policy "user_notes_select_own"
on public.user_notes for select
using ((select auth.uid()) = user_id);

create policy "user_notes_insert_own"
on public.user_notes for insert
with check ((select auth.uid()) = user_id);

create policy "user_notes_update_own"
on public.user_notes for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "user_notes_delete_own"
on public.user_notes for delete
using ((select auth.uid()) = user_id);
