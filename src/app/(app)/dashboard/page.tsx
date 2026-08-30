import { PortfolioSection } from "@/components/wallet/portfolio-section";
import { MarketTable } from "@/components/markets/market-table";
import { OpenOrdersTable } from "@/components/trading/open-orders-table";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-4 p-3 md:space-y-5 md:p-5">
      <PageHeader title="Overview" subtitle="Your portfolio at a glance" />

      <PortfolioSection />

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Market Overview</h2>
        </div>
        <MarketTable initialTab="Spot" />
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Open Orders</h2>
        </div>
        <OpenOrdersTable />
      </section>
    </div>
  );
}
