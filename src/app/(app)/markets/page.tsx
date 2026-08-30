import { MarketTable } from "@/components/markets/market-table";
import { PageHeader } from "@/components/layout/page-header";

export default function MarketsPage() {
  return (
    <div className="space-y-4 p-3 md:space-y-5 md:p-5">
      <PageHeader title="Markets" subtitle="Live simulated prices across all pairs" />
      <MarketTable initialTab="Spot" />
    </div>
  );
}
