import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const generateData = (): {
    name: string;
    value: number;
    barVal: number;
}[] => {
    const result: { name: string; value: number; barVal: number }[] = [];
    const startValue = 10000;
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
            barVal: Math.floor(Math.random() * 10000),
        });
    }
    for (let i = 6; i <= 74; i++) {
        const previousValue = result[i - 2].value;
        let value = previousValue + (Math.random() - 0.5) * fluctuationRange;
        value = Math.max(value, startValue);
        result.push({
            name: i.toString(),
            value,
            barVal: Math.floor(Math.random() * 10000),
        });
    }
    result.push({
        name: "75",
        value: endValue,
        barVal: Math.floor(Math.random() * 10000),
    });
    return result;
};

export default generateData;
