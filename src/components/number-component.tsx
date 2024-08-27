export const NumberComponent = ({
    number,
    cx,
    cy,
}: {
    number: number;
    cx: number;
    cy: number;
}) => {
    return (
        <svg
            width="98"
            height="33"
            x={cx - 10}
            y={cy - 10}
            viewBox="0 0 98 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-10"
        >
            <rect width="98" height="33" rx="5" fill="#4B40EE" />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="16"
                fontWeight="normal"
            >
                {number}
            </text>
        </svg>
    );
};
