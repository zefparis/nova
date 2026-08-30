"use client";
import * as React from "react";
import type { Candle } from "@/lib/market-simulator";
import { cn } from "@/lib/utils";

export interface CandleChartProps {
  candles: Candle[];
  height?: number;
  className?: string;
}

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

export function CandleChart({ candles, height = 420, className }: CandleChartProps) {
  const [tf, setTf] = React.useState<Timeframe>("1h");
  const [hover, setHover] = React.useState<{ i: number; x: number; y: number } | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 800, h: height });

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: Math.max(320, r.width), h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  const padding = { top: 12, right: 56, bottom: 64, left: 8 };
  const plotW = size.w - padding.left - padding.right;
  const plotH = size.h - padding.top - padding.bottom;

  const data = candles;
  const prices = data.flatMap((c) => [c.high, c.low]);
  const vols = data.map((c) => c.volume);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const pRange = max - min || 1;
  const maxVol = Math.max(...vols) || 1;

  const x = (i: number) => padding.left + (i / (data.length - 1)) * plotW;
  const y = (p: number) => padding.top + (1 - (p - min) / pRange) * plotH;
  const cw = Math.max(1.5, (plotW / data.length) * 0.62);

  const last = data[data.length - 1];
  const up = last.close >= last.open;

  const gridLines = 5;
  const priceTicks = Array.from({ length: gridLines + 1 }, (_, i) => {
    const p = min + (pRange * i) / gridLines;
    return { p, y: y(p) };
  });

  const timeTicks = 6;
  const timeIdx = Array.from({ length: timeTicks }, (_, i) =>
    Math.round((i / (timeTicks - 1)) * (data.length - 1))
  );

  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
    const px = e.clientX - rect.left;
    const i = Math.round(((px - padding.left) / plotW) * (data.length - 1));
    const clamped = Math.max(0, Math.min(data.length - 1, i));
    setHover({ i: clamped, x: x(clamped), y: e.clientY - rect.top });
  }

  const hoverCandle = hover ? data[hover.i] : null;

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      {/* OHLC legend */}
      <div className="pointer-events-none absolute left-2 top-1 z-10 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
        <span className="font-medium text-foreground">BINANCE · {tf}</span>
        {hoverCandle ? (
          <>
            <span>O <span className={hoverCandle.close >= hoverCandle.open ? "text-success" : "text-danger"}>{hoverCandle.open}</span></span>
            <span>H <span className="text-success">{hoverCandle.high}</span></span>
            <span>L <span className="text-danger">{hoverCandle.low}</span></span>
            <span>C <span className={hoverCandle.close >= hoverCandle.open ? "text-success" : "text-danger"}>{hoverCandle.close}</span></span>
            <span>Vol <span className="text-foreground">{hoverCandle.volume.toFixed(2)}</span></span>
          </>
        ) : (
          <>
            <span>O <span className={up ? "text-success" : "text-danger"}>{last.open}</span></span>
            <span>H <span className="text-success">{last.high}</span></span>
            <span>L <span className="text-danger">{last.low}</span></span>
            <span>C <span className={up ? "text-success" : "text-danger"}>{last.close}</span></span>
          </>
        )}
      </div>

      {/* timeframe toolbar */}
      <div className="absolute right-2 top-1 z-10 flex items-center gap-0.5 rounded-md border border-border bg-card/80 p-0.5">
        {TIMEFRAMES.map((t) => (
          <button
            key={t}
            onClick={() => setTf(t)}
            className={cn(
              "rounded px-2 py-0.5 text-[11px] font-medium transition-colors",
              tf === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <svg
        width={size.w}
        height={size.h}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        className="block"
      >
        {/* grid */}
        {priceTicks.map((t, i) => (
          <g key={`g-${i}`}>
            <line x1={padding.left} x2={padding.left + plotW} y1={t.y} y2={t.y} stroke="#1e242c" strokeWidth={1} />
            <text x={padding.left + plotW + 6} y={t.y + 3} fill="#848e9c" fontSize={10} className="tabular-nums">
              {fmtPrice(t.p)}
            </text>
          </g>
        ))}

        {/* volume bars (bottom 20%) */}
        {data.map((c, i) => {
          const vh = (c.volume / maxVol) * (plotH * 0.18);
          const vx = x(i) - cw / 2;
          const vy = padding.top + plotH - vh;
          return (
            <rect
              key={`v-${i}`}
              x={vx}
              y={vy}
              width={cw}
              height={vh}
              fill={c.close >= c.open ? "rgba(14,203,129,0.35)" : "rgba(246,70,93,0.35)"}
            />
          );
        })}

        {/* candles */}
        {data.map((c, i) => {
          const cx = x(i);
          const isUp = c.close >= c.open;
          const color = isUp ? "#0ecb81" : "#f6465d";
          const bodyTop = y(Math.max(c.open, c.close));
          const bodyBot = y(Math.min(c.open, c.close));
          const bh = Math.max(1, bodyBot - bodyTop);
          return (
            <g key={`c-${i}`}>
              <line x1={cx} x2={cx} y1={y(c.high)} y2={y(c.low)} stroke={color} strokeWidth={1} />
              <rect
                x={cx - cw / 2}
                y={bodyTop}
                width={cw}
                height={bh}
                fill={color}
              />
            </g>
          );
        })}

        {/* last price line */}
        <line
          x1={padding.left}
          x2={padding.left + plotW}
          y1={y(last.close)}
          y2={y(last.close)}
          stroke={up ? "#0ecb81" : "#f6465d"}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <rect
          x={padding.left + plotW}
          y={y(last.close) - 9}
          width={52}
          height={18}
          fill={up ? "#0ecb81" : "#f6465d"}
        />
        <text
          x={padding.left + plotW + 26}
          y={y(last.close) + 4}
          fill="#0b0e11"
          fontSize={11}
          fontWeight={600}
          textAnchor="middle"
          className="tabular-nums"
        >
          {fmtPrice(last.close)}
        </text>

        {/* time axis */}
        {timeIdx.map((i, k) => {
          const c = data[i];
          if (!c) return null;
          return (
            <text
              key={`t-${k}`}
              x={x(i)}
              y={size.h - 6}
              fill="#848e9c"
              fontSize={10}
              textAnchor="middle"
              className="tabular-nums"
            >
              {fmtTime(c.time)}
            </text>
          );
        })}

        {/* crosshair */}
        {hover && (
          <>
            <line x1={hover.x} x2={hover.x} y1={padding.top} y2={padding.top + plotH} stroke="#848e9c" strokeWidth={1} strokeDasharray="3 3" />
            <line x1={padding.left} x2={padding.left + plotW} y1={hover.y} y2={hover.y} stroke="#848e9c" strokeWidth={1} strokeDasharray="3 3" />
          </>
        )}
      </svg>
    </div>
  );
}

function fmtPrice(p: number): string {
  if (p >= 1000) return p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 1) return p.toFixed(3);
  return p.toPrecision(4);
}
function fmtTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
}
