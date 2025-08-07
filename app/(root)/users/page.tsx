import { getAllUsersWithProfiles } from "@/actions/usersActions";
import { UserProfile } from "@/types/user";
import { UsersPageContent } from "@/components/user/users-content";

export default async function UsersPage() {
  const users: UserProfile[] = await getAllUsersWithProfiles();
  
  return <UsersPageContent allUsers={users} />;
}
