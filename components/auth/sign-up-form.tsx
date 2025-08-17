'use client'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { documentTypes } from '@/data/document-type'

export function SignUpForm({ className, ...props }: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const t = useTranslations('signup');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }
    if (!fullName || !documentType || !documentNumber || !phone) {
      setError('Por favor completa todos los campos')
      setIsLoading(false)
      return
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            document_type: documentType,
            document_number: documentNumber,
            phone_number: phone,
            email: email,
            role: 'client',
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      })
      if (error) {
        // Manejar errores específicos de Supabase
        if (error.message.includes('already registered')) {
          setError('Este correo electrónico ya está registrado')
        } else {
          throw error
        }
      } else if (data?.user?.identities?.length === 0) {
        // Si no se crearon identidades, probablemente el usuario ya existe
        setError('Este correo electrónico ya está registrado')
      } else {
        // Solo redirigir si el registro fue exitoso
        router.push('/auth/sign-up-success')
      }
    } catch (error: unknown) {
      console.error("Error en el registro:", error)
      setError(error instanceof Error ? error.message : t('error.unknown'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">{t('fullName')}</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nombre completo"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t('documentNumber')}</Label>
                <div className="flex gap-2">
                  <select
                    id="documentType"
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-1/3 min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    required
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                  >
                    {documentTypes.map((docType) => (
                      <option key={docType.value} value={docType.value}>
                        {docType.label}
                      </option>
                    ))}
                  </select>
                  <Input
                    id="documentNumber"
                    type="text"
                    className="w-2/3"
                    placeholder="Número de documento"
                    required
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Teléfono"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('password')}</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">{t('repeatPassword')}</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('submit') + '...' : t('submit')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('alreadyAccount')}{' '}
              <Link href="/auth/login" className="underline underline-offset-4">
                {t('login')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
