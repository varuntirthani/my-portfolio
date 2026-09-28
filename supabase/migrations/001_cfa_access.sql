create table if not exists public.cfa_access_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  requested_level text not null
    check (requested_level in ('L1', 'L2', 'L3')),
  approved_level text
    check (approved_level is null or approved_level in ('L1', 'L2', 'L3')),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

create index if not exists cfa_access_requests_status_idx
  on public.cfa_access_requests (status, created_at desc);

alter table public.cfa_access_requests enable row level security;
alter table public.cfa_access_requests force row level security;

create or replace function public.is_cfa_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'vgttir@gmail.com';
$$;

revoke all on function public.is_cfa_admin() from public;
grant execute on function public.is_cfa_admin() to authenticated;

drop policy if exists "Users can read their CFA request"
  on public.cfa_access_requests;
create policy "Users can read their CFA request"
  on public.cfa_access_requests
  for select
  to authenticated
  using (auth.uid() = user_id or public.is_cfa_admin());

drop policy if exists "CFA admin can review requests"
  on public.cfa_access_requests;
create policy "CFA admin can review requests"
  on public.cfa_access_requests
  for update
  to authenticated
  using (public.is_cfa_admin())
  with check (public.is_cfa_admin());

create or replace function public.request_cfa_access(level_input text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  current_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
  request_id uuid;
begin
  if current_user_id is null or current_email = '' then
    raise exception 'Authentication required';
  end if;

  if level_input not in ('L1', 'L2', 'L3') then
    raise exception 'Invalid CFA level';
  end if;

  insert into public.cfa_access_requests (
    user_id,
    email,
    requested_level,
    approved_level,
    status,
    created_at,
    updated_at,
    reviewed_at,
    reviewed_by
  )
  values (
    current_user_id,
    current_email,
    level_input,
    null,
    'pending',
    now(),
    now(),
    null,
    null
  )
  on conflict (user_id) do update
  set
    email = excluded.email,
    requested_level = excluded.requested_level,
    approved_level = null,
    status = 'pending',
    updated_at = now(),
    reviewed_at = null,
    reviewed_by = null
  returning id into request_id;

  return request_id;
end;
$$;

revoke all on function public.request_cfa_access(text) from public;
revoke all on function public.request_cfa_access(text) from anon;
grant execute on function public.request_cfa_access(text) to authenticated;
