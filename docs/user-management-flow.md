# Gestión de usuarios y roles con Supabase

## 1. Estructura recomendada en Supabase

- Tabla `profiles` enlazada a `auth.users` (por `id` UUID)
- Campos requeridos en `profiles`:
  - `full_name` (texto)
  - `document_type` (texto)
  - `document_number` (texto)
  - `phone` (texto)
  - `role` (texto, valores: operator, supervisor, administrator, client)

## 2. Flujo de registro (signup)

1. Usuario llena formulario con:
   - Email
   - Password
   - Nombre completo
   - Tipo de documento
   - Número de documento
   - Teléfono
2. Se crea el usuario en `auth.users` vía Supabase Auth.
3. Se inserta un registro en `profiles` con el mismo `id` del usuario y los datos extra.
4. El rol por defecto es `client`. Puede ser actualizado luego por un administrador.

## 3. Ejemplo de código para guardar datos extra

```ts
// Después de supabase.auth.signUp({ email, password })
const user = ... // el usuario creado
await supabase.from('profiles').insert({
  id: user.id,
  full_name,
  document_type,
  document_number,
  phone,
  role: 'client', // o el rol que corresponda
})
```

## 4. Asignación y gestión de roles

- Para cambiar el rol de un usuario:

```sql
update profiles set role = 'operator' where id = '<user_id>';
```

- El frontend puede consultar el rol del usuario autenticado y condicionar la UI según corresponda.

## 5. Seguridad

- Usa RLS en Supabase para proteger la tabla `profiles`.
- Solo administradores deben poder cambiar el campo `role` de otros usuarios.

---

## 6. Seguridad avanzada: RLS y protección de roles

Para que los datos sean realmente seguros y ningún usuario pueda cambiar su propio rol (ni el de otros), debes usar Row Level Security (RLS) en la tabla `profiles`.

- **Cada usuario solo puede ver y editar sus propios datos**, excepto el campo `role`.
- **Solo los administradores pueden modificar el campo `role`** de cualquier usuario.

### Ejemplo de políticas RLS:

```sql
-- Habilitar RLS
aLTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Solo puedes ver/editar tu perfil (excepto el campo role)
CREATE POLICY "Users can manage own profile" ON profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Función para saber si eres administrador
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'administrator'
  );
$$ language sql stable;

-- Usuarios pueden editar sus datos, excepto el campo role
CREATE POLICY "Users can update own profile except role" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = old.role);

-- Solo administradores pueden cambiar el campo role
CREATE POLICY "Only admin can update role" ON profiles
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (true);
```

Estas políticas aseguran que:
- Nadie puede cambiar su propio rol (ni el de otros), salvo los administradores.
- Los usuarios pueden mantener actualizados sus datos personales.

---

Este flujo asegura que todos los datos extra y el rol se gestionan correctamente y de forma segura en Supabase.
