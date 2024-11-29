"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  Brush,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import Text from "@/../markdown/hmm.mdx";
import marketStatesData from "@/data/market_states_data.json";
import { useMediaQuery } from "@/hooks/use-media-query";

// Colors for market regimes
const stateColors: { [key: number]: string } = {
  0: "green", // Bullish
  1: "red", // Bearish
  2: "yellow", // Sideways
};

// Chart configuration for labels and colors
const chartConfig = {
  bullish: {
    label: "Bullish",
    color: "green",
  },
  bearish: {
    label: "Bearish",
    color: "red",
  },
  sideways: {
    label: "Sideways",
    color: "yellow",
  },
} satisfies ChartConfig;

// Map data to separate fields for each market state
const chartData = marketStatesData.map((dataPoint) => ({
  date: dataPoint.Date_str,
  Hidden_State: dataPoint.Hidden_State,
  [`SPY_Close_${dataPoint.Hidden_State}`]: dataPoint.SPY_Close,
}));

export default function Page() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  return (
    <>
      <ChartContainer className="min-h-[300px] w-full" config={chartConfig}>
        <LineChart
          data={chartData}
          width={1000}
          height={300}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 7)} // Format date
          />
          <Tooltip content={<ChartTooltipContent />} />

          {/* Render lines for each Hidden_State */}
          {[0, 1, 2].map((state) => (
            <Line
              key={`line-SPY_Close_${state}`} // Unique key for each Line
              type="monotone"
              dataKey={`SPY_Close_${state}`}
              stroke={stateColors[state]}
              dot={false}
              isAnimationActive={false}
              connectNulls={false} // Don't connect gaps
            />
          ))}

          <Brush
            dataKey="date"
            height={30}
            stroke="#8884d8"
            travellerWidth={isSmallScreen ? 18 : 12}
          />
        </LineChart>
      </ChartContainer>
      <Text />
    </>
  );
}
