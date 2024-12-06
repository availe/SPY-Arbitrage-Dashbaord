"use client";

import MarketStatesChart from "@/components/charts/backtest-chart";
import linearData from "@/data/Backtest_Linear_Data.json";
import logLinearData from "@/data/Backtest_Log_Linear_Data.json";

const BacktestPage: React.FC = () => {
    const dataSets = [
        { label: "Log-Linear", data: logLinearData },
        { label: "Linear", data: linearData },
      ];

    return (
        <div className="flex flex-col">
        <MarketStatesChart dataSets={dataSets} height={500} title="Backtest Chart" />
      </div>
    );
};

export default BacktestPage;