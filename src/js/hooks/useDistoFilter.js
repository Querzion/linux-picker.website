import { useState, useMemo } from "react";

export const ENVIRONMENTS = [
    { id: "gnome",      label: "GNOME",      wayland: true,  x11: true  },
    { id: "kde-plasma", label: "KDE Plasma", wayland: true,  x11: true  },
    { id: "xfce",       label: "XFCE",       wayland: true,  x11: true  },
    { id: "cinnamon",   label: "Cinnamon",   wayland: true,  x11: true  },
    { id: "mate",       label: "MATE",       wayland: true,  x11: true  },
    { id: "lxqt",       label: "LXQt",       wayland: true,  x11: true  },
    { id: "cosmic",     label: "COSMIC",     wayland: true,  x11: false },
    { id: "hyprland",   label: "Hyprland",   wayland: true,  x11: false },
    { id: "niri",       label: "Niri",       wayland: true,  x11: false },
    { id: "sway",       label: "Sway",       wayland: true,  x11: false },
    { id: "river",      label: "River",      wayland: true,  x11: false },
    { id: "wayfire",    label: "Wayfire",    wayland: true,  x11: false },
    { id: "i3",         label: "i3",         wayland: false, x11: true  },
    { id: "dwm",        label: "DWM",        wayland: false, x11: true  },
    { id: "awesome",    label: "AwesomeWM",  wayland: false, x11: true  },
    { id: "bspwm",      label: "BSPWM",      wayland: false, x11: true  },
    { id: "openbox",    label: "Openbox",    wayland: false, x11: true  },
];

export const STABILITY_LEVELS = [
    { id: "super-stable",   label: "Super Stable"   },
    { id: "stable",         label: "Stable"         },
    { id: "less-stable",    label: "Less Stable"    },
    { id: "bleeding-edge",  label: "Bleeding Edge"  },
];

export const USE_CASES = [
    { id: "any",    label: "Any"    },
    { id: "casual", label: "Casual" },
    { id: "work",   label: "Work"   },
    { id: "gaming", label: "Gaming" },
    { id: "server", label: "Server" },
];

export const DIFFICULTY_LEVELS = [
    { id: "any",          label: "Any"          },
    { id: "beginner",     label: "Beginner"     },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced",     label: "Advanced"     },
];

export const PACKAGE_MANAGERS = [
    { id: "any",    label: "Any"             },
    { id: "apt",    label: "APT"             },
    { id: "dnf",    label: "DNF"             },
    { id: "pacman", label: "Pacman"          },
    { id: "nix",    label: "Nix"             },
    { id: "zypper", label: "Zypper"          },
];

// Higher index = more stable (super-stable is most strict)
export const STABILITY_ORDER = Object.fromEntries(
    STABILITY_LEVELS.map(({ id }, i, arr) => [id, arr.length - 1 - i])
);

export function useDistroFilter(distros = []) {
    const [stabilityIndex,      setStabilityIndex]      = useState(1); // "stable"
    const [useCaseIndex,        setUseCaseIndex]        = useState(0); // "any"
    const [environmentIndex,    setEnvironmentIndex]    = useState(0); // "gnome"
    const [difficultyIndex,     setDifficultyIndex]     = useState(0); // "any"
    const [packageManagerIndex, setPackageManagerIndex] = useState(0); // "any"
    const [protocol,            setProtocol]            = useState("wayland");
    const [search,              setSearch]              = useState("");

    const stability      = STABILITY_LEVELS[stabilityIndex].id;
    const useCase        = USE_CASES[useCaseIndex].id;
    const environment    = ENVIRONMENTS[environmentIndex].id;
    const difficulty     = DIFFICULTY_LEVELS[difficultyIndex].id;
    const packageManager = PACKAGE_MANAGERS[packageManagerIndex].id;

    const filtered = useMemo(() => {
        return distros
            .filter((distro) => {
                // SEARCH — hard exclude if no match
                if (search.trim()) {
                    const q = search.toLowerCase();
                    const match =
                        distro.name.toLowerCase().includes(q) ||
                        distro.tags?.some(t => t.toLowerCase().includes(q));
                    if (!match) return false;
                }

                // STABILITY — hard exclude if distro is less stable than selected
                if (STABILITY_ORDER[distro.stability] < STABILITY_ORDER[stability]) {
                    return false;
                }

                // PROTOCOL — hard exclude if distro doesn't support selected protocol
                if (!distro.displayProtocol?.includes(protocol)) {
                    return false;
                }

                // ENVIRONMENT — hard exclude if distro doesn't support selected environment
                // Server distros (empty displayEnvironments) pass through
                if (
                    distro.displayEnvironments?.length > 0 &&
                    !distro.displayEnvironments.includes(environment)
                ) {
                    return false;
                }

                // USE CASE — hard exclude if mismatch (skip if "any")
                if (useCase !== "any") {
                    if (useCase === "server"  && !distro.serverFocused)                          return false;
                    if (useCase === "gaming"  && !distro.tags?.includes("gaming"))               return false;
                    if (useCase === "work"    && !distro.tags?.includes("developer"))            return false;
                    if (useCase === "casual"  && !distro.tags?.includes("beginner-friendly"))    return false;
                }

                // DIFFICULTY — hard exclude if mismatch (skip if "any")
                if (difficulty !== "any") {
                    if (difficulty === "beginner"     && !distro.tags?.includes("beginner-friendly")) return false;
                    if (difficulty === "advanced"     && !distro.tags?.includes("advanced"))          return false;
                    if (difficulty === "intermediate" &&
                        (distro.tags?.includes("beginner-friendly") || distro.tags?.includes("advanced"))
                    ) return false;
                }

                // PACKAGE MANAGER — hard exclude if mismatch (skip if "any")
                if (packageManager !== "any" && !distro.tags?.includes(packageManager)) {
                    return false;
                }

                return true;
            })
            .sort((a, b) =>
                // Sort by stability descending (most stable first)
                STABILITY_ORDER[b.stability] - STABILITY_ORDER[a.stability]
            );
    }, [distros, stability, useCase, environment, difficulty, packageManager, protocol, search]);

    return {
        filtered,
        stabilityIndex,      setStabilityIndex,
        useCaseIndex,        setUseCaseIndex,
        environmentIndex,    setEnvironmentIndex,
        difficultyIndex,     setDifficultyIndex,
        packageManagerIndex, setPackageManagerIndex,
        protocol,            setProtocol,
        search,              setSearch,
    };
}