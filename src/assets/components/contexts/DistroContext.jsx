import { createContext, useContext, useState, useEffect } from "react";

const DistroContext = createContext(null);

export const DistroProvider = ({ children }) => {
    const [selectedDistro, setSelectedDistro] = useState(null);

    useEffect(() => {
        if (selectedDistro) {
            const currentTheme = localStorage.getItem("theme") || "penguin-dark";
            const isDark = currentTheme === "penguin-dark";
            const theme = isDark ? selectedDistro.themes.dark : selectedDistro.themes.light;

            document.documentElement.style.setProperty("--color-accent", theme.accentColor);
            document.documentElement.style.setProperty("--bg-surface", theme.bgColor);
            document.documentElement.style.setProperty("--card-bg", theme.bgColor);
            document.documentElement.style.setProperty("--card-border", theme.borderColor);
            document.documentElement.style.setProperty("--text-primary", theme.textColor);
        } else {
            document.documentElement.style.removeProperty("--color-accent");
            document.documentElement.style.removeProperty("--bg-surface");
            document.documentElement.style.removeProperty("--card-bg");
            document.documentElement.style.removeProperty("--card-border");
            document.documentElement.style.removeProperty("--text-primary");
        }
    }, [selectedDistro]);

    return (
        <DistroContext.Provider value={{ selectedDistro, setSelectedDistro }}>
            {children}
        </DistroContext.Provider>
    );
};

export const useDistro = () => useContext(DistroContext);