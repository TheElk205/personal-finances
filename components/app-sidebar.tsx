"use client"

import * as React from "react"
import {
  Bot,
  GalleryVerticalEnd,
  Table,
  FileUp, SquareTerminal, BookOpen, Settings2
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
import {NavProjects} from "@/components/nav-projects";

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
          url: "./monthly-digest",
        },
        {
          title: "Expense Overview",
          url: "./overview",
        },

      ],
    },
    {
      title: "Data Management",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Upload",
          url: "./upload",
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
