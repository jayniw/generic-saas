-- Habilitar RLS en la tabla profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Permitir que cada usuario sólo pueda ver y editar su propio perfil
CREATE POLICY "Users can manage own profile" ON profiles
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Permitir que solo administradores puedan cambiar el campo 'role' (ni el propio usuario puede cambiar su rol)
-- El resto de campos sí pueden ser modificados por el propio usuario

-- 1. Función para saber si el usuario es admin
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where user_id = auth.uid() and role = 'administrator'
  );
$$ language sql stable;

-- 2. Política para UPDATE de cualquier campo excepto 'role' (el usuario puede modificar sus propios datos, excepto el rol)
CREATE POLICY "Users can update own profile except role" ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND role = old.role);

-- 3. Política para que solo admin pueda modificar el campo 'role'
CREATE POLICY "Prevent role changes by non-admins" ON profiles
  FOR UPDATE
  WITH CHECK (
    is_admin() OR 
    (auth.uid() = user_id AND 
     (SELECT role FROM profiles WHERE user_id = auth.uid()) = 
     (SELECT role FROM profiles WHERE user_id = auth.uid()))
  );

-- (Opcional) Puedes ajustar o agregar más políticas según tus necesidades.
