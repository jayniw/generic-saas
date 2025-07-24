export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <main className="flex items-center justify-center p-4">{children}</main>
  );
}
