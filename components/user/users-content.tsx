"use client";

import { UserProfile } from "@/types/user";
import { UserCard } from "@/components/user/user-card";
import { useUser } from "@/context/user-context";
import { useEffect, useState } from "react";

type UsersPageContentProps = {
  allUsers: UserProfile[];
};

export function UsersPageContent({ allUsers }: Readonly<UsersPageContentProps>) {
  const { user: currentUser } = useUser();
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const adminStatus = currentUser.user_metadata?.role === 'admin';
    setIsAdmin(adminStatus);

    if (adminStatus) {
      setFilteredUsers(allUsers);
    } else {
      // Filter to show only the current user's profile
      const currentUserProfile = allUsers.find(
        (user) => user.userId === currentUser.id
      );
      setFilteredUsers(currentUserProfile ? [currentUserProfile] : []);
    }
  }, [currentUser, allUsers]);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{isAdmin ? 'Usuarios' : 'Mi Perfil'}</h1>

      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.userId} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
