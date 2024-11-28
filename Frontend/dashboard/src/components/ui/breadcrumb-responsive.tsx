"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ITEMS_TO_DISPLAY = 3

export function BreadcrumbResponsive() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const pathname = usePathname()

  // Split the pathname into segments and filter out any empty strings
  const pathSegments = pathname.split("/").filter(Boolean)

  // Generate the breadcrumb items dynamically
  const items = [
    { href: "/", label: "Home" },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/")
      const label = decodeURIComponent(segment).replace(/-/g, " ")
      return { href, label }
    }),
  ]

  // Determine if we need to display the ellipsis
  const shouldDisplayEllipsis = items.length > ITEMS_TO_DISPLAY

  // Items to display before the ellipsis
  const initialItems = items.slice(0, 1) // Always include "Home"

  // Items to display after the ellipsis
  const endItems = shouldDisplayEllipsis
    ? items.slice(-2)
    : items.slice(1)

  // Items to include in the dropdown or drawer
  const overflowItems = shouldDisplayEllipsis
    ? items.slice(1, -2)
    : []

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {initialItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < initialItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}

        {shouldDisplayEllipsis && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {overflowItems.map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {overflowItems.map((item, index) => (
                        <Link key={index} href={item.href} className="py-1 text-sm">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
          </>
        )}

        {endItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            {endItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {index < endItems.length - 1 ? (
                    <BreadcrumbLink
                      asChild
                      className="max-w-20 truncate md:max-w-none"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < endItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbResponsive
