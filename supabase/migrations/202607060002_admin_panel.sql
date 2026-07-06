-- KPSS Tarih Web App — Admin panel schema and policies
-- Admin hesap: gurlekyunusemre2@gmail.com
-- Not: email farklıysa aşağıdaki public.is_admin() fonksiyonundaki email'i değiştir.

create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'gurlekyunusemre2@gmail.com';
$$;

create table if not exists public.admin_content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('topic', 'question', 'flashcard', 'exam', 'timeline', 'glossary', 'announcement')),
  title text not null,
  description text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_admin_content_items_type_status
  on public.admin_content_items(type, status);

create index if not exists idx_admin_content_items_created_at
  on public.admin_content_items(created_at desc);

alter table public.admin_content_items enable row level security;

drop policy if exists "admin_content_items_admin_select" on public.admin_content_items;
drop policy if exists "admin_content_items_admin_insert" on public.admin_content_items;
drop policy if exists "admin_content_items_admin_update" on public.admin_content_items;
drop policy if exists "admin_content_items_admin_delete" on public.admin_content_items;

create policy "admin_content_items_admin_select"
on public.admin_content_items for select
using (public.is_admin());

create policy "admin_content_items_admin_insert"
on public.admin_content_items for insert
with check (public.is_admin());

create policy "admin_content_items_admin_update"
on public.admin_content_items for update
using (public.is_admin())
with check (public.is_admin());

create policy "admin_content_items_admin_delete"
on public.admin_content_items for delete
using (public.is_admin());

-- Admin kullanıcının tüm kullanıcı istatistiklerini okuyabilmesi için SELECT policy'leri.
drop policy if exists "profiles_admin_select_all" on public.profiles;
create policy "profiles_admin_select_all"
on public.profiles for select
using (public.is_admin());

drop policy if exists "topic_progress_admin_select_all" on public.user_topic_progress;
create policy "topic_progress_admin_select_all"
on public.user_topic_progress for select
using (public.is_admin());

drop policy if exists "question_attempts_admin_select_all" on public.question_attempts;
create policy "question_attempts_admin_select_all"
on public.question_attempts for select
using (public.is_admin());

drop policy if exists "flashcard_reviews_admin_select_all" on public.flashcard_reviews;
create policy "flashcard_reviews_admin_select_all"
on public.flashcard_reviews for select
using (public.is_admin());

drop policy if exists "exam_results_admin_select_all" on public.exam_results;
create policy "exam_results_admin_select_all"
on public.exam_results for select
using (public.is_admin());

drop policy if exists "user_notes_admin_select_all" on public.user_notes;
create policy "user_notes_admin_select_all"
on public.user_notes for select
using (public.is_admin());
