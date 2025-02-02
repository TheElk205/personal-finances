"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Table,
  Settings2,
  Database
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Sparkasse Ferdi",
      logo: GalleryVerticalEnd,
      plan: "Girokonto",
    },
  ],
  navMain: [

    {
      title: "Money",
      url: "#",
      icon: Table,
      items: [
        {
          title: "Monthly Digest",
          url: "/money/monthly-digest",
        },
        {
          title: "Expense Overview",
          url: "/money/overview",
        },

      ],
    },
    {
      title: "Data Management",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Upload",
          url: "/dataManagement/upload",
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Similar Booking",
          url: "/settings/similarBookings",
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
