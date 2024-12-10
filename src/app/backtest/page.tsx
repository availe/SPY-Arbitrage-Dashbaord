"use client";

import backtestData from "@/data/Backtest_Combined_Data.json";
import BacktestChart from "@/components/charts/backtest-chart";

const BacktestPage: React.FC = () => {
  const linearData = backtestData.map((entry) => ({
    Date_str: entry.Date_str,
    Trading_Account_Close: entry.Trading_Account_Close_Linear, // chart data
    Holding_Account: entry.Holding_Account_Linear, // chart data
    Trading_Account_Close_Linear: entry.Trading_Account_Close_Linear, // tooltip data
    Holding_Account_Linear: entry.Holding_Account_Linear, // tooltip data
  }));

  const logLinearData = backtestData.map((entry) => ({
    Date_str: entry.Date_str,
    Trading_Account_Close: entry.Trading_Account_Close_Log, // chart data
    Holding_Account: entry.Holding_Account_Log, // chart data
    Trading_Account_Close_Linear: entry.Trading_Account_Close_Linear, // tooltip data
    Holding_Account_Linear: entry.Holding_Account_Linear, // tooltip data
  }));

  const dataSets = [
    { label: "Log-Linear", data: logLinearData },
    { label: "Linear", data: linearData },
  ];

  return (
    <div className="flex flex-col">
      <BacktestChart
        dataSets={dataSets}
        height={500}
        title="Backtest Chart"
      />
    </div>
  );
};

export default BacktestPage;
