"use client";
import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPair, marketPairs } from "@/data/mock-market-data";
import { generateCandles, tickPrice } from "@/lib/market-simulator";
import { CandleChart } from "@/components/trading/candle-chart";
import { OrderBook } from "@/components/trading/order-book";
import { RecentTrades } from "@/components/trading/recent-trades";
import { TradePanel } from "@/components/trading/trade-panel";
import { Card } from "@/components/ui/card";
import { formatPrice, formatPercent, formatAmount, formatUsd } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { ChevronRight, Star } from "lucide-react";

export default function TradePage() {
  const params = useParams<{ pair: string }>();
  const pairStr = (params.pair as string) ?? "BTC-USDT";
  const pair = getPair(pairStr) ?? marketPairs[0];

  const [price, setPrice] = React.useState(pair.price);
  const [fav, setFav] = React.useState(false);

  const candles = React.useMemo(
    () => generateCandles(pair.symbol, pair.price, 120, 60_000, 0.012),
    [pair.symbol, pair.price]
  );

  // live price ticking
  React.useEffect(() => {
    setPrice(pair.price);
    const id = setInterval(() => {
      setPrice((p) => tickPrice(p, 0.0004));
    }, 1500);
    return () => clearInterval(id);
  }, [pair.price]);

  const up = pair.change24h >= 0;
  const priceUp = price >= pair.price;

  return (
    <div className="flex flex-col">
      {/* ticker header */}
      <div className="border-b border-border bg-card/40 px-3 py-2.5 md:px-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setFav((f) => !f)} className={fav ? "text-warning" : "text-muted-foreground hover:text-foreground"}>
              <Star className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
            </button>
            <span className="text-base font-semibold">{pair.base}<span className="text-muted-foreground">/{pair.quote}</span></span>
            <Link href="/markets" className="ml-1 inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
              <ChevronRight className="h-3 w-3" /> Markets
            </Link>
          </div>

          <div className="flex items-baseline gap-2">
            <span className={cn("text-xl font-semibold tabular-nums", priceUp ? "text-success" : "text-danger")}>
              {formatPrice(price)}
            </span>
            <span className={cn("text-sm tabular-nums", up ? "text-success" : "text-danger")}>
              {formatPercent(pair.change24h)}
            </span>
          </div>

          <div className="hidden flex-wrap items-center gap-x-5 gap-y-1 text-xs md:flex">
            <Stat label="24h High" value={formatPrice(pair.high24h)} />
            <Stat label="24h Low" value={formatPrice(pair.low24h)} />
            <Stat label="24h Volume" value={`${formatAmount(pair.volume24h, 2)} ${pair.base}`} />
            <Stat label="24h Turnover" value={formatUsd(pair.quoteVolume24h, { compact: true })} />
          </div>
        </div>

        {/* mobile stats */}
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs md:hidden">
          <Stat label="24h High" value={formatPrice(pair.high24h)} />
          <Stat label="24h Low" value={formatPrice(pair.low24h)} />
          <Stat label="24h Vol" value={formatUsd(pair.quoteVolume24h, { compact: true })} />
        </div>
      </div>

      {/* main grid: chart + right column (order book / trades / panel) */}
      <div className="grid grid-cols-1 gap-2 p-2 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_300px_300px]">
        {/* chart */}
        <Card className="lg:col-span-1 xl:col-span-1">
          <CandleChart candles={candles} height={460} />
        </Card>

        {/* order book + recent trades (stacked on lg, side-by-side on xl) */}
        <div className="flex flex-col gap-2 lg:col-span-1 xl:col-span-1">
          <Card className="flex-1">
            <div className="border-b border-border px-3 py-2 text-xs font-semibold">Order Book</div>
            <OrderBook midPrice={price} height={300} />
          </Card>
          <Card className="flex-1">
            <div className="border-b border-border px-3 py-2 text-xs font-semibold">Recent Trades</div>
            <RecentTrades midPrice={price} height={220} />
          </Card>
        </div>

        {/* trade panel */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <TradePanel base={pair.base} quote={pair.quote} price={price} />
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col leading-tight">
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="tabular-nums text-foreground">{value}</span>
    </div>
  );
}
