"use client";

import { Home, QrCode } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { NavSection } from "./nav-section";

// Menu items.
const data = {
  navMain: [
    {
      name: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      name: "QR Code",
      url: "/share",
      icon: QrCode,
    },
  ],
  navOther: [
    {
      name: "QA Code",
      url: "/share",
      icon: QrCode,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarContent>
              <NavSection projects={data.navMain} label="Main" />
              <NavSection projects={data.navOther} label="Info" />
            </SidebarContent>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
