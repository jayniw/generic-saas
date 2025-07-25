import { AppSidebar } from "@/components/root/app-sidebar";
import { SiteHeader } from "@/components/root/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col h-0 min-h-0 w-full max-w-full">
        <div className="flex-1 min-h-0 overflow-auto p-4 pt-0 w-full max-w-full">
          {children}
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
)
}
