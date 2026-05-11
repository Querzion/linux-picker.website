import { createContext, useContext, useState, useEffect } from "react";

const DistroContext = createContext(null);

export const DistroProvider = ({ children }) => {
    const [selectedDistro, setSelectedDistro] = useState(null);
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("theme") === "penguin-light" ? "light" : "dark"
    );

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

    const applyVar = (key, value) => {
        if (value !== undefined && value !== null) {
            document.documentElement.style.setProperty(key, value);
        }
    };

    const clearVar = (key) => {
        document.documentElement.style.removeProperty(key);
    };

    useEffect(() => {
        if (!selectedDistro) {
            [
                "--bg-main",
                "--bg-surface",
                "--bg-elevated",
                "--text-primary",
                "--text-secondary",
                "--text-muted",
                "--border-default",
                "--border-light",
                "--color-accent",
                "--bg-overlay",

                "--card-bg",
                "--card-border",
                "--card-hover-bg",
                "--card-shadow",

                "--input-bg",
                "--input-border",
                "--input-text",
                "--input-placeholder",

                "--btn-primary-bg",
                "--btn-primary-text",
                "--btn-primary-border",
                "--btn-primary-hover-bg",
                "--btn-primary-hover-text",
                "--btn-primary-hover-border",
                "--btn-primary-focus-ring",

                "--btn-secondary-bg",
                "--btn-secondary-text",
                "--btn-secondary-border",
                "--btn-secondary-hover-bg",
                "--btn-secondary-hover-text",

                "--btn-ghost-bg",
                "--btn-ghost-text",
                "--btn-outline-text",
                "--btn-outline-border",

                "--slider-track-bg",
                "--slider-track-fill",
                "--slider-thumb-bg",
                "--slider-thumb-border",
                "--slider-thumb-hover",
                "--slider-thumb-active",

                "--link-color",
                "--link-hover",

                "--success",
                "--warning",
                "--error",
                "--info",

                "--divider-color"
            ].forEach(clearVar);

            return;
        }

        const theme =
            themeMode === "light"
                ? selectedDistro.themes.light
                : selectedDistro.themes.dark;

        /* =====================================================
            BACKGROUNDS
        ===================================================== */
        applyVar("--bg-main", theme.bgColor);
        applyVar("--bg-surface", theme.bgSurfaceColor);
        applyVar("--bg-elevated", theme.bgElevated);
        applyVar("--bg-overlay", theme.bgOverlay);

        /* =====================================================
            TEXT
        ===================================================== */
        applyVar("--text-primary", theme.textColor);
        applyVar("--text-secondary", theme.textSecondary);
        applyVar("--text-muted", theme.textMuted);

        /* =====================================================
            BORDERS
        ===================================================== */
        applyVar("--border-default", theme.borderColor);
        applyVar("--border-light", theme.borderColor);
        applyVar("--divider-color", theme.dividerColor);

        /* =====================================================
            ACCENT
        ===================================================== */
        applyVar("--color-accent", theme.accentColor);

        /* =====================================================
            CARDS
        ===================================================== */
        applyVar("--card-bg", theme.bgSurfaceColor);
        applyVar("--card-border", theme.borderColor);
        applyVar("--card-hover-bg", theme.cardHoverBg);
        applyVar("--card-shadow", theme.cardShadow);

        /* =====================================================
            INPUTS
        ===================================================== */
        applyVar("--input-bg", theme.bgSurfaceColor);
        applyVar("--input-border", theme.borderColor);
        applyVar("--input-text", theme.textColor);
        applyVar("--input-placeholder", theme.textMuted);

        /* =====================================================
            BUTTONS (FULL CONTRACT)
        ===================================================== */
        applyVar("--btn-primary-bg", theme.btnPrimaryBg);
        applyVar("--btn-primary-text", theme.btnPrimaryText);
        applyVar("--btn-primary-border", theme.btnPrimaryBorder);
        applyVar("--btn-primary-hover-bg", theme.btnPrimaryHoverBg);
        applyVar("--btn-primary-hover-text", theme.btnPrimaryHoverText);
        applyVar("--btn-primary-hover-border", theme.btnPrimaryHoverBorder);
        applyVar("--btn-primary-focus-ring", theme.btnPrimaryFocusRing);

        applyVar("--btn-secondary-bg", theme.btnSecondaryBg);
        applyVar("--btn-secondary-text", theme.btnSecondaryText);
        applyVar("--btn-secondary-border", theme.btnSecondaryBorder);
        applyVar("--btn-secondary-hover-bg", theme.btnSecondaryHoverBg);
        applyVar("--btn-secondary-hover-text", theme.btnSecondaryHoverText);

        applyVar("--btn-ghost-bg", theme.btnGhostBg);
        applyVar("--btn-ghost-text", theme.btnGhostText);

        applyVar("--btn-outline-text", theme.btnOutlineText);
        applyVar("--btn-outline-border", theme.btnOutlineBorder);

        /* =====================================================
            SLIDER
        ===================================================== */
        applyVar("--slider-track-bg", theme.sliderTrackBg);
        applyVar("--slider-track-fill", theme.sliderTrackFill);
        applyVar("--slider-thumb-bg", theme.sliderThumbBg);
        applyVar("--slider-thumb-border", theme.sliderThumbBorder);
        applyVar("--slider-thumb-hover", theme.sliderThumbHover);
        applyVar("--slider-thumb-active", theme.sliderThumbActive);

        /* =====================================================
            LINKS
        ===================================================== */
        applyVar("--link-color", theme.linkColor);
        applyVar("--link-hover", theme.linkHover);

        /* =====================================================
            SEMANTIC STATES
        ===================================================== */
        applyVar("--success", theme.success);
        applyVar("--warning", theme.warning);
        applyVar("--error", theme.error);
        applyVar("--info", theme.info);

    }, [selectedDistro, themeMode]);

    return (
        <DistroContext.Provider value={{ selectedDistro, setSelectedDistro, themeMode }}>
            {children}
        </DistroContext.Provider>
    );
};

export const useDistro = () => useContext(DistroContext);