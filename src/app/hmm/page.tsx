"use client";

import linearData from "@/data/Market_States_Linear_Data.json";
import logLinearData from "@/data/Market_States_Log_Linear_Data.json";
import MarketStatesChart from "@/components/market-states-chart";
import Text from "@/../markdown/hmm.mdx";

export default function Page() {
  const dataSets = [
    { label: "Linear", data: linearData },
    { label: "Log-Linear", data: logLinearData },
  ];

  return (
    <>
      <div className="p-4">
        <MarketStatesChart dataSets={dataSets} />
      </div>
      <Text />
    </>
  );
}
