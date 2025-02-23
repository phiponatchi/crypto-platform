"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/scroll-area"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

const NavItems = ({ items, className, ...props }: SidebarNavProps) => {
  const pathname = usePathname()
  return (
    <>
      <nav
        className={cn(
          "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 py-4",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </>)
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <>
      <ScrollArea className="w-100 whitespace-nowrap rounded-md md:hidden">
        <div className="flex w-max space-x-4">
          <NavItems items={items} {...props} className=""/>
          <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent dark:from-transparent dark:to-transparent bg-transparent pointer-events-none"></div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <NavItems items={items} {...props} className="hidden md:flex" />
    </>
  )
}
