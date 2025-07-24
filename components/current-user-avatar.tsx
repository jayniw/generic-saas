'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/context/user-context'

export const CurrentUserAvatar = () => {
  const { user } = useUser()
const profileImage = user?.user_metadata?.avatar_url ?? null
const name = user?.user_metadata?.full_name ?? '?'
  const initials = name
  ?.trim()
    ?.split(' ')
    ?.map((word: string) => word[0])
    ?.join('')
    ?.toUpperCase()

  return (
    <Avatar>
      {profileImage && (
        <AvatarImage
          src={profileImage}
          alt={name ?? 'User avatar'}
        />
      )}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
