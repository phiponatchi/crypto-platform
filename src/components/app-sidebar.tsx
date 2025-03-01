"use client"

import * as React from "react"
import {
  Box,
  DatabaseIcon,
  LucideLayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { User } from "@/db/schema"

const data = {
  user: {
    username: "user",
    email: "user@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LucideLayoutDashboard,
      isActive: true,
    },
    {
      title: "Data",
      url: "/dashboard/data",
      icon: DatabaseIcon,
      isActive: true,
      items: [
        {
          title: "Acquisitions/Entrées",
          url: "/dashboard/data#acquisitions",
          icon: DatabaseIcon,
          isActive: true,
        },
        {
          title: "Cessions/Sorties",
          url: "/dashboard/data#transfers",
          icon: DatabaseIcon,
          isActive: true,
        },
      ]
    },
  ],
}

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Box className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Crypto</span>
                  <span className="truncate text-xs">CryptoTrack</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
