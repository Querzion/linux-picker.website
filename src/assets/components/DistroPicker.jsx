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

                systemTypeIndex={systemTypeIndex}
                setSystemTypeIndex={setSystemTypeIndex}

                environmentIndex={environmentIndex}
                setEnvironmentIndex={setEnvironmentIndex}

                difficultyIndex={difficultyIndex}
                setDifficultyIndex={setDifficultyIndex}

                packageManagerIndex={packageManagerIndex}
                setPackageManagerIndex={setPackageManagerIndex}

                familyIndex={familyIndex}
                setFamilyIndex={setFamilyIndex}

                originIndex={originIndex}
                setOriginIndex={setOriginIndex}

                desktopIndex={desktopIndex}
                setDesktopIndex={setDesktopIndex}

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