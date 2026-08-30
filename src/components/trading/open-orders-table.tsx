"use client";
import { openOrders } from "@/data/mock-market-data";
import { formatPrice, formatAmount, formatDateTime } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function OpenOrdersTable() {
  if (openOrders.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No open orders.
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Pair</th>
              <th className="px-4 py-2.5 font-medium">Side</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 text-right font-medium">Price</th>
              <th className="px-4 py-2.5 text-right font-medium">Amount</th>
              <th className="px-4 py-2.5 text-right font-medium">Filled</th>
              <th className="px-4 py-2.5 text-right font-medium">Total</th>
              <th className="px-4 py-2.5 text-right font-medium">Time</th>
              <th className="px-4 py-2.5 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {openOrders.map((o) => (
              <tr key={o.id} className="border-b border-border/60 hover:bg-muted/30">
                <td className="px-4 py-2.5 font-medium">{o.pair}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={o.side === "Buy" ? "success" : "danger"}>{o.side}</Badge>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{o.type}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{formatPrice(o.price)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{formatAmount(o.amount, 4)}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full", o.side === "Buy" ? "bg-success" : "bg-danger")}
                        style={{ width: `${o.filled}%` }}
                      />
                    </div>
                    <span className="tabular-nums text-muted-foreground">{o.filled}%</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums">{formatPrice(o.total)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">{formatDateTime(o.time)}</td>
                <td className="px-4 py-2.5 text-right">
                  <button className="rounded px-2 py-0.5 text-xs text-danger hover:bg-danger/10">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
