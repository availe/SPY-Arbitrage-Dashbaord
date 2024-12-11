"use client";

import { BarChart2, BookOpen, FileText, GitBranch, QrCode, RotateCw, Users } from "lucide-react";

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
      name: "HMM Model",
      url: "/",
      icon: BarChart2,
    },
    {
      name: "Tree Model",
      url: "/tree",
      icon: GitBranch,
    },
    {
      name: "Backtest",
      url: "/backtest",
      icon: RotateCw,
    },
  ],
  navOther: [
    {
      name: "About Us",
      url: "/about",
      icon: Users,
    },
    {
      name: "Overview",
      url: "/overview",
      icon: FileText,
    },
    {
      name: "Extra Info",
      url: "/primer",
      icon: BookOpen,
    },
    {
      name: "QR Code",
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
          <SidebarGroupLabel>SPY Arbitrage Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarContent>
              <NavSection projects={data.navMain} label="Project" />
              <NavSection projects={data.navOther} label="Info" />
            </SidebarContent>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
