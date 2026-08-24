-- FIX RLS para Opção B (alunos / professores / coordenadores)
-- Rode no SQL Editor do Supabase: https://gmrvbqztwdrbstaspcfa.supabase.co

-- 1. Garante que o Email provider está ativo (se você desativou sem querer)
-- Vá em Authentication > Providers > Email > Enable Email = ON, Confirm email = OFF

-- 2. Políticas RLS para permitir cadastro (insert) e login (select)
-- Alunos
alter table public.alunos enable row level security;
drop policy if exists "alunos_insert_own" on public.alunos;
create policy "alunos_insert_own" on public.alunos for insert with check (auth.uid() = id);
drop policy if exists "alunos_select_all" on public.alunos;
create policy "alunos_select_all" on public.alunos for select using (true);
drop policy if exists "alunos_select_own" on public.alunos;
create policy "alunos_select_own" on public.alunos for select using (auth.uid() = id);
drop policy if exists "alunos_update_own" on public.alunos;
create policy "alunos_update_own" on public.alunos for update using (auth.uid() = id);

-- Professores
alter table public.professores enable row level security;
drop policy if exists "professores_insert_own" on public.professores;
create policy "professores_insert_own" on public.professores for insert with check (auth.uid() = id);
drop policy if exists "professores_select_all" on public.professores;
create policy "professores_select_all" on public.professores for select using (true);
drop policy if exists "professores_select_own" on public.professores;
create policy "professores_select_own" on public.professores for select using (auth.uid() = id);

-- Coordenadores
alter table public.coordenadores enable row level security;
drop policy if exists "coordenadores_insert_own" on public.coordenadores;
create policy "coordenadores_insert_own" on public.coordenadores for insert with check (auth.uid() = id);
drop policy if exists "coordenadores_select_all" on public.coordenadores;
create policy "coordenadores_select_all" on public.coordenadores for select using (true);
drop policy if exists "coordenadores_select_own" on public.coordenadores;
create policy "coordenadores_select_own" on public.coordenadores for select using (auth.uid() = id);

-- Verifica
select schemaname, tablename, policyname, cmd from pg_policies where tablename in ('alunos','professores','coordenadores');
