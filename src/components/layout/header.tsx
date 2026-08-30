"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Wallet,
  Bell,
  ChevronDown,
  Menu,
  LayoutGrid,
  Gift,
  Users,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Buy Crypto", href: "/dashboard" },
  { label: "Markets", href: "/markets" },
  { label: "Trade", href: "/trade/BTC-USDT" },
  { label: "Derivatives", href: "/trade/BTC-USDT" },
  { label: "Earn", href: "/wallet" },
  { label: "More", href: "/transactions" },
];

export function Header({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-3 backdrop-blur md:px-4">
      {/* mobile sidebar toggle */}
      <button
        type="button"
        onClick={onOpenSidebar}
        className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* logo */}
      <Link href="/dashboard" className="flex items-center gap-2 pr-2">
        <Logo />
        <span className="hidden text-base font-semibold tracking-tight sm:inline"><BINANCE></BINANCE></span>
      </Link>

      {/* primary nav */}
      <nav className="ml-2 hidden items-center gap-1 md:flex">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded px-3 py-1.5 text-sm transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-1 md:gap-2">
        <button
          type="button"
          className="hidden h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground sm:grid"
          aria-label="Search"
        >
          <Search className="h-[18px] w-[18px]" />
        </button>

        <Link
          href="/wallet"
          className="hidden items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/15 sm:inline-flex"
        >
          <Wallet className="h-4 w-4" />
          Wallet
        </Link>

        <button
          type="button"
          className="relative grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>

        <Dropdown
          align="right"
          trigger={
            <span className="flex items-center gap-1.5 rounded-md p-1 pr-2 hover:bg-accent">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-amber-600 text-[11px] font-bold text-primary-foreground">
                BN
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          }
        >
          <div className="px-2.5 py-2">
            <div className="text-sm font-medium">Ben Nolan</div>
            <div className="text-xs text-muted-foreground">ben@binance.io</div>
          </div>
          <div className="my-1 h-px bg-border" />
          <DropdownItem>
            <UserCircle className="h-4 w-4" /> Profile
          </DropdownItem>
          <DropdownItem>
            <LayoutGrid className="h-4 w-4" /> Dashboard
          </DropdownItem>
          <DropdownItem>
            <Gift className="h-4 w-4" /> Rewards
          </DropdownItem>
          <DropdownItem>
            <Users className="h-4 w-4" /> Referrals
          </DropdownItem>
          <DropdownItem>
            <Settings className="h-4 w-4" /> Settings
          </DropdownItem>
          <div className="my-1 h-px bg-border" />
          <DropdownItem className="text-danger hover:text-danger">
            <LogOut className="h-4 w-4" /> Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}

export function Logo({ size = 28 }: { size?: number }) {
  // Original geometric mark — not derived from any real brand.
  return (
    <span
      className="relative inline-grid place-items-center rounded-md bg-primary"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width={size * 0.7} height={size * 0.7} fill="none">
        <path d="M5 17 L12 4 L19 17" stroke="#0b0e11" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13 H16" stroke="#0b0e11" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
