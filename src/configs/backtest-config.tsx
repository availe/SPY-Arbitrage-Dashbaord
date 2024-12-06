import { Line, LegendType } from "recharts";

export const BacktestConfig = {
  trading: { id: 0, label: "Trading Account", color: "#00BFFF" },
  holding: { id: 1, label: "Holding Account", color: "#FF8C00" },
};

export const generateBacktestLegend = () =>
  Object.values(BacktestConfig).map(({ label, color }) => ({
    value: label,
    type: "line" as LegendType,
    color,
  }));

export const generateBacktestLines = () =>
  Object.values(BacktestConfig).map(({ id, label, color }) => {
    const dataKey =
      id === BacktestConfig.trading.id
        ? "Trading_Account_Close"
        : "Holding_Account";
    return (
      <Line
        key={`line-backtest-${id}`}
        type="linear"
        dataKey={dataKey}
        stroke={color}
        dot={false}
        isAnimationActive={false}
        connectNulls={false}
        name={label}
      />
    );
  });
