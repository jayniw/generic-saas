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

Este flujo asegura que todos los datos extra y el rol se gestionan correctamente y de forma segura en Supabase.
