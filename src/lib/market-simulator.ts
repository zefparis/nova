// Deterministic PRNG + market simulation helpers. Frontend only, no real data.

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Generate a deterministic candlestick series ending "now" for a given symbol.
 * Uses a seeded random walk with mild volatility and trend.
 */
export function generateCandles(
  symbol: string,
  basePrice: number,
  count = 120,
  intervalMs = 60_000,
  volatility = 0.012
): Candle[] {
  const seed = hashSeed(symbol);
  const rand = mulberry32(seed);
  const now = Date.now();
  const start = now - count * intervalMs;

  const candles: Candle[] = [];
  let price = basePrice * (1 - volatility * count * 0.5);
  // gentle upward drift so the chart trends up like the demo
  const drift = (basePrice - price) / count;

  for (let i = 0; i < count; i++) {
    const time = start + i * intervalMs;
    const open = price;
    const shock = (rand() - 0.5) * 2 * volatility * basePrice;
    const close = Math.max(0.0001, open + shock + drift);
    const wickUp = Math.abs(rand() - 0.5) * volatility * basePrice;
    const wickDn = Math.abs(rand() - 0.5) * volatility * basePrice;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDn;
    const volume = basePrice * (50 + rand() * 200) * (1 + Math.abs(shock) / basePrice * 20);
    candles.push({
      time,
      open: round(open),
      high: round(high),
      low: round(Math.max(0.0001, low)),
      close: round(close),
      volume: round(volume, 2),
    });
    price = close;
  }
  // force the last close near the requested basePrice for consistency
  const last = candles[candles.length - 1];
  last.close = round(basePrice);
  last.high = Math.max(last.high, basePrice);
  return candles;
}

function round(v: number, d = 6): number {
  const p = 10 ** d;
  return Math.round(v * p) / p;
}

export interface OrderBookLevel {
  price: number;
  amount: number;
  total: number;
}

/**
 * Build a synthetic order book around a mid price.
 */
export function generateOrderBook(
  midPrice: number,
  depth = 14,
  tickSize = midPrice * 0.0002
): { asks: OrderBookLevel[]; bids: OrderBookLevel[] } {
  const seed = hashSeed(`book-${midPrice}`);
  const rand = mulberry32(seed);

  const asks: OrderBookLevel[] = [];
  const bids: OrderBookLevel[] = [];
  let askTotal = 0;
  let bidTotal = 0;

  for (let i = 0; i < depth; i++) {
    const askPrice = round(midPrice + tickSize * (i + 1));
    const bidPrice = round(midPrice - tickSize * (i + 1));
    const askAmount = round(0.5 + rand() * 4 * (1 + i * 0.15), 4);
    const bidAmount = round(0.5 + rand() * 4 * (1 + i * 0.15), 4);
    askTotal = round(askTotal + askAmount, 4);
    bidTotal = round(bidTotal + bidAmount, 4);
    asks.push({ price: askPrice, amount: askAmount, total: askTotal });
    bids.push({ price: bidPrice, amount: bidAmount, total: bidTotal });
  }
  // asks displayed top-down (lowest ask first)
  return { asks: asks.reverse(), bids };
}

export interface TradeTick {
  id: number;
  price: number;
  amount: number;
  time: number;
  side: "buy" | "sell";
}

export function generateRecentTrades(
  midPrice: number,
  count = 30
): TradeTick[] {
  const seed = hashSeed(`trades-${midPrice}`);
  const rand = mulberry32(seed);
  const now = Date.now();
  const trades: TradeTick[] = [];
  for (let i = 0; i < count; i++) {
    const side = rand() > 0.5 ? "buy" : "sell";
    const price = round(
      midPrice * (1 + (rand() - 0.5) * 0.0008) * (side === "buy" ? 1.0001 : 0.9999)
    );
    const amount = round(0.001 + rand() * 1.5, 4);
    trades.push({
      id: i,
      price,
      amount,
      time: now - i * (800 + rand() * 2200),
      side,
    });
  }
  return trades;
}

/**
 * Apply a small random walk to a price to simulate live ticking.
 */
export function tickPrice(price: number, volatility = 0.0006): number {
  const shock = (Math.random() - 0.5) * 2 * volatility * price;
  return round(Math.max(0.0001, price + shock));
}
