"use client";
import * as React from "react";
import type { OrderBookLevel } from "@/lib/market-simulator";
import { generateOrderBook } from "@/lib/market-simulator";
import { formatPrice, formatAmount } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function OrderBook({ midPrice, height = 420 }: { midPrice: number; height?: number }) {
  const book = React.useMemo(() => generateOrderBook(midPrice), [midPrice]);
  const { asks, bids } = book;
  const maxTotal = Math.max(asks[asks.length - 1]?.total ?? 0, bids[bids.length - 1]?.total ?? 0) || 1;

  const rows = (levels: OrderBookLevel[], side: "ask" | "bid") =>
    levels.map((l, i) => {
      const pct = (l.total / maxTotal) * 100;
      return (
        <div
          key={`${side}-${i}`}
          className="relative grid grid-cols-3 px-2 py-[3px] text-[11px] tabular-nums"
        >
          <div
            className={cn(
              "absolute inset-y-0 right-0",
              side === "ask" ? "bg-danger/10" : "bg-success/10"
            )}
            style={{ width: `${pct}%` }}
          />
          <span className={cn("relative z-10", side === "ask" ? "text-danger" : "text-success")}>
            {formatPrice(l.price)}
          </span>
          <span className="relative z-10 text-right text-foreground">{formatAmount(l.amount, 4)}</span>
          <span className="relative z-10 text-right text-muted-foreground">{formatAmount(l.total, 4)}</span>
        </div>
      );
    });

  return (
    <div className="flex h-full flex-col" style={{ height }}>
      <div className="grid grid-cols-3 px-2 py-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">{rows(asks, "ask")}</div>
      <div className="border-y border-border bg-muted/30 px-2 py-1.5 text-center">
        <span className={cn("text-sm font-semibold tabular-nums", midPrice >= 0 ? "text-success" : "text-danger")}>
          {formatPrice(midPrice)}
        </span>
        <span className="ml-2 text-[10px] text-muted-foreground">≈ Mid Price</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">{rows(bids, "bid")}</div>
    </div>
  );
}
