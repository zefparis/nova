import { cn } from "@/lib/utils";

export function CoinIcon({
  symbol,
  color,
  size = 24,
  className,
}: {
  symbol: string;
  color: string;
  size?: number;
  className?: string;
}) {
  const initials = symbol.slice(0, 3).toUpperCase();
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white", className)}
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.36,
        lineHeight: 1,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}
