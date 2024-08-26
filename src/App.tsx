/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { useState } from "react";
import {
    Line,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    CartesianGrid,
    ComposedChart,
    Bar,
    Area,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { Maximize2, PlusCircle } from "lucide-react";

const generateData = (): { name: string; value: number; barVal: number }[] => {
    const result: { name: string; value: number; barVal: number }[] = [];
    const startValue = 5000;
    const endValue = 63171.79;
    const increaseStep = 2000;
    const fluctuationRange = 65000;
    for (let i = 1; i <= 5; i++) {
        const previousValue = i === 1 ? startValue : result[i - 2].value;
        let value = previousValue + increaseStep;
        if (Math.random() < 0.4) {
            value -= Math.random() * fluctuationRange;
        }
        value = Math.max(value, startValue);
        result.push({
            name: i.toString(),
            value,
            barVal: Math.floor(Math.random() * 10),
        });
    }
    for (let i = 6; i <= 74; i++) {
        const previousValue = result[i - 2].value;
        let value = previousValue + (Math.random() - 0.5) * fluctuationRange;
        value = Math.max(value, startValue);
        result.push({
            name: i.toString(),
            value,
            barVal: Math.floor(Math.random() * 10),
        });
    }
    result.push({
        name: "75",
        value: endValue,
        barVal: Math.floor(Math.random() * 10),
    });
    return result;
};

const data = generateData();

const navItems = ["Summary", "Charts", "Statistics", "Analysis", "Settings"];

function App() {
    const [activeNav, setActiveNav] = useState("Charts");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <>
                    <div className="bg-background border border-border p-2 rounded shadow-md">
                        <p className="text-sm font-semibold">{`${data[
                            data.length - 1
                        ].value.toFixed(2)}`}</p>
                    </div>
                    <div className="bg-background border border-border p-2 rounded shadow-md">
                        <p className="text-sm font-semibold">{`${payload[0].value.toFixed(
                            2
                        )}`}</p>
                    </div>
                </>
            );
        }
        return null;
    };
    const EndDataTooltip = ({ data }: { data: any[] }) => {
        const lastDataPoint = data[data.length - 1];
        return (
            <div className="end-data-tooltip">
                <p>{`End Data: ${lastDataPoint.value}`}</p>
            </div>
        );
    };

    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <div className="h-[30vh] flex flex-col">
                    <div className="flex p-12 pb-4 flex-col space-y-4 justify-start">
                        <div className="flex items-start">
                            <p className="text-4xl font-normal">63,179.71</p>
                            <p className="ml-2 mt-[4px] text-sm text-muted-foreground text-[#BDBEBF]">
                                USD
                            </p>
                        </div>
                        <div className="text-[#67BF6B]">+2,162.42 (3.54%)</div>
                    </div>
                    <nav className="flex justify-start items-center border-b border-border space-x-8 px-12">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                className={`py-2 text-center ${
                                    activeNav === item
                                        ? "border-b-[3px] border-[#4B40EE]"
                                        : "text-muted-foreground"
                                }`}
                                onClick={() => setActiveNav(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex justify-between items-center mb-4 px-12 py-4">
                    <Button
                        variant="outline"
                        className="text-gray-500 border-none"
                    >
                        <Maximize2 className="w-[16px] h-[16px] mr-2" />
                        Fullscreen
                    </Button>
                    <Button
                        variant="outline"
                        className="text-gray-500 border-none"
                    >
                        <PlusCircle className="w-[16px] h-[16px] mr-2" />
                        Compare
                    </Button>
                    <div className="flex space-x-2">
                        {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map(
                            (period) => (
                                <Button
                                    key={period}
                                    variant={"outline"}
                                    className={`
                                        ${
                                            period === "1w"
                                                ? "bg-[#4B40EE] text-white"
                                                : "text-gray-500"
                                        } border-none rounded-[5px]`}
                                >
                                    {period}
                                </Button>
                            )
                        )}
                    </div>
                </div>
                <div className="h-[70vh]">
                    {/* <ResponsiveContainer
                        width="75%"
                        height="75%"
                        className="p-[-24px]"
                    >
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 10,
                            }}
                            height={300}
                            width={500}
                        >
                            <XAxis
                                tick={false}
                                axisLine={{ stroke: "#cccccc" }}
                            />
                            <YAxis
                                tick={false}
                                axisLine={{ stroke: "#cccccc" }}
                                orientation="left"
                            />
                            <YAxis
                                tick={false}
                                axisLine={{ stroke: "#cccccc" }}
                                orientation="right"
                                yAxisId="right"
                            />
                            <Area
                                dataKey="pv"
                                fill="red"
                                points={[]}
                                stackId="1"
                            />
                            <CartesianGrid
                                stroke="#eee"
                                strokeDasharray="5 5"
                                horizontal={false}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                isAnimationActive={false}
                            />
                            <Line
                                type="linear"
                                dataKey="value"
                                stroke="#4B40EE"
                                strokeWidth={2}
                                dot={false}
                                fillOpacity={1}
                                fill="url(#colorUv)"
                            />
                            <Bar
                                dataKey="barValue"
                                fill="#8884d8"
                                barSize={20}
                                label={{ position: "top" }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer> */}

                    <ResponsiveContainer width="75%" height="75%">
                        <ComposedChart data={data}>
                            <XAxis
                                tick={false}
                                axisLine={{ stroke: "#cccccc" }}
                                orientation="bottom"
                            />
                            <YAxis
                                tick={false}
                                axisLine={{ stroke: "#cccccc" }}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                isAnimationActive={false}
                                position={{ x: 1030 }}
                            />
                            <CartesianGrid
                                stroke="#f5f5f5"
                                horizontal={false}
                            />
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="1"
                                    y2="1"
                                >
                                    <stop stopColor="#FFFFFF" />
                                    <stop stopColor="#EBE7FF" />
                                </linearGradient>
                            </defs>
                            <Area
                                type="linear"
                                dataKey="value"
                                fill="url(#colorUv)"
                                stroke="#8884d8"
                            />
                            <Line
                                type="linear"
                                dataKey="value"
                                stroke="#4B40EE"
                                strokeWidth={2}
                                dot={false}
                                fillOpacity={1}
                            />
                            <Bar
                                height={8}
                                dataKey="barVal"
                                fill="#8884d8"
                                barSize={8}
                            />
                            <Tooltip
                                content={<EndDataTooltip data={data} />}
                                position={{ x: 1030, y: 0 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export default App;
