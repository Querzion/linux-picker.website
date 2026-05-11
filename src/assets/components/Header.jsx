import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Brand from "./Brand";

import { useDistro } from "../components/contexts/DistroContext";
import {
    getDifficultyLabel,
    getStabilityLabel,
    isBeginnerRecommended,
} from "../../js/hooks/useDistoFilter";

import IconButton from "@mui/material/IconButton";
import MenuIcon   from "@mui/icons-material/Menu";
import Drawer     from "@mui/material/Drawer";

/* ═══════════════════════════════════════════════════════
    GRADIENT BAR
═══════════════════════════════════════════════════════ */
const GradientBar = ({
    score,
    min = 1,
    max = 10,
    direction,
    barTitle,
    leftLabel,
    rightLabel,
    translatedLabel,
    mutedColor,
    textColor,
}) => {
    if (score === undefined) return null;

    const pct = ((score - min) / (max - min)) * 100;
    const gradient =
        direction === "difficulty"
            ? "linear-gradient(to right, #4ade80, #facc15, #f87171)"
            : "linear-gradient(to right, #f87171, #facc15, #4ade80)";

    return (
        <div className="gradient-bar-wrap">
            <div className="gradient-bar-top-row">
                <span className="gradient-bar-title"       style={{ color: mutedColor }}>{barTitle}</span>
                <span className="gradient-bar-translation" style={{ color: textColor }}>{translatedLabel}</span>
            </div>
            <div className="gradient-bar-track">
                <div className="gradient-bar-fill-bg" style={{ background: gradient }} />
                <div className="gradient-bar-mask"    style={{ left: `${pct}%` }} />
                <div className="gradient-bar-thumb"   style={{ left: `${pct}%` }} />
            </div>
            <div className="gradient-bar-scale">
                <span style={{ color: mutedColor }}>{leftLabel}</span>
                <span style={{ color: mutedColor }}>{rightLabel}</span>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
    CHIP
═══════════════════════════════════════════════════════ */
const Chip = ({ label, style }) => (
    <span className="tag-chip" style={style}>{label}</span>
);

/* ═══════════════════════════════════════════════════════
    HEADER
═══════════════════════════════════════════════════════ */
const Header = ({ onToggleLinks, linksOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isPicker = location.pathname === "/picker";
    const isAbout  = location.pathname === "/about";

    const [drawerOpen, setDrawerOpen] = useState(false);
    const { selectedDistro, themeMode } = useDistro();

    const go = (path) => { navigate(path); setDrawerOpen(false); };

    const theme     = selectedDistro?.themes?.[themeMode] ?? {};
    const muted     = theme.textMuted || theme.textSecondary || theme.textColor;
    const textColor = theme.textColor || "#ffffff";
    const chipStyle = {
        borderColor: theme.tagBorder || theme.accentColor,
        background:  theme.tagBg,
        color:       theme.tagText   || theme.textColor,
    };

    /* package chips */
    const pm = selectedDistro?.packageManagement;
    const pkgChips = pm
        ? [pm.primary, ...(pm.secondary || []), ...(pm.aur ? ["aur"] : [])]
        : [];

    /* out-of-box truthy chips */
    const oob = selectedDistro?.outOfBox || {};
    const oobChips = [
        oob.codecs           && "codecs",
        oob.nvidiaDrivers    && "nvidia",
        oob.amdDrivers       && "amd",
        oob.intelDrivers     && "intel",
        oob.officeTools      && "office",
        oob.creativeTools    && "creative",
        oob.gamingTools      && "gaming",
        oob.dualBootFriendly && "dual-boot",
    ].filter(Boolean);

    const sysReq  = selectedDistro?.systemRequirements;
    const beginner = isBeginnerRecommended(selectedDistro?.difficultyScore);

    return (
        <Container>
            <Card
                className={`header-card ${selectedDistro ? "distro-selected" : ""}`}
                bare
                style={
                    selectedDistro
                        ? {
                            backgroundColor: theme.bgColor,
                            borderColor:     theme.borderColor,
                            color:           theme.textColor,
                        }
                        : {}
                }
            >
                {/* ── BRAND ── */}
                <div className="brand">
                    {selectedDistro ? (
                        <>
                            <img
                                className="brand-logo"
                                src={selectedDistro.logo}
                                alt={selectedDistro.name}
                            />
                            <div className="brand-title-block">
                                <span
                                    className="brand-title distro-active"
                                    style={{ color: theme.textColor }}
                                >
                                    {selectedDistro.name.toUpperCase()}
                                </span>
                                <span
                                    className={`stability ${selectedDistro.stability}`}
                                    style={{ color: theme.accentColor }}
                                >
                                    {selectedDistro.stability}
                                </span>
                            </div>
                        </>
                    ) : (
                        <Brand />
                    )}
                </div>

                {/* ── MOBILE MENU BUTTON ── */}
                <div className="mobile-menu">
                    <IconButton onClick={() => setDrawerOpen(true)} sx={{ p: 1 }}>
                        <MenuIcon
                            sx={{
                                fontSize: 32,
                                color: selectedDistro ? theme.textColor : "inherit",
                            }}
                        />
                    </IconButton>
                </div>

                {/* ── DESKTOP NAV ── */}
                <div className="header-nav">
                    {selectedDistro ? (
                        /* Single Links button — toggles DistroLinks card */
                        <Button
                            variant={linksOpen ? "primary" : "secondary"}
                            width="160px"
                            style={
                                linksOpen
                                    ? {
                                        background:  theme.btnPrimaryBg,
                                        color:       theme.btnPrimaryText,
                                        borderColor: theme.btnPrimaryBorder,
                                    }
                                    : {
                                        background:  theme.btnSecondaryBg,
                                        color:       theme.btnSecondaryText,
                                        borderColor: theme.btnSecondaryBorder,
                                    }
                            }
                            onClick={onToggleLinks}
                        >
                            {linksOpen ? "Close Links" : "Links"}
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                width="160px"
                                onClick={() => navigate(isPicker ? "/" : "/picker")}
                            >
                                {isPicker ? "Home" : "Distro Filter"}
                            </Button>
                            <Button
                                variant="secondary"
                                width="160px"
                                onClick={() => navigate(isAbout ? "/" : "/about")}
                            >
                                {isAbout ? "Home" : "About"}
                            </Button>
                        </>
                    )}
                </div>

                {/* ── DIVIDER ── */}
                {selectedDistro && (
                    <hr
                        className="header-distro-divider"
                        style={{ borderColor: theme.dividerColor }}
                    />
                )}

                {/* ── DESCRIPTION ── */}
                {selectedDistro && (
                    <p
                        className="brand-distro-description"
                        style={{ color: theme.textSecondary || theme.textColor }}
                    >
                        {selectedDistro.description}
                    </p>
                )}

                {/* ── DIFFICULTY BAR ── */}
                {selectedDistro && (
                    <div className="header-diffbar">
                        <GradientBar
                            score={selectedDistro.difficultyScore}
                            direction="difficulty"
                            barTitle="Difficulty"
                            leftLabel="Beginner"
                            rightLabel="Expert"
                            translatedLabel={getDifficultyLabel(selectedDistro.difficultyScore)}
                            mutedColor={muted}
                            textColor={textColor}
                        />
                    </div>
                )}

                {/* ── STABILITY BAR ── */}
                {selectedDistro && (
                    <div className="header-stabbar">
                        <GradientBar
                            score={selectedDistro.stabilityScore}
                            direction="stability"
                            barTitle="Stability"
                            leftLabel="Unstable"
                            rightLabel="Rock Solid"
                            translatedLabel={getStabilityLabel(selectedDistro.stabilityScore)}
                            mutedColor={muted}
                            textColor={textColor}
                        />
                    </div>
                )}

                {/* ── SYSTEM REQUIREMENTS ── */}
                {selectedDistro && sysReq && (
                    <div className="header-sysreq">
                        <span className="header-sysreq-label" style={{ color: muted }}>
                            System Requirements
                        </span>
                        <div className="header-sysreq-row">
                            <span className="sysreq-item" style={{ color: muted }}>
                                RAM:{" "}
                                <strong style={{ color: textColor }}>
                                    {sysReq.minRamMb >= 1024
                                        ? `${sysReq.minRamMb / 1024} GB`
                                        : `${sysReq.minRamMb} MB`}{" "}
                                    min
                                    {sysReq.recommendedRamMb
                                        ? ` / ${
                                            sysReq.recommendedRamMb >= 1024
                                                ? `${sysReq.recommendedRamMb / 1024} GB`
                                                : `${sysReq.recommendedRamMb} MB`
                                        } rec`
                                        : ""}
                                </strong>
                            </span>
                            <span className="sysreq-item" style={{ color: muted }}>
                                Storage:{" "}
                                <strong style={{ color: textColor }}>
                                    {sysReq.minStorageGb} GB min
                                </strong>
                            </span>
                            {sysReq.architectures?.length > 0 && (
                                <span className="sysreq-item" style={{ color: muted }}>
                                    Arch:{" "}
                                    {sysReq.architectures.map((a) => (
                                        <strong key={a} style={{ color: textColor }}>
                                            {a}{" "}
                                        </strong>
                                    ))}
                                </span>
                            )}
                            <span className="sysreq-item" style={{ color: muted }}>
                                BIOS:{" "}
                                <strong style={{ color: textColor }}>
                                    {[
                                        sysReq.supportsLegacyBios && "Legacy",
                                        sysReq.supportsUefi && "UEFI",
                                    ]
                                        .filter(Boolean)
                                        .join(" / ")}
                                </strong>
                            </span>
                        </div>
                    </div>
                )}

                {/* ── TAGS ── */}
                {selectedDistro && (
                    <div className="header-distro-tags tag-row">
                        {beginner && (
                            <Chip
                                label="✓ beginner"
                                style={{
                                    ...chipStyle,
                                    borderColor: "#4ade80",
                                    color:       "#4ade80",
                                    background:  "rgba(74,222,128,0.08)",
                                }}
                            />
                        )}

                        <Chip label={selectedDistro.family}                                style={chipStyle} />
                        <Chip label={selectedDistro.serverFocused ? "server" : "desktop"}  style={chipStyle} />

                        {selectedDistro.releaseModel && (
                            <Chip label={selectedDistro.releaseModel} style={chipStyle} />
                        )}
                        {selectedDistro.initSystem &&
                            selectedDistro.initSystem !== "systemd" && (
                                <Chip label={selectedDistro.initSystem} style={chipStyle} />
                            )}

                        {pkgChips.map((pkg) => (
                            <Chip key={pkg} label={pkg} style={chipStyle} />
                        ))}

                        {selectedDistro.displayProtocol?.map((p) => (
                            <Chip key={p} label={p} style={chipStyle} />
                        ))}

                        {oobChips.map((label) => (
                            <Chip key={label} label={label} style={chipStyle} />
                        ))}

                        {selectedDistro.tags?.slice(0, 4).map((tag) => (
                            <Chip key={tag} label={tag} style={chipStyle} />
                        ))}
                    </div>
                )}

                {/* ── MOBILE DRAWER ── */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    className="mobile-drawer"
                    PaperProps={{
                        style: selectedDistro
                            ? {
                                backgroundColor: theme.drawerBg,
                                borderLeft: `1px solid ${theme.drawerBorder}`,
                            }
                            : {},
                    }}
                >
                    <div className="drawer-menu">
                        {selectedDistro ? (
                            <Button
                                variant={linksOpen ? "primary" : "secondary"}
                                fullWidth
                                style={
                                    linksOpen
                                        ? {
                                            background:  theme.btnPrimaryBg,
                                            color:       theme.btnPrimaryText,
                                            borderColor: theme.btnPrimaryBorder,
                                        }
                                        : {
                                            background:  theme.btnSecondaryBg,
                                            color:       theme.btnSecondaryText,
                                            borderColor: theme.btnSecondaryBorder,
                                        }
                                }
                                onClick={() => {
                                    onToggleLinks();
                                    setDrawerOpen(false);
                                }}
                            >
                                {linksOpen ? "Close Links" : "Links"}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    onClick={() => go(isPicker ? "/" : "/picker")}
                                >
                                    {isPicker ? "Home" : "ISO Picker"}
                                </Button>
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    onClick={() => go(isAbout ? "/" : "/about")}
                                >
                                    {isAbout ? "Home" : "About"}
                                </Button>
                            </>
                        )}
                    </div>
                </Drawer>
            </Card>
        </Container>
    );
};

export default Header;
