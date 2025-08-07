"use client"

import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link"
import { useUser } from "@/context/user-context"
import { useMemo, ComponentType, SVGProps } from "react"

type NavItem = {
  title: string
  url: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  role?: string[]
}

export function NavMain({ items }: Readonly<{ items: NavItem[] }>) {
  const { user } = useUser()
  
  const filteredItems = useMemo(() => {
    if (!user) return [];
    
    const userRole = user.user_metadata?.role || 'client';
    
    return items.filter(item => {
      // If no role is specified, the item is visible to everyone
      if (!item.role || item.role.length === 0) return true;

      // Check if user's role is in the allowed roles for this item
      return item.role.includes(userRole);
    });
  }, [items, user]);

  if (!user) {
    return null
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="secondary"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {filteredItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                <Link href={item.url} className="flex items-center">
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
