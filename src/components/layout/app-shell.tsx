"use client";
import * as React from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";
import { MarketTickerBar } from "@/components/markets/market-ticker-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <MarketTickerBar />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 pb-14 lg:pb-0">{children}</main>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}
