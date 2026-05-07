import { useState, useMemo } from "react";

export const ENVIRONMENTS = [
    // Full DE (Wayland + X11)
    { id: "gnome",        label: "GNOME",        wayland: true,  x11: true  },
    { id: "kde-plasma",   label: "KDE Plasma",   wayland: true,  x11: true  },
    { id: "xfce",         label: "XFCE",         wayland: true,  x11: true  },
    { id: "cinnamon",     label: "Cinnamon",     wayland: true,  x11: true  },
    { id: "mate",         label: "MATE",         wayland: true,  x11: true  },
    { id: "lxqt",         label: "LXQt",         wayland: true,  x11: true  },
    { id: "budgie",       label: "Budgie",       wayland: true,  x11: true  },
    { id: "pantheon",     label: "Pantheon",     wayland: true,  x11: true  },
    { id: "deepin",       label: "Deepin DE",    wayland: true,  x11: true  },
    { id: "enlightenment",label: "Enlightenment",wayland: true,  x11: true  },
    { id: "trinity",      label: "Trinity DE",   wayland: false, x11: true  },

    // Wayland-only
    { id: "cosmic",       label: "COSMIC",       wayland: true,  x11: false },
    { id: "hyprland",     label: "Hyprland",     wayland: true,  x11: false },
    { id: "niri",         label: "Niri",         wayland: true,  x11: false },
    { id: "sway",         label: "Sway",         wayland: true,  x11: false },
    { id: "river",        label: "River",        wayland: true,  x11: false },
    { id: "wayfire",      label: "Wayfire",      wayland: true,  x11: false },
    { id: "labwc",        label: "labwc",        wayland: true,  x11: false },
    { id: "blackbox",     label: "Blackbox",     wayland: true,  x11: false },

    // X11-only
    { id: "i3",           label: "i3",           wayland: false, x11: true  },
    { id: "dwm",          label: "DWM",          wayland: false, x11: true  },
    { id: "awesome",      label: "AwesomeWM",    wayland: false, x11: true  },
    { id: "bspwm",        label: "BSPWM",        wayland: false, x11: true  },
    { id: "openbox",      label: "Openbox",      wayland: false, x11: true  },
    { id: "fluxbox",      label: "Fluxbox",      wayland: false, x11: true  },
    { id: "icewm",        label: "IceWM",        wayland: false, x11: true  },
    { id: "jwm",          label: "JWM",          wayland: false, x11: true  },
    { id: "herbstluftwm", label: "herbstluftwm", wayland: false, x11: true  },
    { id: "xmonad",       label: "XMonad",       wayland: false, x11: true  },
    { id: "qtile",        label: "Qtile",        wayland: false, x11: true  },
];

export const STABILITY_LEVELS = [
    { id: "super-stable",  label: "Super Stable"  },
    { id: "stable",        label: "Stable"        },
    { id: "less-stable",   label: "Less Stable"   },
    { id: "bleeding-edge", label: "Bleeding Edge" },
];

// Derived from STABILITY_LEVELS order — never drift out of sync
export const STABILITY_ORDER = Object.fromEntries(
    STABILITY_LEVELS.map(({ id }, i, arr) => [id, arr.length - 1 - i])
);

export const USE_CASES = [
    { id: "casual",  label: "Casual"  },
    { id: "work",    label: "Work"    },
    { id: "gaming",  label: "Gaming"  },
    { id: "server",  label: "Server"  },
];

export function useDistroFilter(distros = []) {
    const [stabilityIndex, setStabilityIndex] = useState(1); // index into STABILITY_LEVELS, default "stable"
    const [useCase,        setUseCase]        = useState(null);
    const [environment,    setEnvironment]    = useState(null);
    const [protocol,       setProtocol]       = useState("wayland");
    const [search,         setSearch]         = useState("");

    const stability = STABILITY_LEVELS[stabilityIndex].id;

    const filtered = useMemo(() => {
        if (!distros.length) return [];

        const scored = distros.map((distro) => {
            let score = 0;

            // SEARCH
            if (search.trim()) {
                const q = search.toLowerCase();
                const match =
                    distro.name.toLowerCase().includes(q) ||
                    distro.tags?.some(t => t.toLowerCase().includes(q));

                if (match) score += 1000;
                else       score -= 1000;
            }

            // STABILITY
            if (STABILITY_ORDER[distro.stability] >= STABILITY_ORDER[stability]) {
                score += 3;
            } else {
                score -= 2;
            }

            // USE CASE
            if (useCase) {
                if (useCase === "server" && distro.serverFocused)                      score += 4;
                if (useCase === "gaming" && distro.tags?.includes("gaming"))            score += 4;
                if (useCase === "work"   && distro.tags?.includes("developer"))         score += 3;
                if (useCase === "casual" && distro.tags?.includes("beginner-friendly")) score += 3;
            }

            // ENVIRONMENT
            if (environment) {
                if (distro.displayEnvironments?.includes(environment)) score += 5;
                else                                                   score -= 2;
            }

            // PROTOCOL
            if (!distro.displayProtocol?.includes(protocol)) {
                score -= 5;
            }

            return { ...distro, score };
        });

        return scored
            .filter(d => d.score > -2)
            .sort((a, b) => b.score - a.score);
    }, [distros, stability, useCase, environment, protocol, search]);

    return {
        filtered,
        // State
        stabilityIndex, setStabilityIndex,
        useCase,        setUseCase,
        environment,    setEnvironment,
        protocol,       setProtocol,
        search,         setSearch,
    };
}