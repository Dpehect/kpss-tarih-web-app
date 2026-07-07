-- Softbridge KPSS content schema
-- Amaç: Büyük soru / şık / flashcard datasını client bundle yerine Supabase'de parça parça okutmak.
-- Bu şema public-read eğitim içeriği + user-private progress mantığına uygundur.

create extension if not exists pgcrypto;

create table if not exists public.content_topics (
  id text primary key,
  slug text not null unique,
  title text not null,
  era text not null,
  short_description text not null,
  exam_importance integer not null default 0,
  estimated_minutes integer not null default 0,
  keywords jsonb not null default '[]'::jsonb,
  summary jsonb not null default '[]'::jsonb,
  must_know jsonb not null default '[]'::jsonb,
  common_mistakes jsonb not null default '[]'::jsonb,
  quick_timeline jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.content_tests (
  id text primary key,
  topic_id text not null references public.content_topics(id) on delete cascade,
  title text not null,
  level text not null check (level in ('kolay', 'orta', 'zor')),
  level_label text not null,
  test_no integer not null,
  question_count integer not null default 30,
  is_published boolean not null default true,
  updated_at timestamptz not null default now(),
  unique(topic_id, level, test_no)
);

create table if not exists public.content_questions (
  id text primary key,
  topic_id text not null references public.content_topics(id) on delete cascade,
  test_id text references public.content_tests(id) on delete cascade,
  type text not null check (type in ('single', 'case', 'chronology')),
  difficulty text not null check (difficulty in ('temel', 'orta', 'ileri')),
  stem text not null,
  correct_choice_id text not null,
  explanation text not null,
  exam_tip text not null,
  tags jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.content_question_choices (
  id uuid primary key default gen_random_uuid(),
  question_id text not null references public.content_questions(id) on delete cascade,
  choice_id text not null check (choice_id in ('A', 'B', 'C', 'D', 'E')),
  text text not null,
  sort_order integer not null default 0,
  unique(question_id, choice_id)
);

create table if not exists public.content_flashcards (
  id text primary key,
  topic_id text not null references public.content_topics(id) on delete cascade,
  front text not null,
  back text not null,
  hint text not null,
  tags jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.content_timeline_events (
  id text primary key,
  topic_id text not null references public.content_topics(id) on delete cascade,
  date text not null,
  title text not null,
  description text not null,
  tone text not null default 'turquoise',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Performans indexleri
create index if not exists idx_content_topics_published_order
  on public.content_topics(is_published, sort_order);

create index if not exists idx_content_tests_topic_level
  on public.content_tests(topic_id, level, test_no)
  where is_published = true;

create index if not exists idx_content_questions_test_order
  on public.content_questions(test_id, sort_order)
  where is_published = true;

create index if not exists idx_content_questions_topic_difficulty
  on public.content_questions(topic_id, difficulty)
  where is_published = true;

create index if not exists idx_content_question_choices_question_order
  on public.content_question_choices(question_id, sort_order);

create index if not exists idx_content_flashcards_topic_order
  on public.content_flashcards(topic_id, sort_order)
  where is_published = true;

create index if not exists idx_content_timeline_topic_order
  on public.content_timeline_events(topic_id, sort_order)
  where is_published = true;

-- Public eğitim içeriği herkes tarafından okunabilir.
alter table public.content_topics enable row level security;
alter table public.content_tests enable row level security;
alter table public.content_questions enable row level security;
alter table public.content_question_choices enable row level security;
alter table public.content_flashcards enable row level security;
alter table public.content_timeline_events enable row level security;

drop policy if exists "Public read published topics" on public.content_topics;
create policy "Public read published topics"
on public.content_topics for select
using (is_published = true);

drop policy if exists "Public read published tests" on public.content_tests;
create policy "Public read published tests"
on public.content_tests for select
using (is_published = true);

drop policy if exists "Public read published questions" on public.content_questions;
create policy "Public read published questions"
on public.content_questions for select
using (is_published = true);

drop policy if exists "Public read question choices" on public.content_question_choices;
create policy "Public read question choices"
on public.content_question_choices for select
using (
  exists (
    select 1
    from public.content_questions q
    where q.id = question_id
      and q.is_published = true
  )
);

drop policy if exists "Public read published flashcards" on public.content_flashcards;
create policy "Public read published flashcards"
on public.content_flashcards for select
using (is_published = true);

drop policy if exists "Public read published timeline events" on public.content_timeline_events;
create policy "Public read published timeline events"
on public.content_timeline_events for select
using (is_published = true);
