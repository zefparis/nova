import * as React from "react";
import { generateCandles } from "@/lib/market-simulator";
import { cn } from "@/lib/utils";

export function Sparkline({
  symbol,
  basePrice,
  change,
  width = 96,
  height = 28,
  className,
}: {
  symbol: string;
  basePrice: number;
  change: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  const candles = React.useMemo(
    () => generateCandles(symbol, basePrice, 40, 60_000, 0.008),
    [symbol, basePrice]
  );
  const closes = candles.map((c) => c.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;
  const up = change >= 0;
  const color = up ? "#0ecb81" : "#f6465d";

  const points = closes
    .map((c, i) => {
      const x = (i / (closes.length - 1)) * width;
      const y = height - ((c - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
