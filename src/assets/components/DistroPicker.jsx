import React from "react";
import distros from "../../distros.json";
import { useDistroFilter } from "../../js/hooks/useDistoFilter";
import Filter from "./ui/Filter";
import Button from "./ui/Button";
import DistroCard from "./DistroCard";

const DistroPicker = () => {
    const {
        filtered,
        stabilityIndex, setStabilityIndex,
        useCase,        setUseCase,
        environment,    setEnvironment,
        protocol,       setProtocol,
        search,         setSearch,
    } = useDistroFilter(distros);

    return (
        <div className="distro-picker">

            {/* =====================================================
                PROTOCOL TOGGLE
            ===================================================== */}
            <div className="protocol-toggle">
                <Button
                    variant={protocol === "wayland" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setProtocol("wayland")}
                >
                    Wayland
                </Button>

                <Button
                    variant={protocol === "x11" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setProtocol("x11")}
                >
                    X11
                </Button>
            </div>

            {/* =====================================================
                FILTERS
            ===================================================== */}
            <Filter
                stabilityIndex={stabilityIndex}
                setStabilityIndex={setStabilityIndex}
                useCase={useCase}
                setUseCase={setUseCase}
                environment={environment}
                setEnvironment={setEnvironment}
                protocol={protocol}
                search={search}
                setSearch={setSearch}
            />

            {/* =====================================================
                RESULTS
            ===================================================== */}
            <div className="distro-grid">
                {filtered.map((distro) => (
                    <DistroCard key={distro.id} distro={distro} />
                ))}
            </div>

        </div>
    );
};

export default DistroPicker;