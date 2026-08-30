"use client";
import * as React from "react";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import { marketPairs, favoriteSymbols, type MarketPair } from "@/data/mock-market-data";
import { CoinIcon } from "@/components/ui/coin-icon";
import { Sparkline } from "@/components/charts/sparkline";
import { formatPrice, formatPercent, formatCompact, formatAmount } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export type MarketTab = "Favorites" | "Spot" | "New Listings" | "Top Gainers" | "24h Volume";

const tabs: MarketTab[] = ["Favorites", "Spot", "New Listings", "Top Gainers", "24h Volume"];

export function MarketTable({ initialTab = "Spot" }: { initialTab?: MarketTab }) {
  const [tab, setTab] = React.useState<MarketTab>(initialTab);
  const [favs, setFavs] = React.useState<Set<string>>(new Set(favoriteSymbols));

  function toggleFav(sym: string) {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(sym)) next.delete(sym);
      else next.add(sym);
      return next;
    });
  }

  const rows = React.useMemo(() => {
    let list = [...marketPairs];
    switch (tab) {
      case "Favorites":
        list = list.filter((p) => favs.has(p.symbol));
        break;
      case "New Listings":
        list = list.filter((p) => p.listedDaysAgo != null).sort((a, b) => (a.listedDaysAgo! - b.listedDaysAgo!));
        break;
      case "Top Gainers":
        list = list.sort((a, b) => b.change24h - a.change24h);
        break;
      case "24h Volume":
        list = list.sort((a, b) => b.quoteVolume24h - a.quoteVolume24h);
        break;
      case "Spot":
      default:
        list = list.sort((a, b) => b.quoteVolume24h - a.quoteVolume24h);
        break;
    }
    return list;
  }, [tab, favs]);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-2 py-2 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "whitespace-nowrap rounded px-3 py-1 text-sm transition-colors",
              tab === t ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2 font-medium"></th>
              <th className="px-3 py-2 font-medium">Pair</th>
              <th className="px-3 py-2 text-right font-medium">Price</th>
              <th className="px-3 py-2 text-right font-medium">24h Change</th>
              <th className="px-3 py-2 text-right font-medium">24h High</th>
              <th className="px-3 py-2 text-right font-medium">24h Low</th>
              <th className="px-3 py-2 text-right font-medium">Volume</th>
              <th className="px-3 py-2 text-right font-medium">Market Cap</th>
              <th className="px-3 py-2 text-right font-medium">Last 7d</th>
              <th className="px-3 py-2 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <Row key={p.symbol} p={p} fav={favs.has(p.symbol)} onFav={() => toggleFav(p.symbol)} />
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <div className="divide-y divide-border md:hidden">
        {rows.map((p) => (
          <MobileRow key={p.symbol} p={p} fav={favs.has(p.symbol)} onFav={() => toggleFav(p.symbol)} />
        ))}
      </div>
    </div>
  );
}

function Row({ p, fav, onFav }: { p: MarketPair; fav: boolean; onFav: () => void }) {
  const up = p.change24h >= 0;
  return (
    <tr className="border-b border-border/60 transition-colors hover:bg-muted/30">
      <td className="px-3 py-2.5">
        <button onClick={onFav} className={cn(fav ? "text-warning" : "text-muted-foreground hover:text-foreground")}>
          <Star className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
        </button>
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2">
          <CoinIcon symbol={p.base} color={p.iconColor} size={22} />
          <div className="leading-tight">
            <div className="font-medium">{p.base}<span className="text-muted-foreground">/{p.quote}</span></div>
            <div className="text-[10px] text-muted-foreground">{formatAmount(p.volume24h, 0)} {p.base}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-2.5 text-right tabular-nums">{formatPrice(p.price)}</td>
      <td className={cn("px-3 py-2.5 text-right tabular-nums", up ? "text-success" : "text-danger")}>
        {formatPercent(p.change24h)}
      </td>
      <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{formatPrice(p.high24h)}</td>
      <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{formatPrice(p.low24h)}</td>
      <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{formatUsdCompact(p.quoteVolume24h)}</td>
      <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{formatUsdCompact(p.marketCap)}</td>
      <td className="px-3 py-2.5">
        <div className="flex justify-end">
          <Sparkline symbol={p.symbol} basePrice={p.price} change={p.change24h} />
        </div>
      </td>
      <td className="px-3 py-2.5 text-right">
        <Link
          href={`/trade/${p.symbol}`}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent"
        >
          Trade <ChevronRight className="h-3 w-3" />
        </Link>
      </td>
    </tr>
  );
}

function MobileRow({ p, fav, onFav }: { p: MarketPair; fav: boolean; onFav: () => void }) {
  const up = p.change24h >= 0;
  return (
    <Link href={`/trade/${p.symbol}`} className="flex items-center gap-3 px-3 py-3">
      <button
        onClick={(e) => {
          e.preventDefault();
          onFav();
        }}
        className={cn(fav ? "text-warning" : "text-muted-foreground")}
      >
        <Star className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
      </button>
      <CoinIcon symbol={p.base} color={p.iconColor} size={28} />
      <div className="min-w-0 flex-1">
        <div className="font-medium">{p.base}<span className="text-muted-foreground">/{p.quote}</span></div>
        <div className="text-[11px] tabular-nums text-muted-foreground">{formatPrice(p.price)}</div>
      </div>
      <div className="text-right">
        <div className={cn("text-sm tabular-nums", up ? "text-success" : "text-danger")}>
          {formatPercent(p.change24h)}
        </div>
        <div className="text-[11px] tabular-nums text-muted-foreground">{formatUsdCompact(p.quoteVolume24h)}</div>
      </div>
    </Link>
  );
}

function formatUsdCompact(v: number): string {
  return `$${formatCompact(v)}`;
}
