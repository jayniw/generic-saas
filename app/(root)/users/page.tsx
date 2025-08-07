import { getAllUsersWithProfiles } from "@/actions/usersActions";
import { UserCard } from "@/components/user-card";
import { UserProfile } from "@/types/user";
import { mockUsers } from "@/data/mock-users";

export default async function UsersPage() {
  const users: UserProfile[] = await getAllUsersWithProfiles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Usuarios</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Usuarios del Sistema</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard key={user.userId} user={user} />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Usuarios de Ejemplo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockUsers.map((user) => (
            <UserCard key={user.userId} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
