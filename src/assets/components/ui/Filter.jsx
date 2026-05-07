import React from "react";
import Button from "./Button";
import Slider from "./Slider";
import Card from "./Card";
import {
    ENVIRONMENTS,
    STABILITY_LEVELS,
    USE_CASES,
} from "../../../js/hooks/useDistoFilter";

const Filter = ({
    // Stability
    stabilityIndex,
    setStabilityIndex,
    // Use case
    useCase,
    setUseCase,
    // Environment
    environment,
    setEnvironment,
    protocol,
    // Search
    search,
    setSearch,
}) => {
    return (
        <Card className="filter-panel">

            {/* =====================================================
                SEARCH
            ===================================================== */}
            <input
                className="distro-search"
                placeholder="Search distro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* =====================================================
                STABILITY
            ===================================================== */}
            <div className="filter-group">
                <Slider
                    label={`Stability — ${STABILITY_LEVELS[stabilityIndex].label}`}
                    min={0}
                    max={STABILITY_LEVELS.length - 1}
                    step={1}
                    value={stabilityIndex}
                    showValue={false}
                    onChange={(e) => setStabilityIndex(Number(e.target.value))}
                />

                <div className="slider-tick-labels">
                    {STABILITY_LEVELS.map((level, i) => (
                        <span
                            key={level.id}
                            className={stabilityIndex === i ? "tick-active" : ""}
                        >
                            {level.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* =====================================================
                USE CASE
            ===================================================== */}
            <div className="filter-group">
                <label className="filter-label">Use Case</label>

                <div className="filter-options">
                    {USE_CASES.map((uc) => (
                        <Button
                            key={uc.id}
                            variant={useCase === uc.id ? "primary" : "secondary"}
                            size="sm"
                            onClick={() => setUseCase(useCase === uc.id ? null : uc.id)}
                        >
                            {uc.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* =====================================================
                ENVIRONMENT
            ===================================================== */}
            <div className="filter-group">
                <label className="filter-label">Environment</label>

                <div className="filter-options scroll-x">
                    {ENVIRONMENTS.map((env) => {
                        const disabled =
                            protocol === "wayland" ? !env.wayland :
                            protocol === "x11"     ? !env.x11
                                                   : false;

                        return (
                            <Button
                                key={env.id}
                                variant={environment === env.id ? "primary" : "secondary"}
                                size="sm"
                                disabled={disabled}
                                onClick={() => setEnvironment(environment === env.id ? null : env.id)}
                            >
                                {env.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

        </Card>
    );
};

export default Filter;