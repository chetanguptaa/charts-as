import { data } from "@/lib/utils";
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import CustomTooltip from "./custom-tooltip";
import CustomizedDot from "./custom-dot";

const Chart = () => {
    return (
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
                    <YAxis tick={false} axisLine={{ stroke: "#cccccc" }} />
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
                    <CartesianGrid stroke="#f5f5f5" horizontal={false} />
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
                    <Area type="linear" dataKey="value" fill="url(#colorUv)" />
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke="#4B40EE"
                        strokeWidth={2}
                        dot={<CustomizedDot data={data} />}
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
    );
};

export default Chart;
