// All data here is entirely fictional and for demo purposes only.
// No real market data, no real assets, no real addresses.

export interface MarketPair {
  symbol: string; // e.g. "BTC-USDT"
  base: string; // "BTC"
  quote: string; // "USDT"
  price: number;
  change24h: number; // percent
  high24h: number;
  low24h: number;
  volume24h: number; // in base asset
  quoteVolume24h: number; // in USD
  marketCap: number;
  iconColor: string; // tailwind-ish hex for the coin badge
  listedDaysAgo?: number; // for "New Listings"
}

export const marketPairs: MarketPair[] = [
  {
    symbol: "BTC-USDT",
    base: "BTC",
    quote: "USDT",
    price: 67420.32,
    change24h: 2.42,
    high24h: 68120.5,
    low24h: 65880.1,
    volume24h: 28412.55,
    quoteVolume24h: 1_914_300_000,
    marketCap: 1_328_000_000_000,
    iconColor: "#f7931a",
  },
  {
    symbol: "ETH-USDT",
    base: "ETH",
    quote: "USDT",
    price: 3528.18,
    change24h: 3.18,
    high24h: 3580.0,
    low24h: 3412.4,
    volume24h: 142880.32,
    quoteVolume24h: 504_000_000,
    marketCap: 424_000_000_000,
    iconColor: "#627eea",
  },
  {
    symbol: "SOL-USDT",
    base: "SOL",
    quote: "USDT",
    price: 168.92,
    change24h: 7.84,
    high24h: 172.4,
    low24h: 156.2,
    volume24h: 982_400.0,
    quoteVolume24h: 165_900_000,
    marketCap: 78_400_000_000,
    iconColor: "#14f195",
  },
  {
    symbol: "BNB-USDT",
    base: "BNB",
    quote: "USDT",
    price: 612.45,
    change24h: 1.12,
    high24h: 618.0,
    low24h: 604.3,
    volume24h: 84_200.5,
    quoteVolume24h: 51_600_000,
    marketCap: 89_200_000_000,
    iconColor: "#f0b90b",
  },
  {
    symbol: "XRP-USDT",
    base: "XRP",
    quote: "USDT",
    price: 0.6234,
    change24h: -1.86,
    high24h: 0.6412,
    low24h: 0.6118,
    volume24h: 124_500_000,
    quoteVolume24h: 77_600_000,
    marketCap: 34_800_000_000,
    iconColor: "#23292f",
  },
  {
    symbol: "DOGE-USDT",
    base: "DOGE",
    quote: "USDT",
    price: 0.1582,
    change24h: 5.42,
    high24h: 0.1624,
    low24h: 0.1498,
    volume24h: 980_000_000,
    quoteVolume24h: 155_000_000,
    marketCap: 22_900_000_000,
    iconColor: "#c2a633",
  },
  {
    symbol: "ADA-USDT",
    base: "ADA",
    quote: "USDT",
    price: 0.4521,
    change24h: -0.74,
    high24h: 0.461,
    low24h: 0.448,
    volume24h: 312_000_000,
    quoteVolume24h: 141_200_000,
    marketCap: 16_100_000_000,
    iconColor: "#0033ad",
  },
  {
    symbol: "AVAX-USDT",
    base: "AVAX",
    quote: "USDT",
    price: 38.74,
    change24h: 4.66,
    high24h: 39.6,
    low24h: 36.9,
    volume24h: 6_240_000,
    quoteVolume24h: 241_800_000,
    marketCap: 15_200_000_000,
    iconColor: "#e84142",
  },
  {
    symbol: "LINK-USDT",
    base: "LINK",
    quote: "USDT",
    price: 18.42,
    change24h: 6.12,
    high24h: 18.9,
    low24h: 17.2,
    volume24h: 12_400_000,
    quoteVolume24h: 228_400_000,
    marketCap: 10_800_000_000,
    iconColor: "#2a5ada",
  },
  {
    symbol: "TON-USDT",
    base: "TON",
    quote: "USDT",
    price: 7.18,
    change24h: -2.31,
    high24h: 7.42,
    low24h: 7.05,
    volume24h: 8_900_000,
    quoteVolume24h: 63_900_000,
    marketCap: 18_200_000_000,
    iconColor: "#0098ea",
  },
  {
    symbol: "NEAR-USDT",
    base: "NEAR",
    quote: "USDT",
    price: 5.42,
    change24h: 9.84,
    high24h: 5.6,
    low24h: 4.88,
    volume24h: 18_600_000,
    quoteVolume24h: 100_900_000,
    marketCap: 6_100_000_000,
    iconColor: "#00ec97",
    listedDaysAgo: 3,
  },
  {
    symbol: "APT-USDT",
    base: "APT",
    quote: "USDT",
    price: 9.32,
    change24h: 12.46,
    high24h: 9.6,
    low24h: 8.18,
    volume24h: 4_200_000,
    quoteVolume24h: 39_100_000,
    marketCap: 4_200_000_000,
    iconColor: "#06b6d4",
    listedDaysAgo: 9,
  },
];

export function getPair(symbol: string): MarketPair | undefined {
  return marketPairs.find((p) => p.symbol.toUpperCase() === symbol.toUpperCase());
}

export const favoriteSymbols = ["BTC-USDT", "ETH-USDT", "SOL-USDT", "BNB-USDT"];

// ---- Portfolio (fictional) ----

export interface WalletAsset {
  coin: string;
  name: string;
  color: string;
  total: number;
  available: number;
  inOrder: number;
  usdPrice: number;
}

export const walletAssets: WalletAsset[] = [
  { coin: "BTC", name: "Bitcoin", color: "#f7931a", total: 1.842, available: 1.720, inOrder: 0.122, usdPrice: 67420.32 },
  { coin: "ETH", name: "Ethereum", color: "#627eea", total: 14.8, available: 14.2, inOrder: 0.6, usdPrice: 3528.18 },
  { coin: "USDT", name: "Tether", color: "#26a17b", total: 42500.0, available: 41000.0, inOrder: 1500.0, usdPrice: 1.0 },
  { coin: "SOL", name: "Solana", color: "#14f195", total: 220.0, available: 180.0, inOrder: 40.0, usdPrice: 168.92 },
  { coin: "BNB", name: "BNB", color: "#f0b90b", total: 32.0, available: 30.0, inOrder: 2.0, usdPrice: 612.45 },
  { coin: "USDC", name: "USD Coin", color: "#2775ca", total: 18200.0, available: 18200.0, inOrder: 0.0, usdPrice: 1.0 },
];

export function usdValue(a: WalletAsset): number {
  return a.total * a.usdPrice;
}

export const portfolio = {
  totalBalance: 1028450.32,
  spotBalance: 98240.18,
  fundingBalance: 18620.5,
  earnBalance: 9120.64,
  futuresBalance: 2469.0,
  btcEquivalent: 1.842,
  change24h: 4.28,
  // portfolio history points (USD) for the mini chart
  history: [
    118200, 119400, 118900, 120800, 121600, 120200, 122400, 123900, 122800,
    124600, 125200, 124100, 126400, 127200, 126100, 128450,
  ],
};

// ---- Transactions (fictional) ----

export type TxType = "Deposit" | "Withdrawal" | "Transfer" | "Buy" | "Sell";
export type TxStatus = "Completed" | "Pending" | "Failed";

export interface Transaction {
  id: string;
  date: number;
  asset: string;
  type: TxType;
  amount: number;
  status: TxStatus;
  network: string;
  txId: string;
}

const networks = ["BTC", "ERC-20", "TRC-20", "BEP-20", "SOL", "Internal"];
const statuses: TxStatus[] = ["Completed", "Completed", "Completed", "Pending", "Failed"];

function fakeHash(seed: number): string {
  const chars = "0123456789abcdef";
  let s = seed;
  let out = "0x";
  for (let i = 0; i < 64; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    out += chars[(s >> 8) % 16];
  }
  return out;
}

export const transactions: Transaction[] = Array.from({ length: 24 }).map((_, i) => {
  const types: TxType[] = ["Deposit", "Withdrawal", "Transfer", "Buy", "Sell"];
  const type = types[i % types.length];
  const asset = ["BTC", "ETH", "USDT", "SOL", "BNB", "USDC"][i % 6];
  const amount = roundTo(0.05 + ((i * 7) % 50) / 10, 4);
  const status = statuses[(i * 3) % statuses.length];
  const network = type === "Transfer" ? "Internal" : networks[i % networks.length];
  const date = Date.now() - i * 3_600_000 * 7 - ((i * 137) % 3_600_000);
  return {
    id: `TX-${1000 + i}`,
    date,
    asset,
    type,
    amount,
    status,
    network,
    txId: fakeHash(i * 2654435761 + 12345),
  };
});

function roundTo(v: number, d: number): number {
  const p = 10 ** d;
  return Math.round(v * p) / p;
}

// ---- Open orders (fictional) ----

export interface OpenOrder {
  id: string;
  pair: string;
  side: "Buy" | "Sell";
  type: "Limit" | "Market" | "Stop-Limit";
  price: number;
  amount: number;
  filled: number; // percent
  total: number;
  time: number;
}

export const openOrders: OpenOrder[] = [
  { id: "O-9001", pair: "BTC-USDT", side: "Buy", type: "Limit", price: 66200, amount: 0.25, filled: 32, total: 16550, time: Date.now() - 1_800_000 },
  { id: "O-9002", pair: "ETH-USDT", side: "Sell", type: "Limit", price: 3610, amount: 3.0, filled: 12, total: 10830, time: Date.now() - 3_600_000 },
  { id: "O-9003", pair: "SOL-USDT", side: "Buy", type: "Stop-Limit", price: 160, amount: 50, filled: 0, total: 8000, time: Date.now() - 7_200_000 },
  { id: "O-9004", pair: "BNB-USDT", side: "Sell", type: "Limit", price: 625, amount: 10, filled: 48, total: 6250, time: Date.now() - 10_800_000 },
];
