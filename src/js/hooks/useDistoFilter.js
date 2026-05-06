import { useMemo, useState } from "react";

const ENVIRONMENTS = [
    { id: "gnome", label: "GNOME", wayland: true, x11: true },
    { id: "kde-plasma", label: "KDE Plasma", wayland: true, x11: true },
    { id: "xfce", label: "XFCE", wayland: true, x11: true },
    { id: "cinnamon", label: "Cinnamon", wayland: true, x11: true },
    { id: "mate", label: "MATE", wayland: true, x11: true },
    { id: "lxqt", label: "LXQt", wayland: true, x11: true },

    { id: "cosmic", label: "COSMIC", wayland: true, x11: false },
    { id: "hyprland", label: "Hyprland", wayland: true, x11: false },
    { id: "niri", label: "Niri", wayland: true, x11: false },
    { id: "sway", label: "Sway", wayland: true, x11: false },

    { id: "i3", label: "i3", wayland: false, x11: true },
    { id: "dwm", label: "DWM", wayland: false, x11: true },
    { id: "awesome", label: "AwesomeWM", wayland: false, x11: true },
    { id: "bspwm", label: "BSPWM", wayland: false, x11: true },
    { id: "openbox", label: "Openbox", wayland: false, x11: true },
    { id: "fluxbox", label: "Fluxbox", wayland: false, x11: true },

    { id: "blackbox", label: "Blackbox", wayland: true, x11: false },
];

export function useDistroFilter(distros) {
    const [protocol, setProtocol] = useState("wayland");
    const [environment, setEnvironment] = useState(null);
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return distros.filter((d) => {
            const protocolMatch = d.displayProtocol.includes(protocol);

            const envMatch =
                !environment ||
                d.displayEnvironments.includes(environment);

            const searchMatch =
                !search ||
                d.name.toLowerCase().includes(search.toLowerCase());

            return protocolMatch && envMatch && searchMatch;
        });
    }, [distros, protocol, environment, search]);

    return {
        ENVIRONMENTS,
        protocol,
        setProtocol,
        environment,
        setEnvironment,
        search,
        setSearch,
        filtered
    };
}

import { useMemo, useState } from "react";

const STABILITY_ORDER = {
    "super-stable": 3,
    "stable": 2,
    "less-stable": 1,
    "not-stable": 0
};

export default function useDistroFilter(distros = []) {
    const [stability, setStability] = useState("stable");
    const [useCase, setUseCase] = useState(null);
    const [environment, setEnvironment] = useState(null);
    const [protocol, setProtocol] = useState("wayland"); // default WAYLAND
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (!distros.length) return [];

        const scored = distros.map((distro) => {
            let score = 0;

            // SEARCH OVERRIDE (highest priority boost)
            if (search.trim()) {
                const q = search.toLowerCase();
                const match =
                    distro.name.toLowerCase().includes(q) ||
                    distro.tags?.some(t => t.includes(q));

                if (match) score += 1000;
                else score -= 1000;
            }

            // STABILITY
            if (STABILITY_ORDER[distro.stability] >= STABILITY_ORDER[stability]) {
                score += 3;
            } else {
                score -= 2;
            }

            // USE CASE
            if (useCase) {
                if (useCase === "SERVER" && distro.serverFocused) score += 4;
                if (useCase === "GAMING" && distro.tags?.includes("gaming")) score += 4;
                if (useCase === "WORK" && distro.tags?.includes("developer")) score += 3;
                if (useCase === "CASUAL" && distro.tags?.includes("beginner-friendly")) score += 3;
            }

            // ENVIRONMENT
            if (environment) {
                if (distro.displayEnvironments?.includes(environment)) {
                    score += 5;
                } else {
                    score -= 2;
                }
            }

            // WAYLAND / X11 FILTER
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
        filters: {
            stability,
            useCase,
            environment,
            protocol,
            search
        },
        setters: {
            setStability,
            setUseCase,
            setEnvironment,
            setProtocol,
            setSearch
        }
    };
}