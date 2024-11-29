"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Legend,
  Label,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type DataPoint = {
  Date_str: string;
  Hidden_State: number;
  SPY_Close: number;
};

type DataSet = {
  label: string;
  data: DataPoint[];
};

const Config = {
  bullish: { id: 0, label: "Bullish", color: "green" },
  bearish: { id: 1, label: "Bearish", color: "red" },
  sideways: { id: 2, label: "Sideways", color: "#FFC107" }, // Yellow
};

const processChartData = (data: DataPoint[]) =>
  data.map((dataPoint) => ({
    date: dataPoint.Date_str,
    Hidden_State: dataPoint.Hidden_State,
    [`SPY_Close_${dataPoint.Hidden_State}`]: dataPoint.SPY_Close,
  }));

type MarketStatesChartProps = {
  dataSets: DataSet[];
  title: string;
  height: number;
};

export default function MarketStatesChart({
  dataSets,
  title,
  height,
}: MarketStatesChartProps) {
  const [selectedDataSetLabel, setSelectedDataSetLabel] = useState(
    dataSets[0]?.label || ""
  );

  const [isFullScreen, setIsFullScreen] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartContainerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const selectedDataSet = dataSets.find(
    (ds) => ds.label === selectedDataSetLabel
  );

  const chartData = processChartData(
    selectedDataSet ? selectedDataSet.data : []
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="flex items-center">
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

          <Button
            variant="ghost"
            onClick={toggleFullScreen}
            className="px-4 py-2"
          >
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </Button>
        </div>
      </div>

      <div ref={chartContainerRef}>
        <ChartContainer
          config={Config}
          style={{ height: isFullScreen ? "100vh" : `${height}px` }}
          className="w-full"
        >
          <LineChart
            data={chartData}
            width={isFullScreen ? window.innerWidth : 1000}
            height={isFullScreen ? window.innerHeight - 100 : height}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 7)}
            >
              <Label value="Date" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis
              domain={[
                (dataMin: number) => dataMin * 0.95,
                (dataMax: number) => dataMax * 1.05,
              ]}
              tickFormatter={(value: number) => value.toExponential(2)}
            >
              <Label
                value="SPY Close Price"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip content={<ChartTooltipContent />} />
            <Legend
              verticalAlign="top"
              height={36}
              payload={Object.values(Config).map(({ label, color }) => ({
                value: label,
                type: "line",
                color,
              }))}
            />
            {Object.values(Config).map(({ id, label, color }) => (
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
            ))}
            <Brush
              dataKey="date"
              height={30}
              travellerWidth={12}
              strokeWidth={1}
              stroke={isFullScreen ? "#ffffff" : "#8e91dc"} // White in full-screen, purple otherwise
              fill={isFullScreen ? "#222222" : "#fbfaff"} // Dark gray in full-screen, light purple otherwise
            />
          </LineChart>
        </ChartContainer>
      </div>
    </>
  );
}
