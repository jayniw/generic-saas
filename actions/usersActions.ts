"use server";
import { createClient } from "@/lib/client";
import type { UserProfile } from "@/types/user";

export async function getAllUsersWithProfiles(): Promise<UserProfile[]> {
  const supabase = createClient();

  // Obtenemos usuarios y perfiles
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id, full_name, document_type, document_number, phone_number, role");

  if (profilesError) {
    console.log("🚀 ~ getAllUsersWithProfiles ~ profilesError:", profilesError)
  }

  // Mapear a formato plano
  return (profiles || []).map((profile)=>{
    return {
      userId: profile.user_id,
      email:  '',
      fullName: profile.full_name ?? '',
      role: profile.role ?? undefined,
      phoneNumber: profile.phone_number ?? '',
      documentType: profile.document_type ?? '',
      documentNumber: profile.document_number ?? '',
      avatarUrl: undefined,
    };
  });
}
