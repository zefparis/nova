export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-6 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-medium text-foreground">BINANCE</span>
          <span>About</span>
          <span>Careers</span>
          <span>Terms</span>
          <span>Privacy</span>
          <span>Help Center</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
          <span>Demo interface — simulated market data</span>
        </div>
      </div>
      <div className="mx-auto mt-3 max-w-7xl text-[11px] text-muted-foreground/70">
        This is a marketing demo. No real trading, deposits, withdrawals, or wallet connections occur.
        All prices, balances, and transactions are fictional.
      </div>
    </footer>
  );
}
