"use client";
import * as React from "react";
import { generateRecentTrades, tickPrice } from "@/lib/market-simulator";
import { formatPrice, formatAmount, formatTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function RecentTrades({ midPrice, height = 420 }: { midPrice: number; height?: number }) {
  const [price, setPrice] = React.useState(midPrice);
  const [trades, setTrades] = React.useState(() => generateRecentTrades(midPrice));

  React.useEffect(() => {
    setPrice(midPrice);
    setTrades(generateRecentTrades(midPrice));
  }, [midPrice]);

  // simulate live trade ticks
  React.useEffect(() => {
    const id = setInterval(() => {
      setPrice((p) => {
        const np = tickPrice(p, 0.0005);
        setTrades((prev) => {
          const side: "buy" | "sell" = Math.random() > 0.5 ? "buy" : "sell";
          const t = {
            id: Date.now(),
            price: side === "buy" ? np * 1.0001 : np * 0.9999,
            amount: Math.round((0.001 + Math.random() * 1.2) * 10000) / 10000,
            time: Date.now(),
            side,
          };
          return [t, ...prev].slice(0, 30);
        });
        return np;
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col" style={{ height }}>
      <div className="grid grid-cols-3 px-2 py-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Time</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
        {trades.map((t) => (
          <div key={t.id} className="grid grid-cols-3 px-2 py-[3px] text-[11px] tabular-nums">
            <span className={t.side === "buy" ? "text-success" : "text-danger"}>{formatPrice(t.price)}</span>
            <span className="text-right text-foreground">{formatAmount(t.amount, 4)}</span>
            <span className="text-right text-muted-foreground">{formatTime(t.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
