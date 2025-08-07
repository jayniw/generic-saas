export interface UserProfile {
  userId: string;
  email: string;
  fullName?: string;
  role?: string;
  phoneNumber?: string;
  documentType?: string;
  documentNumber?: string;
  avatarUrl?: string;
}

export interface SupabaseProfile {
  user_id: string;
  users: {
    email: string;
  };
  full_name?: string;
  role?: string;
  phone_number?: string;
  document_type?: string;
  document_number?: string;
  avatar_url?: string;
}
