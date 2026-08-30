// Pure formatting helpers for the demo UI. No real data involved.

export function formatUsd(
  value: number,
  opts: { compact?: boolean; decimals?: number } = {}
): string {
  const { compact = false, decimals } = opts;
  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals ?? 2,
    maximumFractionDigits: decimals ?? 2,
  }).format(value);
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCompact(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, withSign = true): string {
  const sign = withSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatPrice(value: number): string {
  if (value >= 1000) return formatUsd(value, { decimals: 2 });
  if (value >= 1) return formatUsd(value, { decimals: 4 });
  if (value >= 0.01) return formatUsd(value, { decimals: 5 });
  return `$${value.toPrecision(4)}`;
}

export function formatAmount(value: number, decimals = 6): string {
  if (value === 0) return "0";
  if (value >= 1000) return formatNumber(value, 2);
  if (value >= 1) return formatNumber(value, 4);
  return formatNumber(value, decimals);
}

export function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatDateTime(ts: number): string {
  return `${formatDate(ts)} ${formatTime(ts)}`;
}

export function shortHash(hash: string, head = 8, tail = 6): string {
  if (hash.length <= head + tail) return hash;
  return `${hash.slice(0, head)}…${hash.slice(-tail)}`;
}
