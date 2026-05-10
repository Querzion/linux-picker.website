import React, { useState } from "react";
import Card from "./ui/Card";
import Slider from "./ui/Slider";
import Button from "./ui/Button";
import Input from "./ui/Input";

import {
    getEnvironmentsForProtocol,
    SYSTEM_TYPES,
    PACKAGE_MANAGERS,
    SECONDARY_PACKAGE,
    FAMILY_LEVELS,
    ORIGIN_LEVELS,
    RELEASE_MODELS,
    INIT_SYSTEMS,
    DESKTOP_RICHNESS,
    ARCHITECTURES,
    GPU_OPTIONS,
    DIFFICULTY_MIN,
    DIFFICULTY_MAX,
    STABILITY_MIN,
    STABILITY_MAX,
    RAM_MIN,
    RAM_MAX,
    RAM_STEPS,
    getDifficultyLabel,
    getStabilityLabel,
    getRamLabel,
} from "../../js/hooks/useDistoFilter";

/* ── GPU button group ─────────────────────────────────── */
const GpuToggle = ({ gpu, setGpu }) => (
    <div className="gpu-toggle-group">
        {GPU_OPTIONS.map(({ id, label, color }) => {
            const active = gpu === id;
            return (
                <button
                    key={id}
                    type="button"
                    className={`gpu-btn ${active ? "gpu-btn-active" : ""}`}
                    style={{
                        "--gpu-color": color,
                        borderColor:   active ? color : "transparent",
                        color:         active ? color : "inherit",
                        boxShadow:     active ? `0 0 0 1px ${color}` : "none",
                    }}
                    onClick={() => setGpu(active ? null : id)}
                >
                    {label}
                </button>
            );
        })}
    </div>
);

/* ── Protocol toggle ──────────────────────────────────── */
const ProtocolToggle = ({ protocol, setProtocol }) => (
    <div className="protocol-btn-group">
        {["wayland", "x11"].map(p => {
            const active = protocol === p;
            return (
                <button
                    key={p}
                    type="button"
                    className={`protocol-btn ${active ? "protocol-btn-active" : ""}`}
                    onClick={() => setProtocol(p)}
                >
                    {p === "wayland" ? "Wayland" : "X11"}
                </button>
            );
        })}
    </div>
);

/* ── main component ───────────────────────────────────── */
const DistroFilter = ({
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
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    /* environments valid for current protocol */
    const validEnvs = getEnvironmentsForProtocol(protocol);

    const diffLabel     = difficultyMax === DIFFICULTY_MAX
        ? "Any"
        : `Up to ${getDifficultyLabel(difficultyMax)} (${difficultyMax})`;

    const stabilityLabel = stabilityMin === STABILITY_MIN
        ? "Any"
        : `${getStabilityLabel(stabilityMin)}+ (${stabilityMin})`;

    return (
        <Card className="filter-panel protocol-card">

            {/* ── HEADER ROW: GPU + More options ── */}
            <div className="filter-header">
                <GpuToggle gpu={gpu} setGpu={setGpu} />

                <Button
                    variant="secondary"
                    size="md"
                    width="140px"
                    onClick={() => setShowAdvanced(prev => !prev)}
                >
                    {showAdvanced ? "Less options" : "More options"}
                </Button>
            </div>

            <div className="slider-position">

                {/* ── ALWAYS VISIBLE ── */}

                <Slider
                    label={`Difficulty — ${diffLabel}`}
                    min={DIFFICULTY_MIN}
                    max={DIFFICULTY_MAX}
                    step={1}
                    value={difficultyMax}
                    showValue={false}
                    onChange={(e) => setDifficultyMax(Number(e.target.value))}
                />

                <Slider
                    label={`Stability — ${stabilityLabel}`}
                    min={STABILITY_MIN}
                    max={STABILITY_MAX}
                    step={1}
                    value={stabilityMin}
                    showValue={false}
                    onChange={(e) => setStabilityMin(Number(e.target.value))}
                />

                <Slider
                    label={`System Type — ${SYSTEM_TYPES[systemTypeIndex]?.label ?? "Any"}`}
                    min={0}
                    max={SYSTEM_TYPES.length - 1}
                    step={1}
                    value={systemTypeIndex}
                    showValue={false}
                    onChange={(e) => setSystemTypeIndex(Number(e.target.value))}
                />

                <Slider
                    label={`Origin — ${ORIGIN_LEVELS[originIndex]?.label ?? "Any"}`}
                    min={0}
                    max={ORIGIN_LEVELS.length - 1}
                    step={1}
                    value={originIndex}
                    showValue={false}
                    onChange={(e) => setOriginIndex(Number(e.target.value))}
                />

                {/* ── ADVANCED ── */}
                {showAdvanced && (
                    <>
                        {/* Protocol toggle — inside advanced */}
                        <div className="filter-row-label">
                            <span className="slider-label">Display Protocol</span>
                            <ProtocolToggle protocol={protocol} setProtocol={setProtocol} />
                        </div>

                        {/* Environment — filtered by active protocol */}
                        <Slider
                            label={`Environment — ${validEnvs[safeEnvIndex]?.label ?? "Any"}`}
                            min={0}
                            max={validEnvs.length - 1}
                            step={1}
                            value={safeEnvIndex}
                            showValue={false}
                            onChange={(e) => setEnvironmentIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Primary Package Manager — ${PACKAGE_MANAGERS[packageManagerIndex]?.label ?? "Any"}`}
                            min={0}
                            max={PACKAGE_MANAGERS.length - 1}
                            step={1}
                            value={packageManagerIndex}
                            showValue={false}
                            onChange={(e) => setPackageManagerIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Also Supports — ${SECONDARY_PACKAGE[secondaryPkgIndex]?.label ?? "Any"}`}
                            min={0}
                            max={SECONDARY_PACKAGE.length - 1}
                            step={1}
                            value={secondaryPkgIndex}
                            showValue={false}
                            onChange={(e) => setSecondaryPkgIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Release Model — ${RELEASE_MODELS[releaseModelIndex]?.label ?? "Any"}`}
                            min={0}
                            max={RELEASE_MODELS.length - 1}
                            step={1}
                            value={releaseModelIndex}
                            showValue={false}
                            onChange={(e) => setReleaseModelIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Init System — ${INIT_SYSTEMS[initSystemIndex]?.label ?? "Any"}`}
                            min={0}
                            max={INIT_SYSTEMS.length - 1}
                            step={1}
                            value={initSystemIndex}
                            showValue={false}
                            onChange={(e) => setInitSystemIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Family — ${FAMILY_LEVELS[familyIndex]?.label ?? "Any"}`}
                            min={0}
                            max={FAMILY_LEVELS.length - 1}
                            step={1}
                            value={familyIndex}
                            showValue={false}
                            onChange={(e) => setFamilyIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Desktop — ${DESKTOP_RICHNESS[desktopIndex]?.label ?? "Any"}`}
                            min={0}
                            max={DESKTOP_RICHNESS.length - 1}
                            step={1}
                            value={desktopIndex}
                            showValue={false}
                            onChange={(e) => setDesktopIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Max RAM Requirement — ${getRamLabel(ramIndex)}`}
                            min={RAM_MIN}
                            max={RAM_MAX}
                            step={1}
                            value={ramIndex}
                            showValue={false}
                            onChange={(e) => setRamIndex(Number(e.target.value))}
                        />

                        <Slider
                            label={`Architecture — ${ARCHITECTURES[archIndex]?.label ?? "Any"}`}
                            min={0}
                            max={ARCHITECTURES.length - 1}
                            step={1}
                            value={archIndex}
                            showValue={false}
                            onChange={(e) => setArchIndex(Number(e.target.value))}
                        />
                    </>
                )}
            </div>

            {/* SEARCH + RESET */}
            <div className="filter-search">
                <Input
                    placeholder="Search distro..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="ghost" size="md" onClick={reset}>
                    Reset
                </Button>
            </div>

        </Card>
    );
};

export default DistroFilter;
