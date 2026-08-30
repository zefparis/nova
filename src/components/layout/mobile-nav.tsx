"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, CandlestickChart, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Markets", href: "/markets", icon: BarChart3 },
  { label: "Trade", href: "/trade/BTC-USDT", icon: CandlestickChart },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Profile", href: "/dashboard", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t border-border bg-background/95 backdrop-blur lg:hidden">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[10px] transition-colors",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
