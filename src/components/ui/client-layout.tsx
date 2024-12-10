"use client";

import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import BreadcrumbResponsive from "@/components/ui/breadcrumb-responsive";
import MdxLayout from "@/components/ui/mdx-layout";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ClientLayout({
  defaultOpen,
  children,
}: {
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      size={isMobile ? "lg" : "default"}
    >
      <AppSidebar />
      <main className="w-full flex flex-col">
        <div className="flex items-center">
            <SidebarTrigger />
            <BreadcrumbResponsive />
        </div>
        <MdxLayout>{children}</MdxLayout>
      </main>
    </SidebarProvider>
  );
}
