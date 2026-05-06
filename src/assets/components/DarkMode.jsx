import React, { useState, useEffect } from "react";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import "../../styles/components/ui/ThemeToggle.css";

const DarkMode = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle dark mode"
            type="button"
        >
            {theme === "light" ? (
                <DarkModeIcon fontSize="small" />
            ) : (
                <LightModeIcon fontSize="small" />
            )}
        </button>
    );
};

export default DarkMode;