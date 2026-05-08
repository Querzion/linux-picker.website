import { createContext, useContext, useState, useEffect } from "react";

const DistroContext = createContext(null);

export const DistroProvider = ({ children }) => {
    const [selectedDistro, setSelectedDistro] = useState(null);
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("theme") === "penguin-light" ? "light" : "dark"
    );

    /* =====================================================
        WATCH FOR DARK/LIGHT MODE CHANGES
    ===================================================== */
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const t = document.documentElement.getAttribute("data-theme");
            setThemeMode(t === "penguin-light" ? "light" : "dark");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    /* =====================================================
        APPLY DISTRO THEME TO CSS VARIABLES
    ===================================================== */
    useEffect(() => {
        if (selectedDistro) {
            const theme = themeMode === "light"
                ? selectedDistro.themes.light
                : selectedDistro.themes.dark;

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
    }, [selectedDistro, themeMode]);

    return (
        <DistroContext.Provider value={{ selectedDistro, setSelectedDistro, themeMode }}>
            {children}
        </DistroContext.Provider>
    );
};

export const useDistro = () => useContext(DistroContext);