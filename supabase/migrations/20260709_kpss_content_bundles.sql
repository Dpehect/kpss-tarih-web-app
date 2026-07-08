create table if not exists public.kpss_content_bundles (
  id text primary key,
  kind text not null,
  key text not null,
  payload jsonb not null,
  checksum text,
  source text not null default 'repo-seed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, key)
);

create index if not exists kpss_content_bundles_kind_idx on public.kpss_content_bundles(kind);
create index if not exists kpss_content_bundles_kind_key_idx on public.kpss_content_bundles(kind, key);
create index if not exists kpss_content_bundles_payload_gin_idx on public.kpss_content_bundles using gin(payload jsonb_path_ops);

alter table public.kpss_content_bundles enable row level security;

drop policy if exists "kpss content public read" on public.kpss_content_bundles;
create policy "kpss content public read"
  on public.kpss_content_bundles
  for select
  to anon, authenticated
  using (true);

drop policy if exists "kpss content service role write" on public.kpss_content_bundles;
create policy "kpss content service role write"
  on public.kpss_content_bundles
  for all
  to service_role
  using (true)
  with check (true);

create or replace function public.set_kpss_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_kpss_content_updated_at on public.kpss_content_bundles;
create trigger trg_kpss_content_updated_at
  before update on public.kpss_content_bundles
  for each row execute function public.set_kpss_content_updated_at();
