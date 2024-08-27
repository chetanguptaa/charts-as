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
import { NumberComponent } from "./components/label";
import { data } from "./lib/utils";

const navItems = ["Summary", "Charts", "Statistics", "Analysis", "Settings"];

function App() {
    const [activeNav, setActiveNav] = useState("Charts");

    const CustomTooltip = (props: any) => {
        const { payload, active } = props;
        props.position.x = props.viewBox.width + 62;
        console.log(props.position.x);
        if (active && payload && payload.length) {
            return (
                <>
                    <div className="flex justify-between items-center flex-col space-y-2">
                        <div className="bg-black border border-border p-2 rounded shadow-md">
                            <p className="text-sm text-white font-semibold">
                                {`${payload[0].value.toFixed(2)}`}
                            </p>
                        </div>
                    </div>
                </>
            );
        }

        return null;
    };

    const CustomizedDot = (props: any) => {
        if (parseInt(props.payload.name) === data.length) {
            return (
                <NumberComponent
                    cx={props.cx}
                    cy={props.cy}
                    number={data[data.length - 1].value}
                />
            );
        }
        return (
            <div className="bg-[#4B40EE] border border-border p-2 rounded shadow-md">
                <p className="text-sm text-white font-semibold">
                    {`${data[data.length - 1].value.toFixed(2)}`}
                </p>
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
                <div className="flex justify-between items-center mb-4 px-12 py-4 w-[74%]">
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
                    <ResponsiveContainer width="75%" height="75%">
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 85,
                                left: 20,
                                bottom: 20,
                            }}
                        >
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
                                position={{
                                    x: 976,
                                }}
                                cursor={{
                                    strokeDasharray: 5,
                                }}
                            />
                            <CartesianGrid
                                stroke="#f5f5f5"
                                horizontal={false}
                            />
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="1"
                                    x2="0"
                                    y2="0"
                                >
                                    <stop stopColor="#FFFFFF" offset="0%" />
                                    <stop stopColor="#EBE7FF" offset="100%" />
                                </linearGradient>
                            </defs>
                            <Area
                                type="linear"
                                dataKey="value"
                                fill="url(#colorUv)"
                            />

                            <Line
                                type="linear"
                                dataKey="value"
                                stroke="#4B40EE"
                                strokeWidth={2}
                                dot={<CustomizedDot />}
                                fillOpacity={1}
                            />
                            <Bar
                                height={7}
                                dataKey="barVal"
                                fill="#E3E4E7"
                                barSize={4}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export default App;
