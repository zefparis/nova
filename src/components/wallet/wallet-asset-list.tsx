"use client";
import * as React from "react";
import { ArrowDownToLine, ArrowUpFromLine, CandlestickChart } from "lucide-react";
import { walletAssets, usdValue } from "@/data/mock-market-data";
import { CoinIcon } from "@/components/ui/coin-icon";
import { Button } from "@/components/ui/button";
import { formatUsd, formatAmount } from "@/lib/formatters";

export function WalletAssetList() {
  const total = walletAssets.reduce((s, a) => s + usdValue(a), 0);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Coin</th>
              <th className="px-4 py-2.5 text-right font-medium">Total</th>
              <th className="px-4 py-2.5 text-right font-medium">Available</th>
              <th className="px-4 py-2.5 text-right font-medium">In Order</th>
              <th className="px-4 py-2.5 text-right font-medium">USD Value</th>
              <th className="px-4 py-2.5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {walletAssets.map((a) => (
              <tr key={a.coin} className="border-b border-border/60 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <CoinIcon symbol={a.coin} color={a.color} size={26} />
                    <div className="leading-tight">
                      <div className="font-medium">{a.coin}</div>
                      <div className="text-[11px] text-muted-foreground">{a.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{formatAmount(a.total, 6)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatAmount(a.available, 6)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{formatAmount(a.inOrder, 6)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatUsd(usdValue(a))}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    <Button variant="success" size="xs"><ArrowDownToLine className="h-3 w-3" /> Deposit</Button>
                    <Button variant="outline" size="xs"><ArrowUpFromLine className="h-3 w-3" /> Withdraw</Button>
                    <Button variant="outline" size="xs"><CandlestickChart className="h-3 w-3" /> Trade</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile */}
      <div className="divide-y divide-border md:hidden">
        {walletAssets.map((a) => (
          <div key={a.coin} className="p-3">
            <div className="flex items-center gap-2.5">
              <CoinIcon symbol={a.coin} color={a.color} size={30} />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{a.coin}</div>
                <div className="text-[11px] text-muted-foreground">{a.name}</div>
              </div>
              <div className="text-right">
                <div className="font-medium tabular-nums">{formatUsd(usdValue(a))}</div>
                <div className="text-[11px] tabular-nums text-muted-foreground">{formatAmount(a.total, 6)} {a.coin}</div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 text-[11px] text-muted-foreground">
              <span>Available: <span className="text-foreground tabular-nums">{formatAmount(a.available, 6)}</span></span>
              <span>In order: <span className="text-foreground tabular-nums">{formatAmount(a.inOrder, 6)}</span></span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              <Button variant="success" size="xs" className="w-full"><ArrowDownToLine className="h-3 w-3" /> Deposit</Button>
              <Button variant="outline" size="xs" className="w-full"><ArrowUpFromLine className="h-3 w-3" /> Withdraw</Button>
              <Button variant="outline" size="xs" className="w-full"><CandlestickChart className="h-3 w-3" /> Trade</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
