"use client";

import marketData from "@/data/Market_States_Combined.json";
import MarketStatesChart from "@/components/charts/market-states-chart";
import Text from "@/../markdown/hmm.mdx";

export default function Page() {
  const linearData = marketData.map((entry) => ({
    Date_str: entry.Date_str,
    Hidden_State: entry.Hidden_State,
    SPY_Close: entry.SPY_Close, // Include linear values fo chart
    SPY_Close_Linear: entry.SPY_Close, // Include linear values for tooltips
  }));

  const logLinearData = marketData.map((entry) => ({
    Date_str: entry.Date_str,
    Hidden_State: entry.Hidden_State,
    SPY_Close: entry.SPY_Close_Log, // Include log values for chart
    SPY_Close_Linear: entry.SPY_Close, // Include linear values for tooltips
  }));

  const dataSets = [
    { label: "Log-Linear", data: logLinearData },
    { label: "Linear", data: linearData },
  ];

  return (
    <div className="flex flex-col">
      <MarketStatesChart
        dataSets={dataSets}
        height={500}
        title="Market Regimes Chart"
      />
      <Text />
    </div>
  );
}
