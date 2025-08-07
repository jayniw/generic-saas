"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, X, Pencil, Save } from "lucide-react";
import Image from "next/image";
import { UserProfile } from "@/types/user";
import AvatarPlaceholder from "@/components/icons/AvatarPlaceholder";
import { useUser } from "@/context/user-context";
import { roles } from "@/data/roles";
import { documentTypes } from "@/data/document-type";
import { updateUserProfile } from "@/actions/usersActions";



export function UserCard({ user: initialUser }: Readonly<{ user: UserProfile }>) {
  const { user: currentUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<UserProfile>({ ...initialUser });
  const [originalUser] = useState<UserProfile>({ ...initialUser });
  const [error, setError] = useState<string | null>(null);

  const isAdmin = currentUser?.user_metadata?.role === 'admin';
  const isCurrentUser = currentUser?.id === user.userId;
  const canEdit = isAdmin || isCurrentUser;

  const handleSave = async () => {
    if (!user.userId) {
      setError('No se pudo identificar al usuario');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      
      // Call the server action to update the profile
      await updateUserProfile(user.userId, {
        fullName: user.fullName,
        role: user.role,
        phoneNumber: user.phoneNumber,
        documentType: user.documentType,
        documentNumber: user.documentNumber
      },currentUser?.id || 'system');
      
      // Update the original user state
      originalUser.fullName = user.fullName;
      originalUser.role = user.role;
      originalUser.phoneNumber = user.phoneNumber;
      originalUser.documentType = user.documentType;
      originalUser.documentNumber = user.documentNumber;
      
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving user:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setUser({ ...originalUser });
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-[220px] shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="flex flex-col items-center p-2 gap-2 w-full">
        {/* avatar */}
        <div className="flex flex-col items-center w-full relative">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.fullName || ""}
              className="rounded-full w-16 h-16 object-cover border-2 border-primary shadow"
              width={64}
              height={64}
            />
          ) : (
            <div className="scale-75">
              <AvatarPlaceholder />
            </div>
          )}
          
          {canEdit && !isEditing && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-8 w-8 rounded-full"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {/* fullname */}
          <div className="mt-2 text-base font-semibold text-foreground text-center line-clamp-1 w-full">
            {isEditing ? (
              <Input
                value={user.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="h-8 text-center"
              />
            ) : (
              user.fullName
            )}
          </div>
          {/* email */}
          <div className="text-xs text-muted-foreground text-center line-clamp-1 w-full">
            {isEditing ? (
              <Input
                value={user.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-6 text-xs text-center"
                disabled={!isAdmin} // Only admin can change email
              />
            ) : (
              user.email
            )}
          </div>
          {/* role */}
          {user.role && (
            <span className="mt-1 px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs">
              {isEditing && isAdmin ? (
                <Select
                  value={user.role}
                  onValueChange={(value) => handleChange('role', value)}
                >
                  <SelectTrigger className="h-6 w-24">
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(({value, label}) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                user.role
              )}
            </span>
          )}
        </div>
        
        <div className="w-full mt-2 space-y-2 border-t pt-3">
          {/* phone number */}
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-muted-foreground">Teléfono:</span>
            {isEditing ? (
              <Input
                value={user.phoneNumber || ''}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="h-7 w-28 text-right"
              />
            ) : (
              <span className="text-foreground text-right">{user.phoneNumber || '-'}</span>
            )}
          </div>
          {/* document number */}
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-muted-foreground">Documento:</span>
            {isEditing ? (
              <Input
                value={user.documentNumber || ''}
                onChange={(e) => handleChange('documentNumber', e.target.value)}
                className="h-7 w-28 text-right"
              />
            ) : (
              <span className="text-foreground text-right">{user.documentNumber || '-'}</span>
            )}
          </div>
          {/* document type */}
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-muted-foreground">Tipo:</span>
            {isEditing ? (
              <Select
                value={user.documentType || ''}
                onValueChange={(value) => handleChange('documentType', value)}
              >
                <SelectTrigger className="h-7 w-28">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(({value, label}) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <span className="text-foreground text-right">{user.documentType || '-'}</span>
            )}
          </div>
        </div>
        {/* save and cancel buttons */}
        {isEditing && (
          <div className="flex flex-col w-full gap-2 mt-3">
            {error && (
              <div className="text-sm text-red-500 mb-2">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleCancel}
                className="h-8"
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-1" />
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="h-8"
                disabled={!isEditing || isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Guardar
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
