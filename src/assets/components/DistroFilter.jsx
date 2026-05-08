import React from "react";
import Card from "./ui/Card";
import Slider from "./ui/Slider";
import Button from "./ui/Button";
import Input from "./ui/Input";

import {
    ENVIRONMENTS,
    STABILITY_LEVELS,
    USE_CASES,
    DIFFICULTY_LEVELS,
    PACKAGE_MANAGERS,
} from "../../js/hooks/useDistoFilter";

const DistroFilter = ({
    protocol,
    setProtocol,

    stabilityIndex,
    setStabilityIndex,

    useCaseIndex,
    setUseCaseIndex,

    environmentIndex,
    setEnvironmentIndex,

    difficultyIndex,
    setDifficultyIndex,

    packageManagerIndex,
    setPackageManagerIndex,

    search,
    setSearch,
}) => {
    return (
        <Card className="filter-panel protocol-card">

            {/* PROTOCOL TOGGLE */}
            <div className="protocol-toggle">
                <Button
                    variant="ghost"
                    size="md"
                    width="120px"
                    onClick={() =>
                        setProtocol(prev => prev === "wayland" ? "x11" : "wayland")
                    }
                >
                    {protocol === "wayland" ? "Wayland" : "X11"}
                </Button>
            </div>

            <div className="slider-position">

                {/* STABILITY */}
                <Slider
                    label={`Stability — ${STABILITY_LEVELS[stabilityIndex].label}`}
                    min={0}
                    max={STABILITY_LEVELS.length - 1}
                    step={1}
                    value={stabilityIndex}
                    showValue={false}
                    onChange={(e) => setStabilityIndex(Number(e.target.value))}
                />

                {/* USE CASE */}
                <Slider
                    label={`Use Case — ${USE_CASES[useCaseIndex].label}`}
                    min={0}
                    max={USE_CASES.length - 1}
                    step={1}
                    value={useCaseIndex}
                    showValue={false}
                    onChange={(e) => setUseCaseIndex(Number(e.target.value))}
                />

                {/* DIFFICULTY */}
                <Slider
                    label={`Difficulty — ${DIFFICULTY_LEVELS[difficultyIndex].label}`}
                    min={0}
                    max={DIFFICULTY_LEVELS.length - 1}
                    step={1}
                    value={difficultyIndex}
                    showValue={false}
                    onChange={(e) => setDifficultyIndex(Number(e.target.value))}
                />

                {/* PACKAGE MANAGER */}
                <Slider
                    label={`Package Manager — ${PACKAGE_MANAGERS[packageManagerIndex].label}`}
                    min={0}
                    max={PACKAGE_MANAGERS.length - 1}
                    step={1}
                    value={packageManagerIndex}
                    showValue={false}
                    onChange={(e) => setPackageManagerIndex(Number(e.target.value))}
                />

                {/* ENVIRONMENT */}
                <Slider
                    label={`Environment — ${ENVIRONMENTS[environmentIndex].label}`}
                    min={0}
                    max={ENVIRONMENTS.length - 1}
                    step={1}
                    value={environmentIndex}
                    showValue={false}
                    onChange={(e) => setEnvironmentIndex(Number(e.target.value))}
                />

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