"use client";
import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatUsd } from "@/lib/formatters";

export function PortfolioChart({
  data,
  height = 220,
}: {
  data: number[];
  height?: number;
}) {
  const chartData = React.useMemo(
    () =>
      data.map((v, i) => ({
        i,
        value: v,
      })),
    [data]
  );

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0b90b" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#f0b90b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#232a31" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="i" hide />
        <YAxis
          domain={["dataMin - 500", "dataMax + 500"]}
          tickFormatter={(v) => formatUsd(Number(v), { compact: true })}
          stroke="#848e9c"
          fontSize={11}
          width={56}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#161a1e",
            border: "1px solid #232a31",
            borderRadius: 6,
            fontSize: 12,
          }}
          labelStyle={{ display: "none" }}
          formatter={(v) => [formatUsd(Number(v)), "Balance"]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#f0b90b"
          strokeWidth={2}
          fill="url(#portfolioFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
