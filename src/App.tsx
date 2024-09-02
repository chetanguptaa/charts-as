import "./App.css";
import { Button } from "./components/ui/button";
import { Maximize2, PlusCircle } from "lucide-react";
import Chart from "./components/chart";
import Navbar from "./components/navbar";
import { useState } from "react";
import generateData from "@/lib/utils";

function App() {
    const [selectedPeriod, setSelectedPeriod] = useState("1w");
    const [data, setData] = useState(generateData());
    const handlePeriodChange = (period: string) => {
        setSelectedPeriod(period);
        setData(generateData());
    };
    const periods = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];
    return (
        <div className="w-full">
            <div className="p-0">
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
                    <Navbar />
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
                        {periods.map((period) => (
                            <Button
                                key={period}
                                variant={"outline"}
                                onClick={() => handlePeriodChange(period)}
                                className={`
                            ${
                                period === selectedPeriod
                                    ? "bg-[#4B40EE] hover:bg-[#4B40EE] hover:text-white text-white"
                                    : "text-gray-500"
                            } border-none rounded-[5px]`}
                            >
                                {period}
                            </Button>
                        ))}
                    </div>
                </div>
                <Chart data={data} />
            </div>
        </div>
    );
}

export default App;
