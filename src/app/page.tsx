"use client";

import linearData from "@/data/Market_States_Linear_Data.json";
import logLinearData from "@/data/Market_States_Log_Linear_Data.json";
import MarketStatesChart from "@/components/charts/market-states-chart";
import Text from "@/../markdown/hmm.mdx";

export default function Page() {
  const dataSets = [
    { label: "Log-Linear", data: logLinearData },
    { label: "Linear", data: linearData },
  ];

  return (
    <div className="flex flex-col">
      <MarketStatesChart dataSets={dataSets} height={500} title="Market Regimes Chart" />
      <Text />
    </div>
  );
}
