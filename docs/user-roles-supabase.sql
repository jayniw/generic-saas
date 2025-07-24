-- SQL para gestión de roles y datos extra de usuario en Supabase
-- 1. Crear tabla de perfiles si no existe
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  document_type text,
  document_number text,
  phone text,
  role text default 'client',
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. Asegúrate de que la columna 'role' tenga los valores válidos
-- Puedes usar un constraint CHECK o manejarlo a nivel de aplicación
-- Ejemplo (opcional):
-- alter table profiles add constraint valid_role check (role in ('operator','supervisor','administrator','client'));

-- 3. Para guardar datos extra al hacer signup, usa un trigger o inserta en profiles después de crear el usuario en auth.users

-- 4. Ejemplo de consulta para asignar rol:
-- update profiles set role = 'operator' where id = '<user_id>';
