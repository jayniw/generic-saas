import { UserProfile } from "@/types/user";


export const mockUsers: UserProfile[] = [
  {
    userId:"1",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Admin",
    phoneNumber: "123456789",
    documentType: "DNI",
    documentNumber: "12345678",
  },
  {
    userId:"2",
    fullName: "Bob Smith",
    email: "bob@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg",
    role: "User",
    phoneNumber: "123456789",
    documentType: "DNI",
    documentNumber: "12345678",
  },
  {
    userId:"3",
    fullName: "Carla Gomez",
    email: "carla@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/women/47.jpg",
    role: "Manager",
    phoneNumber: "123456789",
    documentType: "DNI",
    documentNumber: "12345678",
  },
  {
    userId:"4",
    fullName: "David Lee",
    email: "david@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/48.jpg",
    role: "Support",
    phoneNumber: "123456789",
    documentType: "DNI",
    documentNumber: "12345678",
  },
];
