import { PageHeader } from "@/components/layout/page-header";
import { WalletAssetList } from "@/components/wallet/wallet-asset-list";
import { WalletSummary } from "@/components/wallet/wallet-summary";
import { portfolio, walletAssets, usdValue } from "@/data/mock-market-data";
import { formatUsd } from "@/lib/formatters";

export default function WalletPage() {
  const allocation = walletAssets.map((a) => ({
    coin: a.coin,
    color: a.color,
    value: usdValue(a),
  }));

  return (
    <div className="space-y-4 p-3 md:space-y-5 md:p-5">
      <PageHeader
        title="Wallet"
        subtitle="Manage your simulated balances"
      />
      <WalletSummary
        total={portfolio.totalBalance}
        spot={portfolio.spotBalance}
        funding={portfolio.fundingBalance}
        earn={portfolio.earnBalance}
        futures={portfolio.futuresBalance}
        allocation={allocation}
      />
      <WalletAssetList />
    </div>
  );
}
