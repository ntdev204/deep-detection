"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/human-detection", label: "Human" },
  { href: "/traffic-detection", label: "Traffic" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full h-20 z-50 border-b border-border bg-card/80 px-6 py-4 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between">
        <Link href="/" className="flex cursor-pointer items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
            <svg
              className="size-6 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">
            Deep Detection
          </span>
        </Link>

        <ul className="flex items-center gap-2">
          <ModeToggle />
          <Separator orientation="vertical" className="h-6!" />
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="transition-colors duration-200"
                  asChild
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
