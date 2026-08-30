"use client";
import * as React from "react";
import { transactions, type TxType, type TxStatus } from "@/data/mock-market-data";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatAmount, shortHash } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Copy, ArrowDownUp, Filter } from "lucide-react";

const filters: (TxType | "All")[] = ["All", "Deposit", "Withdrawal", "Transfer", "Buy", "Sell"];

const statusVariant: Record<TxStatus, "success" | "warning" | "danger"> = {
  Completed: "success",
  Pending: "warning",
  Failed: "danger",
};

export default function TransactionsPage() {
  const [filter, setFilter] = React.useState<(TxType | "All")>("All");

  const rows = React.useMemo(() => {
    const list = filter === "All" ? transactions : transactions.filter((t) => t.type === filter);
    return [...list].sort((a, b) => b.date - a.date);
  }, [filter]);

  return (
    <div className="space-y-4 p-3 md:space-y-5 md:p-5">
      <PageHeader
        title="Transaction History"
        subtitle="All simulated deposits, withdrawals, transfers and trades"
        right={
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <ArrowDownUp className="h-4 w-4" /> Export
          </Button>
        }
      />

      {/* filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
          <Filter className="h-3.5 w-3.5" /> Filter:
        </span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "whitespace-nowrap rounded-full border px-3 py-1 text-xs transition-colors",
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">Date</th>
                <th className="px-4 py-2.5 font-medium">Asset</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 text-right font-medium">Amount</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Network</th>
                <th className="px-4 py-2.5 font-medium">Tx ID</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="border-b border-border/60 hover:bg-muted/30">
                  <td className="px-4 py-2.5 tabular-nums text-muted-foreground">{formatDateTime(t.date)}</td>
                  <td className="px-4 py-2.5 font-medium">{t.asset}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{t.type}</td>
                  <td className={cn("px-4 py-2.5 text-right tabular-nums", isCredit(t.type) ? "text-success" : "text-danger")}>
                    {isCredit(t.type) ? "+" : "-"}{formatAmount(t.amount, 4)} {t.asset}
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{t.network}</td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      {shortHash(t.txId)}
                      <button className="text-muted-foreground hover:text-foreground" aria-label="Copy">
                        <Copy className="h-3 w-3" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* mobile */}
        <div className="divide-y divide-border md:hidden">
          {rows.map((t) => (
            <div key={t.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{t.asset}</span>
                  <Badge variant="default">{t.type}</Badge>
                </div>
                <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className={cn("tabular-nums", isCredit(t.type) ? "text-success" : "text-danger")}>
                  {isCredit(t.type) ? "+" : "-"}{formatAmount(t.amount, 4)} {t.asset}
                </span>
                <span className="tabular-nums text-muted-foreground">{formatDateTime(t.date)}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{t.network}</span>
                <span className="font-mono">{shortHash(t.txId)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function isCredit(type: TxType): boolean {
  return type === "Deposit" || type === "Sell";
}
