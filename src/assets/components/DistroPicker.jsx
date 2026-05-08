import React from "react";
import distros from "../../distros.json";
import { useDistroFilter } from "../../js/hooks/useDistoFilter";

import DistroFilter from "./DistroFilter";
import DistroCard from "./DistroCard";

const DistroPicker = () => {
    const {
        filtered,

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

        protocol,
        setProtocol,

        search,
        setSearch,
    } = useDistroFilter(distros);

    return (
        <div className="distro-picker">

            <DistroFilter
                protocol={protocol}
                setProtocol={setProtocol}

                stabilityIndex={stabilityIndex}
                setStabilityIndex={setStabilityIndex}

                useCaseIndex={useCaseIndex}
                setUseCaseIndex={setUseCaseIndex}

                environmentIndex={environmentIndex}
                setEnvironmentIndex={setEnvironmentIndex}

                difficultyIndex={difficultyIndex}
                setDifficultyIndex={setDifficultyIndex}

                packageManagerIndex={packageManagerIndex}
                setPackageManagerIndex={setPackageManagerIndex}

                search={search}
                setSearch={setSearch}
            />

            <div className="distro-grid">
                {filtered.map((distro) => (
                    <DistroCard key={distro.id} distro={distro} />
                ))}
            </div>

        </div>
    );
};

export default DistroPicker;