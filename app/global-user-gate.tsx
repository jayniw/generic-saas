"use client"
import { ReactNode } from "react"
import { useUser } from "@/context/user-context"
import { GlobalLoader } from "@/components/global-loader"

export function GlobalUserGate({ children }: Readonly<{ children: ReactNode }>) {
  const { loading } = useUser()
  if (loading) return <GlobalLoader />
  return <>{children}</>
}
