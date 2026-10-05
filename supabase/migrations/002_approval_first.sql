-- Approval-first access: visitors submit an email and level without signing in.
-- Auth accounts are created only when the administrator approves a request.

alter table public.cfa_access_requests
  alter column user_id drop not null;

update public.cfa_access_requests set email = lower(trim(email));

create unique index if not exists cfa_access_requests_email_key
  on public.cfa_access_requests (email);

drop policy if exists "Users can read their CFA request"
  on public.cfa_access_requests;
create policy "Users can read their CFA request"
  on public.cfa_access_requests
  for select
  to authenticated
  using (
    email = lower(coalesce(auth.jwt() ->> 'email', ''))
    or public.is_cfa_admin()
  );

drop function if exists public.request_cfa_access(text);

-- Returns 'created' only when a new review is needed, so the caller knows
-- whether to notify the administrator. Callers must not reveal the result.
create or replace function public.submit_cfa_access_request(
  email_input text,
  level_input text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_email text := lower(trim(coalesce(email_input, '')));
  existing public.cfa_access_requests%rowtype;
  recent_requests integer;
begin
  if normalized_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    or length(normalized_email) > 254 then
    raise exception 'Invalid email';
  end if;

  if level_input not in ('L1', 'L2', 'L3') then
    raise exception 'Invalid CFA level';
  end if;

  select * into existing
  from public.cfa_access_requests
  where email = normalized_email;

  if found then
    if existing.status = 'rejected'
      and existing.reviewed_at < now() - interval '7 days' then
      update public.cfa_access_requests
      set
        requested_level = level_input,
        approved_level = null,
        status = 'pending',
        updated_at = now(),
        reviewed_at = null,
        reviewed_by = null
      where id = existing.id;
      return 'created';
    end if;

    return existing.status;
  end if;

  select count(*) into recent_requests
  from public.cfa_access_requests
  where created_at > now() - interval '1 hour';

  if recent_requests >= 20 then
    raise exception 'Too many requests';
  end if;

  insert into public.cfa_access_requests (email, requested_level)
  values (normalized_email, level_input);

  return 'created';
end;
$$;

revoke all on function public.submit_cfa_access_request(text, text) from public;
grant execute on function public.submit_cfa_access_request(text, text)
  to anon, authenticated;
