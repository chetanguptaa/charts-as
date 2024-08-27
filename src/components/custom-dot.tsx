import { NumberComponent } from "./number-component";

const CustomizedDot = (props: any) => {
    const { data } = props;
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

export default CustomizedDot;
