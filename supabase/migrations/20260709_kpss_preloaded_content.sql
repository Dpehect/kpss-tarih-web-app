-- KPSS Tarih preloaded content store
-- Public eğitim içeriği JSONB bundle olarak Supabase'de hazır bekler.

create table if not exists public.kpss_content_bundles (
  key text primary key,
  kind text not null,
  topic_id text,
  content_hash text not null,
  payload jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists kpss_content_bundles_kind_idx on public.kpss_content_bundles(kind);
create index if not exists kpss_content_bundles_topic_idx on public.kpss_content_bundles(topic_id);
create index if not exists kpss_content_bundles_updated_idx on public.kpss_content_bundles(updated_at desc);

alter table public.kpss_content_bundles enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'kpss_content_bundles'
      and policyname = 'Public read KPSS content bundles'
  ) then
    create policy "Public read KPSS content bundles"
      on public.kpss_content_bundles
      for select
      using (true);
  end if;
end $$;
