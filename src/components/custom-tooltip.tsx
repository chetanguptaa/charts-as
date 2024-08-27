const CustomTooltip = (props: any) => {
    const { payload, active } = props;
    props.position.x = props.viewBox?.width + 62;
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

export default CustomTooltip;
