"use client";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NumberInput } from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";
import { formatPrice, formatAmount } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function TradePanel({
  base,
  quote,
  price,
}: {
  base: string;
  quote: string;
  price: number;
}) {
  const [side, setSide] = React.useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = React.useState<"limit" | "market" | "stop">("limit");
  const [pct, setPct] = React.useState(0);
  const [orderPrice, setOrderPrice] = React.useState(price.toFixed(2));
  const [amount, setAmount] = React.useState("");
  const [stopTrigger, setStopTrigger] = React.useState("");

  React.useEffect(() => {
    if (orderType === "market") setOrderPrice(price.toFixed(2));
  }, [orderType, price]);

  const amt = parseFloat(amount) || 0;
  const px = parseFloat(orderPrice) || price;
  const total = amt * px;

  const balance = side === "buy" ? 42500 : 1.842; // fictional available balance
  const maxAmount = side === "buy" ? balance / px : balance;

  function applyPct(p: number) {
    setPct(p);
    setAmount((maxAmount * (p / 100)).toFixed(6));
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Buy / Sell tabs */}
      <Tabs value={side} onValueChange={(v) => setSide(v as "buy" | "sell")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className={cn(side === "buy" && "bg-success/15 text-success")}>
            Buy {base}
          </TabsTrigger>
          <TabsTrigger value="sell" className={cn(side === "sell" && "bg-danger/15 text-danger")}>
            Sell {base}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Order type */}
      <Tabs value={orderType} onValueChange={(v) => setOrderType(v as typeof orderType)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="limit">Limit</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="stop">Stop-Limit</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {orderType === "stop" && (
          <Field label="Trigger Price">
            <NumberInput
              value={stopTrigger}
              onChange={(e) => setStopTrigger(e.target.value)}
              placeholder={price.toFixed(2)}
              suffix={quote}
            />
          </Field>
        )}
        <Field label="Price">
          <NumberInput
            value={orderPrice}
            onChange={(e) => setOrderPrice(e.target.value)}
            disabled={orderType === "market"}
            suffix={quote}
          />
        </Field>
        <Field label="Amount">
          <NumberInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            suffix={base}
          />
        </Field>

        {/* slider */}
        <div className="grid grid-cols-5 gap-1 pt-1">
          {[0, 25, 50, 75, 100].map((p) => (
            <button
              key={p}
              onClick={() => applyPct(p)}
              className={cn(
                "rounded py-1 text-[11px] transition-colors",
                pct === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {p}%
            </button>
          ))}
        </div>

        <Field label="Total">
          <NumberInput
            value={total ? total.toFixed(2) : ""}
            readOnly
            placeholder="0.00"
            suffix={quote}
          />
        </Field>
      </div>

      <Button
        variant={side === "buy" ? "success" : "danger"}
        className="h-10 w-full text-sm font-semibold"
        onClick={() => {
          /* No real transaction — demo only */
        }}
      >
        {side === "buy" ? "Buy" : "Sell"} {base}
      </Button>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Available</span>
        <span className="tabular-nums">
          {side === "buy" ? `${formatAmount(balance, 2)} ${quote}` : `${formatAmount(balance, 6)} ${base}`}
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Est. fee (0.1%)</span>
        <span className="tabular-nums">{formatPrice(total * 0.001)}</span>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
