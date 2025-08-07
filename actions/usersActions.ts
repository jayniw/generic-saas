"use server";
import { createClient } from "@/lib/client";
import type { UserProfile } from "@/types/user";
import { revalidatePath } from "next/cache";

export async function getAllUsersWithProfiles(): Promise<UserProfile[]> {
  const supabase = createClient();

  // Obtenemos usuarios y perfiles
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id, full_name, document_type, document_number, phone_number, role, email");

  if (profilesError) {
    console.log("🚀 ~ getAllUsersWithProfiles ~ profilesError:", profilesError)
  }

  // Mapear a formato plano
  return (profiles || []).map((profile)=>{
    return {
      userId: profile.user_id,
      email:  profile.email,
      fullName: profile.full_name ?? '',
      role: profile.role ?? undefined,
      phoneNumber: profile.phone_number ?? '',
      documentType: profile.document_type ?? '',
      documentNumber: profile.document_number ?? '',
      avatarUrl: undefined,
    };
  });
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>,updatedBy: string) {
  const supabase = createClient();

  // const { data: { user: currentUser } } = await supabase.auth.getUser();
  // console.log("🚀 ~ updateUserProfile ~ currentUser:", currentUser)
  // const updatedBy = currentUser?.id || 'system';

  // Prepare the data for the profiles table
  const profileUpdates = {
    full_name: updates.fullName,
    role: updates.role,
    phone_number: updates.phoneNumber,
    document_type: updates.documentType,
    document_number: updates.documentNumber,
    updated_at: new Date().toISOString(),
    updated_by: updatedBy
  };

  const { data, error } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('user_id', userId)
    .select();

  if (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update user profile');
  }

  // Revalidate the users page to show updated data
  revalidatePath('/users');
  
  return data?.[0];
}
