import { useState, useMemo } from "react";

/* =========================
    ENVIRONMENTS
========================= */
export const ENVIRONMENTS = [
    { id: "any", label: "Any", wayland: true, x11: true },

    { id: "gnome", label: "GNOME", wayland: true, x11: true },
    { id: "kde-plasma", label: "KDE Plasma", wayland: true, x11: true },
    { id: "xfce", label: "XFCE", wayland: true, x11: true },
    { id: "cinnamon", label: "Cinnamon", wayland: true, x11: true },
    { id: "mate", label: "MATE", wayland: true, x11: true },
    { id: "lxqt", label: "LXQt", wayland: true, x11: true },

    { id: "cosmic", label: "COSMIC", wayland: true, x11: false },
    { id: "hyprland", label: "Hyprland", wayland: true, x11: false },
    { id: "niri", label: "Niri", wayland: true, x11: false },
    { id: "mangowc", label: "Mango", wayland: true, x11: false },
    { id: "sway", label: "Sway", wayland: true, x11: false },
    { id: "river", label: "River", wayland: true, x11: false },
    { id: "wayfire", label: "Wayfire", wayland: true, x11: false },

    { id: "i3", label: "i3", wayland: false, x11: true },
    { id: "dwm", label: "DWM", wayland: false, x11: true },
    { id: "awesome", label: "AwesomeWM", wayland: false, x11: true },
    { id: "bspwm", label: "BSPWM", wayland: false, x11: true },
    { id: "openbox", label: "Openbox", wayland: false, x11: true },
];

/* =========================
    STABILITY
========================= */
export const STABILITY_LEVELS = [
    { id: "any", label: "Any" },
    { id: "super-stable", label: "Super Stable" },
    { id: "stable", label: "Stable" },
    { id: "less-stable", label: "Less Stable" },
    { id: "bleeding-edge", label: "Bleeding Edge" },
];

/* =========================
    SYSTEM TYPES
========================= */
export const SYSTEM_TYPES = [
    { id: "any", label: "Any" },
    { id: "desktop", label: "Desktop" },
    { id: "server", label: "Server" },
    { id: "minimal", label: "Minimal" },
    { id: "gaming", label: "Gaming" },
    { id: "workstation", label: "Workstation" },
];

/* =========================
    DIFFICULTY
========================= */
export const DIFFICULTY_LEVELS = [
    { id: "any", label: "Any" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
];

/* =========================
    PACKAGE MANAGERS
========================= */
export const PACKAGE_MANAGERS = [
    { id: "any", label: "Any" },
    { id: "apt", label: "APT" },
    { id: "dnf", label: "DNF" },
    { id: "pacman", label: "Pacman" },
    { id: "nix", label: "Nix" },
    { id: "zypper", label: "Zypper" },
];

/* =========================================================
    NEW SLIDERS (ADDITIVE)
========================================================= */

export const FAMILY_LEVELS = [
    { id: "any", label: "Any" },
    { id: "independent", label: "Independent" },
    { id: "debian-based", label: "Debian Based" },
    { id: "ubuntu-based", label: "Ubuntu Based" },
    { id: "arch-based", label: "Arch Based" },
    { id: "rpm-based", label: "RPM Based" },
];

export const ORIGIN_LEVELS = [
    { id: "any", label: "Any" },
    { id: "community", label: "Community" },
    { id: "official", label: "Official" },
];

export const DESKTOP_RICHNESS = [
    { id: "any", label: "Any" },
    { id: "minimal", label: "Minimal" },
    { id: "light", label: "Lightweight" },
    { id: "standard", label: "Standard" },
    { id: "full", label: "Full Desktop" },
];

/* =========================
    STABILITY ORDER
========================= */
export const STABILITY_ORDER = Object.fromEntries(
    STABILITY_LEVELS
        .filter(l => l.id !== "any")
        .map(({ id }, i, arr) => [id, arr.length - 1 - i])
);

/* =========================
    HOOK
========================= */
export function useDistroFilter(distros = []) {

    const [stabilityIndex, setStabilityIndex] = useState(1);
    const [systemTypeIndex, setSystemTypeIndex] = useState(0);
    const [environmentIndex, setEnvironmentIndex] = useState(0);
    const [difficultyIndex, setDifficultyIndex] = useState(0);
    const [packageManagerIndex, setPackageManagerIndex] = useState(0);

    /* NEW SLIDERS */
    const [familyIndex, setFamilyIndex] = useState(0);
    const [originIndex, setOriginIndex] = useState(0);
    const [desktopIndex, setDesktopIndex] = useState(0);

    const [protocol, setProtocol] = useState("wayland");
    const [search, setSearch] = useState("");

    const stability = STABILITY_LEVELS[stabilityIndex].id;
    const systemType = SYSTEM_TYPES[systemTypeIndex].id;
    const environment = ENVIRONMENTS[environmentIndex].id;
    const difficulty = DIFFICULTY_LEVELS[difficultyIndex].id;
    const packageManager = PACKAGE_MANAGERS[packageManagerIndex].id;

    const family = FAMILY_LEVELS[familyIndex].id;
    const origin = ORIGIN_LEVELS[originIndex].id;
    const desktop = DESKTOP_RICHNESS[desktopIndex].id;

    const filtered = useMemo(() => {
        return distros
            .filter((distro) => {

                /* =========================
                    SEARCH (EXPANDED)
                ========================= */
                if (search.trim()) {
                    const q = search.toLowerCase().trim().replace(/[-_]/g, " ");

                    const match =
                        distro.name?.toLowerCase().includes(q) ||
                        distro.id?.toLowerCase().includes(q) ||
                        distro.family?.toLowerCase().includes(q) ||
                        distro.type?.toLowerCase().includes(q) ||
                        distro.tags?.some(t => t.toLowerCase().includes(q)) ||
                        distro.description?.toLowerCase().includes(q);

                    if (!match) return false;
                }

                /* =========================
                    STABILITY
                ========================= */
                if (stability !== "any") {
                    if (distro.stability !== stability) return false;
                }

                /* =========================
                    PROTOCOL
                ========================= */
                if (!distro.displayProtocol?.includes(protocol)) return false;

                /* =========================
                    ENVIRONMENT
                ========================= */
                if (
                    environment !== "any" &&
                    !distro.displayEnvironments?.includes(environment)
                ) return false;

                /* =========================
                    SYSTEM TYPE
                ========================= */
                if (systemType !== "any") {
                    const tags = distro.tags || [];

                    if (systemType === "server" && !distro.serverFocused) return false;
                    if (systemType === "desktop" && distro.serverFocused) return false;
                    if (systemType === "minimal" && !tags.includes("minimal")) return false;
                    if (systemType === "gaming" && !tags.includes("gaming")) return false;
                    if (systemType === "workstation" &&
                        !(tags.includes("developer") || tags.includes("workstation"))
                    ) return false;
                }

                /* =========================
                    DIFFICULTY
                ========================= */
                if (difficulty !== "any") {
                    if (difficulty === "beginner" &&
                        !distro.tags?.includes("beginner-friendly")
                    ) return false;

                    if (difficulty === "advanced" &&
                        !distro.tags?.includes("advanced")
                    ) return false;
                }

                /* =========================
                    PACKAGE MANAGER
                ========================= */
                if (
                    packageManager !== "any" &&
                    !distro.tags?.includes(packageManager)
                ) return false;

                /* =========================
                    FAMILY (NEW)
                ========================= */
                if (family !== "any" && distro.family !== family) return false;

                /* =========================
                    ORIGIN (NEW)
                ========================= */
                if (origin !== "any" && distro.origin !== origin) return false;

                /* =========================
                    DESKTOP RICHNESS (NEW)
                ========================= */
                if (desktop !== "any") {
                    const envCount = distro.displayEnvironments?.length || 0;

                    if (desktop === "minimal" && envCount > 1) return false;
                    if (desktop === "light" && envCount > 3) return false;
                    if (desktop === "standard" && envCount < 2) return false;
                    if (desktop === "full" && envCount < 5) return false;
                }

                return true;
            })
            .sort((a, b) =>
                a.name.localeCompare(b.name, "en", { sensitivity: "base" })
            );
    }, [
        distros,
        stability,
        systemType,
        environment,
        difficulty,
        packageManager,
        family,
        origin,
        desktop,
        protocol,
        search
    ]);

    return {
        filtered,

        stabilityIndex,
        setStabilityIndex,

        systemTypeIndex,
        setSystemTypeIndex,

        environmentIndex,
        setEnvironmentIndex,

        difficultyIndex,
        setDifficultyIndex,

        packageManagerIndex,
        setPackageManagerIndex,

        familyIndex,
        setFamilyIndex,

        originIndex,
        setOriginIndex,

        desktopIndex,
        setDesktopIndex,

        protocol,
        setProtocol,

        search,
        setSearch,
    };
}