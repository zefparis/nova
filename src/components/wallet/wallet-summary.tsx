"use client";
import * as React from "react";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatUsd } from "@/lib/formatters";

interface Alloc {
  coin: string;
  color: string;
  value: number;
}

export function WalletSummary({
  total,
  spot,
  funding,
  earn,
  futures,
  allocation,
}: {
  total: number;
  spot: number;
  funding: number;
  earn: number;
  futures: number;
  allocation: Alloc[];
}) {
  const totalAlloc = allocation.reduce((s, a) => s + a.value, 0) || 1;

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <div className="text-xs text-muted-foreground">Total Balance</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">{formatUsd(total)}</div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:grid-cols-2">
            <Balance label="Spot" value={spot} />
            <Balance label="Funding" value={funding} />
            <Balance label="Earn" value={earn} />
            <Balance label="Futures" value={futures} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Button variant="success" size="sm" className="w-full"><ArrowDownToLine className="h-4 w-4" /> Deposit</Button>
            <Button variant="outline" size="sm" className="w-full"><ArrowUpFromLine className="h-4 w-4" /> Withdraw</Button>
            <Button variant="outline" size="sm" className="w-full"><ArrowLeftRight className="h-4 w-4" /> Transfer</Button>
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-muted-foreground">Allocation</div>
          {/* horizontal stacked bar */}
          <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-muted">
            {allocation.map((a) => (
              <div
                key={a.coin}
                style={{ width: `${(a.value / totalAlloc) * 100}%`, background: a.color }}
                title={`${a.coin} ${formatUsd(a.value)}`}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {allocation.map((a) => (
              <div key={a.coin} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: a.color }} />
                <span className="text-muted-foreground">{a.coin}</span>
                <span className="ml-auto tabular-nums">{((a.value / totalAlloc) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Balance({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-sm font-medium tabular-nums">{formatUsd(value)}</div>
    </div>
  );
}
