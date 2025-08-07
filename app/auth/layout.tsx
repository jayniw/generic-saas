export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex-1 min-h-0 overflow-auto p-4 pt-0 w-full max-w-full max-h-[90vh]">{children}</div>
}