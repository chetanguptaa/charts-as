import { useState } from "react";

const navItems = ["Summary", "Charts", "Statistics", "Analysis", "Settings"];

const Navbar = () => {
    const [activeNav, setActiveNav] = useState("Charts");
    return (
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
    );
};

export default Navbar;
