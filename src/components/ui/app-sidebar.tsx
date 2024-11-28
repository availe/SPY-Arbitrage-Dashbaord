"use client";

import { Home, QrCode } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
      url: "/qr-code",
      icon: QrCode,
    },
  ],
  navOther: [
    {
      name: "QA Code",
      url: "/qi-code",
      icon: QrCode,
    },
  ],
};

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarContent>
              <NavSection projects={data.navMain} />
              <NavSection projects={data.navOther} />
            </SidebarContent>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
