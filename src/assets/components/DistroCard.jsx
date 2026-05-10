import React from "react";
import Card from "./ui/Card";
import { useDistro } from "./contexts/DistroContext";
import {
    getDifficultyLabel,
    getStabilityLabel,
    isBeginnerRecommended,
} from "../../js/hooks/useDistoFilter";

/* ═══════════════════════════════════════════════════════
    GRADIENT BAR
    direction: "difficulty" → green › yellow › red
    direction: "stability"  → red › yellow › green

    Layout:
      [BAR TITLE]           [translated label — big, white]
      ████████░░░░░░░░░░░░  Beginner ──────────────── Expert
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

            {/* ── ROW 1: bar title + translated label ── */}
            <div className="gradient-bar-top-row">
                <span className="gradient-bar-title" style={{ color: mutedColor }}>
                    {barTitle}
                </span>
                <span className="gradient-bar-translation" style={{ color: textColor }}>
                    {translatedLabel}
                </span>
            </div>

            {/* ── ROW 2: track ── */}
            <div className="gradient-bar-track">
                <div className="gradient-bar-fill-bg" style={{ background: gradient }} />
                <div className="gradient-bar-mask"    style={{ left: `${pct}%` }} />
                <div className="gradient-bar-thumb"   style={{ left: `${pct}%` }} />
            </div>

            {/* ── ROW 3: scale anchors ── */}
            <div className="gradient-bar-scale">
                <span style={{ color: mutedColor }}>{leftLabel}</span>
                <span style={{ color: mutedColor }}>{rightLabel}</span>
            </div>

        </div>
    );
};

/* ═══════════════════════════════════════════════════════
    OUT-OF-BOX CHIPS  (read-only, only shown when true)
═══════════════════════════════════════════════════════ */
const OobChip = ({ label, tagStyle }) => (
    <span className="tag-chip oob-chip" style={tagStyle}>{label}</span>
);

/* ═══════════════════════════════════════════════════════
    DISTRO CARD
═══════════════════════════════════════════════════════ */
const DistroCard = ({ distro }) => {
    const { selectedDistro, setSelectedDistro, themeMode } = useDistro();

    const isSelected = selectedDistro?.id === distro.id;
    const theme      = distro.themes?.[themeMode] ?? {};

    const handleClick = () => setSelectedDistro(isSelected ? null : distro);

    const tagStyle = {
        borderColor: theme.tagBorder || theme.accentColor,
        background:  theme.tagBg,
        color:       theme.tagText   || theme.textColor,
    };

    const mutedColor = theme.textMuted || theme.textSecondary || theme.textColor;
    const textColor  = theme.textColor || "#ffffff";

    /* package chips: primary + secondary + aur, capped at 4 */
    const pm = distro.packageManagement;
    const pkgChips = pm
        ? [pm.primary, ...(pm.secondary || []), ...(pm.aur ? ["aur"] : [])].slice(0, 4)
        : [];

    /* out-of-box truthy fields → chips */
    const oob = distro.outOfBox || {};
    const oobChips = [
        oob.codecs        && "codecs",
        oob.nvidiaDrivers && "nvidia",
        oob.amdDrivers    && "amd",
        oob.intelDrivers  && "intel",
        oob.officeTools   && "office",
        oob.creativeTools && "creative",
        oob.gamingTools   && "gaming",
    ].filter(Boolean);

    const beginner = isBeginnerRecommended(distro.difficultyScore);

    return (
        <Card
            className={`distro-card-item ${isSelected ? "distro-card-selected" : ""}`}
            clickable
            onClick={handleClick}
            style={{
                backgroundColor:   theme.bgColor,
                border:            `1px solid ${theme.borderColor}`,
                color:             theme.textColor,
                "--card-hover-bg": theme.cardHoverBg,
                "--card-shadow":   theme.cardShadow,
            }}
        >
            <div className="card-top">

                {/* HEADER */}
                <div className="card-header">
                    <img src={distro.logo} alt={distro.name} />
                    <div className="title-block">
                        <h3 style={{ color: theme.textColor }}>{distro.name}</h3>
                        <span
                            className={`stability ${distro.stability}`}
                            style={{ color: theme.accentColor }}
                        >
                            {distro.stability}
                        </span>
                    </div>
                </div>

                {/* DESCRIPTION */}
                <p className="description" style={{ color: theme.textSecondary || theme.textColor }}>
                    {distro.description}
                </p>

                {/* DIFFICULTY BAR */}
                <GradientBar
                    score={distro.difficultyScore}
                    direction="difficulty"
                    barTitle="Difficulty"
                    leftLabel="Beginner"
                    rightLabel="Expert"
                    translatedLabel={getDifficultyLabel(distro.difficultyScore)}
                    mutedColor={mutedColor}
                    textColor={textColor}
                />

                {/* STABILITY BAR */}
                <GradientBar
                    score={distro.stabilityScore}
                    direction="stability"
                    barTitle="Stability"
                    leftLabel="Unstable"
                    rightLabel="Rock Solid"
                    translatedLabel={getStabilityLabel(distro.stabilityScore)}
                    mutedColor={mutedColor}
                    textColor={textColor}
                />

            </div>

            {/* TAGS */}
            <div className="tag-row">

                {beginner && (
                    <span
                        className="tag-chip tag-chip-beginner"
                        style={{
                            ...tagStyle,
                            borderColor: "#4ade80",
                            color:       "#4ade80",
                            background:  "rgba(74,222,128,0.08)",
                        }}
                    >
                        ✓ beginner
                    </span>
                )}

                {distro.releaseModel && (
                    <span className="tag-chip" style={tagStyle}>{distro.releaseModel}</span>
                )}

                {distro.initSystem && distro.initSystem !== "systemd" && (
                    <span className="tag-chip" style={tagStyle}>{distro.initSystem}</span>
                )}

                {pkgChips.map(pkg => (
                    <span key={pkg} className="tag-chip pkg-chip" style={tagStyle}>{pkg}</span>
                ))}

                {distro.displayProtocol?.map(p => (
                    <span key={p} className="tag-chip" style={tagStyle}>{p}</span>
                ))}

                {oobChips.map(label => (
                    <OobChip key={label} label={label} tagStyle={tagStyle} />
                ))}

                {distro.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="tag-chip" style={tagStyle}>{tag}</span>
                ))}
            </div>

        </Card>
    );
};

export default DistroCard;