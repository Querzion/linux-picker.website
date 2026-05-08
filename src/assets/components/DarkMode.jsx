import React, { useState, useEffect } from "react";
import Button from "./ui/Button";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const DarkMode = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "penguin-dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) =>
            prev === "penguin-dark" ? "penguin-light" : "penguin-dark"
        );
    };

    return (
        <Button
            variant="secondary"
            size="md"
            iconOnly
            ariaLabel="Toggle theme"
            onClick={toggleTheme}
        >
            {theme === "penguin-dark" ? (
                <LightModeIcon fontSize="small" />
            ) : (
                <DarkModeIcon fontSize="small" />
            )}
        </Button>
    );
};

export default DarkMode;