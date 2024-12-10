import React, { useState } from "react";
import {
  LineChart,
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
import { useFullscreen } from "@/hooks/use-fullscreen";
import {
  generateMarketStatesLegend,
  generateMarketStatesLines,
  MarketStatesConfig,
} from "@/configs/market-states-config";

type DataPoint = {
  Date_str: string;
  Hidden_State: number;
  SPY_Close: number;
  SPY_Close_Linear: number;
};

type DataSet = {
  label: string;
  data: DataPoint[];
};

const processChartData = (data: DataPoint[]) =>
  data.map((dataPoint) => ({
    date: dataPoint.Date_str,
    Hidden_State: dataPoint.Hidden_State,
    [`SPY_Close_${dataPoint.Hidden_State}`]: dataPoint.SPY_Close,
    ...(dataPoint.SPY_Close_Linear !== undefined
      ? { SPY_Close_Linear: dataPoint.SPY_Close_Linear }
      : {}),
  }));

function LinearTooltipContent(
  props: React.ComponentProps<typeof ChartTooltipContent>
) {
  const { payload } = props;
  if (!payload || !payload.length) return null;
  const newPayload = payload.map((item) => {
    if (item && item.payload && item.payload.SPY_Close_Linear !== undefined) {
      const linearVal = Number(item.payload.SPY_Close_Linear);
      return { ...item, value: linearVal };
    }
    return item;
  });
  return <ChartTooltipContent {...props} payload={newPayload} />;
}

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

  const { elementRef, isFullscreen, toggleFullscreen } = useFullscreen();

  const selectedDataSet = dataSets.find(
    (ds) => ds.label === selectedDataSetLabel
  );

  const chartData = processChartData(
    selectedDataSet ? selectedDataSet.data : []
  );

  return (
    <>
      <h3 className="text-center text-lg font-semibold mb-4">{title}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: 10,
          paddingBottom: 10,
        }}
      >
        <Select
          value={selectedDataSetLabel}
          onValueChange={(value) => setSelectedDataSetLabel(value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
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
          onClick={toggleFullscreen}
          className="px-4 py-2 hidden md:block"
        >
          {isFullscreen ? "Exit Full Screen" : "Full Screen"}
        </Button>
      </div>

      <div ref={elementRef}>
        <ChartContainer
          config={MarketStatesConfig}
          style={{ height: isFullscreen ? "100vh" : `${height}px` }}
          className="w-full"
        >
          <LineChart
            data={chartData}
            width={isFullscreen ? window.innerWidth : 1000}
            height={isFullscreen ? window.innerHeight - 100 : height}
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
            <Tooltip content={<LinearTooltipContent />} />
            <Legend
              verticalAlign="top"
              align={isFullscreen ? "center" : "right"}
              height={36}
              payload={generateMarketStatesLegend()}
            />
            {generateMarketStatesLines()}
            <Brush
              dataKey="date"
              height={30}
              travellerWidth={12}
              strokeWidth={1}
              stroke={isFullscreen ? "#ffffff" : "#8e91dc"}
              fill={isFullscreen ? "#222222" : "#fbfaff"}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </>
  );
}
