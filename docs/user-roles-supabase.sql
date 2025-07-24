-- SQL para gestión de roles y datos extra de usuario en Supabase
-- 1. Crear tabla de perfiles si no existe
create table if not exists public.profiles (
  user_id uuid not null,
  full_name text null,
  role text not null default 'client'::text,
  document_number text null,
  document_type text not null default 'CI'::text,
  phone_number text null,
  created_at timestamp with time zone null default now(),
  last_login timestamp with time zone null,
  constraint profiles_pkey primary key (user_id),
  constraint profiles_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_profiles_role on public.profiles using btree (role) TABLESPACE pg_default;

-- 2. Asegúrate de que la columna 'role' tenga los valores válidos
-- Puedes usar un constraint CHECK o manejarlo a nivel de aplicación
-- Ejemplo (opcional):
-- alter table profiles add constraint valid_role check (role in ('operator','supervisor','administrator','client'));

-- 3. Para guardar datos extra al hacer signup, usa un trigger o inserta en profiles después de crear el usuario en auth.users

-- 4. Ejemplo de consulta para asignar rol:
-- update profiles set role = 'operator' where id = '<user_id>';
