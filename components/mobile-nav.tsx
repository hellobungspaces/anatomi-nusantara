"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav({
  links,
}: {
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger
          render={<Button variant="outline" className="h-11 px-4 text-[0.95rem]" />}
        >
          Menu
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="font-display text-lg">Menu</SheetTitle>
          </SheetHeader>
          <nav aria-label="Utama" className="flex flex-col px-2">
            {links.map((l) => (
              <SheetClose
                key={l.href}
                render={
                  <Link
                    href={l.href}
                    className="rounded-md px-3 py-3 font-display text-xl hover:bg-muted"
                  />
                }
              >
                {l.label}
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
