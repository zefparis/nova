"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Wallet,
  CandlestickChart,
  Banknote,
  TrendingUp,
  ListOrdered,
  ArrowLeftRight,
  Gift,
  Users,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Spot", href: "/trade/BTC-USDT", icon: CandlestickChart },
  { label: "Funding", href: "/wallet", icon: Banknote },
  { label: "Futures", href: "/trade/BTC-USDT", icon: TrendingUp },
  { label: "Orders", href: "/transactions", icon: ListOrdered },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Rewards", href: "/dashboard", icon: Gift },
  { label: "Referrals", href: "/dashboard", icon: Users },
  { label: "Settings", href: "/dashboard", icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4 lg:hidden">
          <span className="text-sm font-semibold">Menu</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-0.5 p-2 lg:mt-2">
          {items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0 opacity-80" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden p-3 lg:block">
          <div className="rounded-md border border-border bg-card/60 p-3 text-xs text-muted-foreground">
            Demo interface — simulated market data.
          </div>
        </div>
      </aside>
    </>
  );
}
