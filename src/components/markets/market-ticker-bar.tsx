"use client";
import * as React from "react";
import Link from "next/link";
import { marketPairs } from "@/data/mock-market-data";
import { formatPrice, formatPercent } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function MarketTickerBar() {
  // duplicate the list so the marquee loops seamlessly
  const items = React.useMemo(() => [...marketPairs, ...marketPairs], []);

  return (
    <div className="relative overflow-hidden border-b border-border bg-card/40">
      <div className="flex w-max animate-[ticker_40s_linear_infinite] items-center gap-6 py-1.5">
        {items.map((p, i) => (
          <Link
            key={`${p.symbol}-${i}`}
            href={`/trade/${p.symbol}`}
            className="flex shrink-0 items-center gap-2 text-xs"
          >
            <span className="font-medium text-foreground">{p.base}/{p.quote}</span>
            <span className="tabular-nums text-muted-foreground">{formatPrice(p.price)}</span>
            <span
              className={cn(
                "tabular-nums",
                p.change24h >= 0 ? "text-success" : "text-danger"
              )}
            >
              {formatPercent(p.change24h)}
            </span>
          </Link>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
