import React, { useState } from "react";
import Card from "./ui/Card";
import Slider from "./ui/Slider";
import Button from "./ui/Button";
import Input from "./ui/Input";

import {
    ENVIRONMENTS,
    STABILITY_LEVELS,
    SYSTEM_TYPES,
    DIFFICULTY_LEVELS,
    PACKAGE_MANAGERS,
    FAMILY_LEVELS,
    ORIGIN_LEVELS,
    DESKTOP_RICHNESS,
} from "../../js/hooks/useDistoFilter";

const DistroFilter = ({
    protocol,
    setProtocol,

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

    search,
    setSearch,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const toggleAdvanced = () => setShowAdvanced(prev => !prev);

    return (
        <Card className="filter-panel protocol-card">

            {/* HEADER CONTROLS */}
            <div className="filter-header">

                <div
                    className={`protocol-toggle ${showAdvanced ? "visible" : "hidden"}`}
                >
                    <Button
                        variant="primary"
                        size="md"
                        width="120px"
                        onClick={() =>
                            setProtocol(prev =>
                                prev === "wayland" ? "x11" : "wayland"
                            )
                        }
                    >
                        {protocol === "wayland" ? "Wayland" : "X11"}
                    </Button>
                </div>

                <Button
                    variant="secondary"
                    size="md"
                    width="140px"
                    onClick={toggleAdvanced}
                >
                    {showAdvanced ? "Less options" : "More options"}
                </Button>

            </div>

            <div className="slider-position">

                {/* ALWAYS VISIBLE (BASIC MODE) */}
                <Slider
                    label={`Difficulty — ${DIFFICULTY_LEVELS[difficultyIndex]?.label ?? "Any"}`}
                    min={0}
                    max={DIFFICULTY_LEVELS.length - 1}
                    step={1}
                    value={difficultyIndex}
                    showValue={false}
                    onChange={(e) =>
                        setDifficultyIndex(Number(e.target.value))
                    }
                />

                <Slider
                    label={`System Type — ${SYSTEM_TYPES[systemTypeIndex]?.label ?? "Any"}`}
                    min={0}
                    max={SYSTEM_TYPES.length - 1}
                    step={1}
                    value={systemTypeIndex}
                    showValue={false}
                    onChange={(e) =>
                        setSystemTypeIndex(Number(e.target.value))
                    }
                />

                <Slider
                    label={`Stability — ${STABILITY_LEVELS[stabilityIndex]?.label ?? "Any"}`}
                    min={0}
                    max={STABILITY_LEVELS.length - 1}
                    step={1}
                    value={stabilityIndex}
                    showValue={false}
                    onChange={(e) =>
                        setStabilityIndex(Number(e.target.value))
                    }
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

                {/* ADVANCED MODE ONLY */}
                {showAdvanced && (
                    <>
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
                            label={`Package Manager — ${PACKAGE_MANAGERS[packageManagerIndex]?.label ?? "Any"}`}
                            min={0}
                            max={PACKAGE_MANAGERS.length - 1}
                            step={1}
                            value={packageManagerIndex}
                            showValue={false}
                            onChange={(e) =>
                                setPackageManagerIndex(Number(e.target.value))
                            }
                        />

                        <Slider
                            label={`Environment — ${ENVIRONMENTS[environmentIndex]?.label ?? "Any"}`}
                            min={0}
                            max={ENVIRONMENTS.length - 1}
                            step={1}
                            value={environmentIndex}
                            showValue={false}
                            onChange={(e) =>
                                setEnvironmentIndex(Number(e.target.value))
                            }
                        />
                    </>
                )}
            </div>

            {/* SEARCH */}
            <div className="filter-search">
                <Input
                    placeholder="Search distro..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

        </Card>
    );
};

export default DistroFilter;