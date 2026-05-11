import { useState, useMemo } from "react";

/* =========================
    ENVIRONMENTS
    Each entry declares which protocols it supports.
    getEnvironmentsForProtocol() uses this to restrict
    the environment slider based on active protocol.
========================= */
export const ENVIRONMENTS = [
    { id: "any",       label: "Any",       wayland: true,  x11: true  },
    { id: "gnome",     label: "GNOME",     wayland: true,  x11: true  },
    { id: "kde-plasma",label: "KDE Plasma",wayland: true,  x11: true  },
    { id: "xfce",      label: "XFCE",      wayland: true,  x11: true  },
    { id: "cinnamon",  label: "Cinnamon",  wayland: true,  x11: true  },
    { id: "mate",      label: "MATE",      wayland: true,  x11: true  },
    { id: "lxqt",      label: "LXQt",      wayland: true,  x11: true  },
    { id: "cosmic",    label: "COSMIC",    wayland: true,  x11: false },
    { id: "hyprland",  label: "Hyprland",  wayland: true,  x11: false },
    { id: "niri",      label: "Niri",      wayland: true,  x11: false },
    { id: "sway",      label: "Sway",      wayland: true,  x11: false },
    { id: "river",     label: "River",     wayland: true,  x11: false },
    { id: "wayfire",   label: "Wayfire",   wayland: true,  x11: false },
    { id: "mangowc",   label: "Mango",     wayland: true,  x11: false },
    { id: "i3",        label: "i3",        wayland: false, x11: true  },
    { id: "dwm",       label: "DWM",       wayland: false, x11: true  },
    { id: "awesome",   label: "AwesomeWM", wayland: false, x11: true  },
    { id: "bspwm",     label: "BSPWM",     wayland: false, x11: true  },
    { id: "openbox",   label: "Openbox",   wayland: false, x11: true  },
    { id: "fluxbox",   label: "Fluxbox",   wayland: false, x11: true  },
];

export function getEnvironmentsForProtocol(protocol) {
    return ENVIRONMENTS.filter(env =>
        protocol === "wayland" ? env.wayland : env.x11
    );
}

/* =========================
    SYSTEM TYPES
========================= */
export const SYSTEM_TYPES = [
    { id: "any",         label: "Any"         },
    { id: "desktop",     label: "Desktop"     },
    { id: "server",      label: "Server"      },
    { id: "minimal",     label: "Minimal"     },
    { id: "gaming",      label: "Gaming"      },
    { id: "workstation", label: "Workstation" },
];

/* =========================
    DIFFICULTY  (1–10)
========================= */
export const DIFFICULTY_MIN = 1;
export const DIFFICULTY_MAX = 10;

export function getDifficultyLabel(score) {
    if (score <= 2)  return "Beginner Friendly";
    if (score <= 4)  return "Easy";
    if (score <= 6)  return "Intermediate";
    if (score <= 8)  return "Advanced";
    return "Expert";
}

export function isBeginnerRecommended(score) {
    return score !== undefined && score <= 2;
}

/* =========================
    STABILITY  (1–10)
    High score = more stable.
========================= */
export const STABILITY_MIN = 1;
export const STABILITY_MAX = 10;

export function getStabilityLabel(score) {
    if (score <= 2)  return "Bleeding Edge";
    if (score <= 4)  return "Less Stable";
    if (score <= 6)  return "Stable";
    if (score <= 8)  return "Super Stable";
    return "Rock Solid";
}

/* =========================
    PACKAGE MANAGERS
========================= */
export const PACKAGE_MANAGERS = [
    { id: "any",     label: "Any"     },
    { id: "apt",     label: "APT"     },
    { id: "dnf",     label: "DNF"     },
    { id: "pacman",  label: "Pacman"  },
    { id: "nix",     label: "Nix"     },
    { id: "zypper",  label: "Zypper"  },
    { id: "portage", label: "Portage" },
    { id: "xbps",    label: "XBPS"   },
    { id: "apk",     label: "APK"    },
    { id: "eopkg",   label: "eopkg"  },
];

/* =========================
    SECONDARY / UNIVERSAL
========================= */
export const SECONDARY_PACKAGE = [
    { id: "any",      label: "Any"      },
    { id: "flatpak",  label: "Flatpak"  },
    { id: "snap",     label: "Snap"     },
    { id: "appimage", label: "AppImage" },
    { id: "aur",      label: "AUR"      },
];

/* =========================
    FAMILY
========================= */
export const FAMILY_LEVELS = [
    { id: "any",          label: "Any"          },
    { id: "independent",  label: "Independent"  },
    { id: "debian-based", label: "Debian Based" },
    { id: "ubuntu-based", label: "Ubuntu Based" },
    { id: "arch-based",   label: "Arch Based"   },
    { id: "redhat-based", label: "RedHat Based" },
    { id: "suse-based",   label: "SUSE Based"   },
];

/* =========================
    ORIGIN
========================= */
export const ORIGIN_LEVELS = [
    { id: "any",       label: "Any"       },
    { id: "community", label: "Community" },
    { id: "official",  label: "Official"  },
];

/* =========================
    RELEASE MODEL
========================= */
export const RELEASE_MODELS = [
    { id: "any",          label: "Any"          },
    { id: "rolling",      label: "Rolling"      },
    { id: "fixed",        label: "Fixed"        },
    { id: "lts",          label: "LTS"          },
    { id: "immutable",    label: "Immutable"    },
    { id: "semi-rolling", label: "Semi-Rolling" },
];

/* =========================
    INIT SYSTEM
========================= */
export const INIT_SYSTEMS = [
    { id: "any",     label: "Any"     },
    { id: "systemd", label: "systemd" },
    { id: "openrc",  label: "OpenRC"  },
    { id: "runit",   label: "runit"   },
    { id: "s6",      label: "s6"      },
    { id: "dinit",   label: "dinit"   },
];

/* =========================
    RAM  (MB steps)
========================= */
export const RAM_STEPS = [256, 512, 1024, 2048, 4096, 8192];
export const RAM_MIN = 0;
export const RAM_MAX = RAM_STEPS.length - 1;

export function getRamLabel(index) {
    if (index === 0) return "Any";
    const mb = RAM_STEPS[index];
    return mb >= 1024 ? `≤ ${mb / 1024} GB` : `≤ ${mb} MB`;
}

/* =========================
    ARCHITECTURE
========================= */
export const ARCHITECTURES = [
    { id: "any",    label: "Any"    },
    { id: "x86_64", label: "x86_64" },
    { id: "arm64",  label: "ARM64"  },
    { id: "armhf",  label: "ARMhf"  },
    { id: "i386",   label: "i386"   },
    { id: "ppc64",  label: "PPC64"  },
    { id: "mips",   label: "MIPS"   },
];

/* =========================
    GPU
    null  = no filter active
    "amd" | "intel" | "nvidia"
========================= */
export const GPU_OPTIONS = [
    { id: "amd",    label: "AMD",    color: "#EF3939" },
    { id: "intel",  label: "Intel",  color: "#0071C5" },
    { id: "nvidia", label: "NVIDIA", color: "#76B900" },
];

/* =========================
    DESKTOP RICHNESS
========================= */
export const DESKTOP_RICHNESS = [
    { id: "any",      label: "Any"          },
    { id: "minimal",  label: "Minimal"      },
    { id: "light",    label: "Lightweight"  },
    { id: "standard", label: "Standard"     },
    { id: "full",     label: "Full Desktop" },
];

/* =========================
    HOOK
========================= */
export function useDistroFilter(distros = []) {

    /* ── always-visible filters ── */
    const [difficultyMax,      setDifficultyMax]      = useState(DIFFICULTY_MAX);
    const [stabilityMin,       setStabilityMin]       = useState(STABILITY_MIN);
    const [systemTypeIndex,    setSystemTypeIndex]    = useState(0);
    const [originIndex,        setOriginIndex]        = useState(0);
    const [search,             setSearch]             = useState("");

    /* ── advanced filters ── */
    const [protocol,           setProtocol]           = useState("wayland");
    const [environmentIndex,   setEnvironmentIndex]   = useState(0);
    const [packageManagerIndex,setPackageManagerIndex]= useState(0);
    const [secondaryPkgIndex,  setSecondaryPkgIndex]  = useState(0);
    const [releaseModelIndex,  setReleaseModelIndex]  = useState(0);
    const [initSystemIndex,    setInitSystemIndex]    = useState(0);
    const [familyIndex,        setFamilyIndex]        = useState(0);
    const [desktopIndex,       setDesktopIndex]       = useState(0);
    const [ramIndex,           setRamIndex]           = useState(0);
    const [archIndex,          setArchIndex]          = useState(1);
    const [gpu,                setGpu]                = useState(null);

    /* resolved values */
    const systemType    = SYSTEM_TYPES[systemTypeIndex].id;
    const origin        = ORIGIN_LEVELS[originIndex].id;
    const packageManager= PACKAGE_MANAGERS[packageManagerIndex].id;
    const secondaryPkg  = SECONDARY_PACKAGE[secondaryPkgIndex].id;
    const releaseModel  = RELEASE_MODELS[releaseModelIndex].id;
    const initSystem    = INIT_SYSTEMS[initSystemIndex].id;
    const family        = FAMILY_LEVELS[familyIndex].id;
    const desktop       = DESKTOP_RICHNESS[desktopIndex].id;
    const minRam        = RAM_STEPS[ramIndex];
    const architecture  = ARCHITECTURES[archIndex].id;

    /* environments valid for active protocol — index clamped to range */
    const validEnvs    = getEnvironmentsForProtocol(protocol);
    const safeEnvIndex = Math.min(environmentIndex, validEnvs.length - 1);
    const environment  = validEnvs[safeEnvIndex]?.id ?? "any";

    const reset = () => {
        setDifficultyMax(DIFFICULTY_MAX);
        setStabilityMin(STABILITY_MIN);
        setSystemTypeIndex(0);
        setOriginIndex(0);
        setSearch("");
        setProtocol("wayland");
        setEnvironmentIndex(0);
        setPackageManagerIndex(0);
        setSecondaryPkgIndex(0);
        setReleaseModelIndex(0);
        setInitSystemIndex(0);
        setFamilyIndex(0);
        setDesktopIndex(0);
        setRamIndex(0);
        setArchIndex(0);
        setGpu(null);
    };

    const filtered = useMemo(() => {
        return distros
            .filter((distro) => {

                /* ── SEARCH overrides all ── */
                if (search.trim()) {
                    const q = search.toLowerCase().trim().replace(/[-_]/g, " ");
                    return (
                        distro.name?.toLowerCase().includes(q) ||
                        distro.id?.toLowerCase().includes(q) ||
                        distro.family?.toLowerCase().includes(q) ||
                        distro.type?.toLowerCase().includes(q) ||
                        distro.tags?.some(t => t.toLowerCase().includes(q)) ||
                        distro.description?.toLowerCase().includes(q) ||
                        distro.packageManagement?.primary?.toLowerCase().includes(q) ||
                        distro.initSystem?.toLowerCase().includes(q) ||
                        distro.releaseModel?.toLowerCase().includes(q)
                    );
                }

                /* ── DIFFICULTY ── */
                if (distro.difficultyScore !== undefined) {
                    if (distro.difficultyScore > difficultyMax) return false;
                } else {
                    if (difficultyMax < 5  && !distro.tags?.includes("beginner-friendly")) return false;
                    if (difficultyMax < 10 &&  distro.tags?.includes("advanced"))          return false;
                }

                /* ── STABILITY ── */
                if (distro.stabilityScore !== undefined) {
                    if (distro.stabilityScore < stabilityMin) return false;
                } else {
                    const legacyMap = {
                        "bleeding-edge": 2, "less-stable": 4,
                        "stable": 6,        "super-stable": 8,
                    };
                    const legacyScore = legacyMap[distro.stability] ?? 5;
                    if (legacyScore < stabilityMin) return false;
                }

                /* ── PROTOCOL ── */
                if (!distro.displayProtocol?.includes(protocol)) return false;

                /* ── ENVIRONMENT (only envs valid for current protocol) ── */
                if (environment !== "any") {
                    if (!distro.displayEnvironments?.includes(environment)) return false;
                }

                /* ── SYSTEM TYPE ── */
                if (systemType !== "any") {
                    const tags = distro.tags || [];
                    if (systemType === "server"      && !distro.serverFocused)                                       return false;
                    if (systemType === "desktop"     &&  distro.serverFocused)                                       return false;
                    if (systemType === "minimal"     && !tags.includes("minimal"))                                   return false;
                    if (systemType === "gaming"      && !tags.includes("gaming"))                                    return false;
                    if (systemType === "workstation" && !(tags.includes("developer") || tags.includes("workstation"))) return false;
                }

                /* ── ORIGIN ── */
                if (origin !== "any" && distro.origin !== origin) return false;

                /* ── PRIMARY PACKAGE MANAGER ── */
                if (packageManager !== "any") {
                    if (distro.packageManagement?.primary !== packageManager) return false;
                }

                /* ── SECONDARY / UNIVERSAL ── */
                if (secondaryPkg !== "any") {
                    if (secondaryPkg === "aur") {
                        if (!distro.packageManagement?.aur) return false;
                    } else {
                        const sec = distro.packageManagement?.secondary || [];
                        const sup = distro.packageManagement?.supported  || [];
                        if (!sec.includes(secondaryPkg) && !sup.includes(secondaryPkg)) return false;
                    }
                }

                /* ── RELEASE MODEL ── */
                if (releaseModel !== "any" && distro.releaseModel !== releaseModel) return false;

                /* ── INIT SYSTEM ── */
                if (initSystem !== "any" && distro.initSystem !== initSystem) return false;

                /* ── FAMILY ── */
                if (family !== "any" && distro.family !== family) return false;

                /* ── DESKTOP RICHNESS ── */
                if (desktop !== "any") {
                    const envCount = distro.displayEnvironments?.length || 0;
                    if (desktop === "minimal"  && envCount > 1) return false;
                    if (desktop === "light"    && envCount > 3) return false;
                    if (desktop === "standard" && envCount < 2) return false;
                    if (desktop === "full"     && envCount < 5) return false;
                }

                /* ── RAM ── */
                if (ramIndex > 0) {
                    const req = distro.systemRequirements?.minRamMb;
                    if (req !== undefined && req > minRam) return false;
                }

                /* ── ARCHITECTURE ── */
                if (architecture !== "any") {
                    const archs = distro.systemRequirements?.architectures || [];
                    if (!archs.includes(architecture)) return false;
                }

                /* ── GPU ── */
                if (gpu !== null) {
                    if (gpu === "nvidia" && !distro.outOfBox?.nvidiaDrivers) return false;
                    if (gpu === "amd"    && !distro.outOfBox?.amdDrivers)    return false;
                    if (gpu === "intel"  && !distro.outOfBox?.intelDrivers)  return false;
                }

                return true;
            })
            .sort((a, b) =>
                a.name.localeCompare(b.name, "en", { sensitivity: "base" })
            );
    }, [
        distros, search,
        difficultyMax, stabilityMin,
        systemType, origin, protocol, environment,
        packageManager, secondaryPkg, releaseModel, initSystem,
        family, desktop, ramIndex, minRam, architecture, gpu,
    ]);

    return {
        filtered,

        /* core */
        difficultyMax,        setDifficultyMax,
        stabilityMin,         setStabilityMin,
        systemTypeIndex,      setSystemTypeIndex,
        originIndex,          setOriginIndex,
        search,               setSearch,

        /* advanced */
        protocol,             setProtocol,
        environmentIndex,     setEnvironmentIndex,
        safeEnvIndex,
        packageManagerIndex,  setPackageManagerIndex,
        secondaryPkgIndex,    setSecondaryPkgIndex,
        releaseModelIndex,    setReleaseModelIndex,
        initSystemIndex,      setInitSystemIndex,
        familyIndex,          setFamilyIndex,
        desktopIndex,         setDesktopIndex,
        ramIndex,             setRamIndex,
        archIndex,            setArchIndex,
        gpu,                  setGpu,

        reset,
    };
}
