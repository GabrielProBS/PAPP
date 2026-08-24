-- PAPP - Supabase Schema (Professor / Coordenador / Aluno)
-- Execute no SQL Editor do Supabase: https://gmrvbqztwdrbstaspcfa.supabase.co

-- 1. PROFILES (extende auth.users com papel)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('aluno','professor','coordenador')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Permite leitura do próprio perfil e inserção no cadastro
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
-- Coordenador e professor podem ver todos (ajuste conforme RLS desejado)
create policy "profiles_select_all_authenticated" on public.profiles for select using (auth.role() = 'authenticated');

-- 2. DISCIPLINAS
create table if not exists public.disciplinas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  ano text not null, -- ex: '1º Ano', '2º Ano'
  created_at timestamptz default now()
);

alter table public.disciplinas enable row level security;
create policy "disciplinas_select_all" on public.disciplinas for select using (true);

-- 3. PROGRESSAO PARCIAL (vínculo aluno-disciplina)
create table if not exists public.progressao_parcial (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references public.profiles(id) on delete cascade,
  disciplina_id uuid not null references public.disciplinas(id) on delete cascade,
  professor_id uuid references public.profiles(id),
  status text not null check (status in ('Pendente','Enviado','Em Avaliação','Aprovado','Reprovado')),
  prazo date,
  material_url text,
  nota numeric(4,2),
  ciclo text not null default '2024.1', -- ex: 2024.1
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(aluno_id, disciplina_id, ciclo)
);

alter table public.progressao_parcial enable row level security;
create policy "pp_select_own_or_prof" on public.progressao_parcial for select using (
  auth.uid() = aluno_id or auth.uid() = professor_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'coordenador')
);
create policy "pp_insert_prof_coord" on public.progressao_parcial for insert with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('professor','coordenador'))
);
create policy "pp_update_prof_coord" on public.progressao_parcial for update using (
  auth.uid() = professor_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'coordenador')
);

-- 4. ENTREGAS (opcional, se quiser separar envio de atividade)
create table if not exists public.entregas (
  id uuid primary key default gen_random_uuid(),
  progressao_id uuid not null references public.progressao_parcial(id) on delete cascade,
  aluno_id uuid not null references public.profiles(id),
  arquivo_url text not null,
  status text not null default 'Enviado' check (status in ('Enviado','Em Avaliação','Aprovado','Reprovado')),
  created_at timestamptz default now()
);

alter table public.entregas enable row level security;
create policy "entregas_select_related" on public.entregas for select using (
  auth.uid() = aluno_id or exists (select 1 from public.progressao_parcial pp where pp.id = progressao_id and pp.professor_id = auth.uid())
);

-- Trigger para updated_at
create or replace function public.handle_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists trg_pp_updated_at on public.progressao_parcial;
create trigger trg_pp_updated_at before update on public.progressao_parcial for each row execute function public.handle_updated_at();

-- Trigger para criar profile automaticamente no signup (usa user_metadata.role)
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data->>'role','aluno')
  );
  return new;
end; $$ language plpgsql security definer;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Seed disciplinas
insert into public.disciplinas (nome, ano) values
  ('Matemática','2º Ano'),
  ('Física','2º Ano'),
  ('Química','1º Ano'),
  ('História','1º Ano'),
  ('Biologia','2º Ano'),
  ('Português','2º Ano')
on conflict do nothing;

-- Exemplo de views úteis para dashboard do coordenador
create or replace view public.v_dashboard_stats as
select
  (select count(*)::text from public.profiles where role='aluno') as total_alunos,
  (select count(*) from public.progressao_parcial where status in ('Pendente','Enviado','Em Avaliação')) as pendencias_total;

-- Nota: Para testar localmente sem auth real, as telas usam mocks e caem em fallback.
-- Quando o Supabase estiver configurado, troque os mocks em TelaProfessor.jsx e TelaCoordenador.jsx por:
-- const { data } = await supabase.from('progressao_parcial').select('*, aluno:aluno_id(full_name), disciplina:disciplina_id(nome)')
