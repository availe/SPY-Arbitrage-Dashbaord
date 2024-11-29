// components/MarketStatesChart.tsx

"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataPoint = {
  Date_str: string;
  Hidden_State: number;
  SPY_Close: number;
};

type DataSet = {
  label: string;
  data: DataPoint[];
};

const stateColors: Record<number, string> = {
  0: "green", // Bullish
  1: "red", // Bearish
  2: "yellow", // Sideways
};

const chartConfig: ChartConfig = {
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
};

const processChartData = (data: DataPoint[]) =>
  data.map((dataPoint) => ({
    date: dataPoint.Date_str,
    Hidden_State: dataPoint.Hidden_State,
    [`SPY_Close_${dataPoint.Hidden_State}`]: dataPoint.SPY_Close,
  }));

type MarketStatesChartProps = {
  dataSets: DataSet[];
};

export default function MarketStatesChart({
  dataSets,
}: MarketStatesChartProps) {
  // Define state for selected data set
  const [selectedDataSetLabel, setSelectedDataSetLabel] = useState(
    dataSets[0]?.label || ""
  );

  // Get the selected data set
  const selectedDataSet = dataSets.find(
    (ds) => ds.label === selectedDataSetLabel
  );

  // Process the selected data set
  const chartData = processChartData(
    selectedDataSet ? selectedDataSet.data : []
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Market Regimes Chart</h2>

        {/* Select Component */}
        <Select
          value={selectedDataSetLabel}
          onValueChange={(value) => setSelectedDataSetLabel(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Chart Scale" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Chart Scale</SelectLabel>
              {dataSets.map((ds) => (
                <SelectItem key={ds.label} value={ds.label}>
                  {ds.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* ChartContainer */}
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
            tickFormatter={(value: string) => value.slice(0, 7)} // Format date (e.g., "2023-11")
          />
          {/* Dynamic codomain with some padding */}
          <YAxis
            domain={[
              (dataMin: number) => dataMin * 0.95,
              (dataMax: number) => dataMax * 1.05,
            ]}
          />
          <Tooltip content={<ChartTooltipContent />} />

          {/* Render lines for each Hidden_State */}
          {[0, 1, 2].map((state) => (
            <Line
              key={`line-SPY_Close_${state}`} // Unique key for each Line
              type="linear"
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
            travellerWidth={12}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
