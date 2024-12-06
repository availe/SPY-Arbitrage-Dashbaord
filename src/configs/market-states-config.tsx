import { Line, LegendType } from "recharts";

export const MarketStatesConfig = {
  bullish: { id: 0, label: "Bullish", color: "green" },
  bearish: { id: 1, label: "Bearish", color: "red" },
  sideways: { id: 2, label: "Sideways", color: "#FFC107" },
};

export const generateMarketStatesLegend = () =>
  Object.values(MarketStatesConfig).map(({ label, color }) => ({
    value: label,
    type: "line" as LegendType,
    color,
  }));

export const generateMarketStatesLines = () =>
  Object.values(MarketStatesConfig).map(({ id, label, color }) => (
    <Line
      key={`line-SPY_Close_${id}`}
      type="linear"
      dataKey={`SPY_Close_${id}`}
      stroke={color}
      dot={false}
      isAnimationActive={false}
      connectNulls={false}
      name={label}
    />
  ));
