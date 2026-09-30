-- Adler-Selbsttest: Ergebnistabelle (anonym)
create table if not exists public.results (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  type text not null check (type in ('macher','mitlaeufer','ausweicher','mitgestalter','mitgestalter_leise')),
  aktivitaet smallint not null check (aktivitaet between 0 and 100),
  gemeinschaft smallint not null check (gemeinschaft between 0 and 100),
  adler_score smallint not null check (adler_score between 0 and 18),
  birth text check (birth in ('aeltestes','mittleres','juengstes','einzelkind'))
);

alter table public.results enable row level security;

-- Jeder darf ein Ergebnis eintragen und die Ergebnisse lesen – mehr nicht.
drop policy if exists "insert results" on public.results;
create policy "insert results" on public.results for insert to anon, authenticated with check (true);
drop policy if exists "read results" on public.results;
create policy "read results" on public.results for select to anon, authenticated using (true);

-- Ändern und Löschen komplett sperren (auch ohne Policy zusätzlich die Rechte entziehen)
revoke update, delete, truncate on public.results from anon, authenticated;
grant select, insert on public.results to anon, authenticated;
