"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PortfolioChart } from "@/components/charts/portfolio-chart";
import { portfolio } from "@/data/mock-market-data";
import { formatUsd, formatAmount, formatPercent } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const [hidden, setHidden] = React.useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1fr_1.4fr]">
        {/* left: balance */}
        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Estimated Balance</span>
            <button
              onClick={() => setHidden((h) => !h)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle balance visibility"
            >
              {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-2 flex items-end gap-3">
            <span className="text-3xl font-semibold tabular-nums tracking-tight">
              {hidden ? "******" : formatUsd(portfolio.totalBalance)}
            </span>
            <span className={cn("pb-1 text-sm tabular-nums", "text-success")}>
              {formatPercent(portfolio.change24h)}
            </span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {hidden ? "******" : `${formatAmount(portfolio.btcEquivalent, 6)} BTC`} · +{formatUsd(portfolio.totalBalance * (portfolio.change24h / 100))} today
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <Button variant="success" size="sm" className="w-full">
              <ArrowDownToLine className="h-4 w-4" /> Deposit
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <ArrowUpFromLine className="h-4 w-4" /> Withdraw
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <ArrowLeftRight className="h-4 w-4" /> Transfer
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <BalanceRow label="Spot" value={portfolio.spotBalance} hidden={hidden} />
            <BalanceRow label="Funding" value={portfolio.fundingBalance} hidden={hidden} />
            <BalanceRow label="Earn" value={portfolio.earnBalance} hidden={hidden} />
            <BalanceRow label="Futures" value={portfolio.futuresBalance} hidden={hidden} />
          </div>
        </div>

        {/* right: chart */}
        <div className="p-3">
          <div className="flex items-center justify-between px-2 pt-1">
            <span className="text-xs text-muted-foreground">Portfolio · 16d</span>
            <Link href="/wallet" className="text-xs text-primary hover:underline">
              View wallet →
            </Link>
          </div>
          <PortfolioChart data={portfolio.history} height={240} />
        </div>
      </div>
    </Card>
  );
}

function BalanceRow({ label, value, hidden }: { label: string; value: number; hidden: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums text-foreground">{hidden ? "******" : formatUsd(value)}</span>
    </div>
  );
}
