import React from "react";
import distros from "../../distros.json";
import { useDistroFilter } from "../../js/hooks/useDistoFilter";
import { useDistro } from "./contexts/DistroContext";

import DistroFilter from "./DistroFilter";
import DistroCard from "./DistroCard";

const DistroPicker = () => {
    const { selectedDistro } = useDistro();

    const {
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
    } = useDistroFilter(distros);

    return (
        <div className="distro-picker">

            <DistroFilter
                /* core */
                difficultyMax={difficultyMax}        setDifficultyMax={setDifficultyMax}
                stabilityMin={stabilityMin}          setStabilityMin={setStabilityMin}
                systemTypeIndex={systemTypeIndex}    setSystemTypeIndex={setSystemTypeIndex}
                originIndex={originIndex}            setOriginIndex={setOriginIndex}
                search={search}                      setSearch={setSearch}

                /* advanced */
                protocol={protocol}                  setProtocol={setProtocol}
                environmentIndex={environmentIndex}  setEnvironmentIndex={setEnvironmentIndex}
                safeEnvIndex={safeEnvIndex}
                packageManagerIndex={packageManagerIndex} setPackageManagerIndex={setPackageManagerIndex}
                secondaryPkgIndex={secondaryPkgIndex}    setSecondaryPkgIndex={setSecondaryPkgIndex}
                releaseModelIndex={releaseModelIndex}     setReleaseModelIndex={setReleaseModelIndex}
                initSystemIndex={initSystemIndex}         setInitSystemIndex={setInitSystemIndex}
                familyIndex={familyIndex}            setFamilyIndex={setFamilyIndex}
                desktopIndex={desktopIndex}          setDesktopIndex={setDesktopIndex}
                ramIndex={ramIndex}                  setRamIndex={setRamIndex}
                archIndex={archIndex}                setArchIndex={setArchIndex}
                gpu={gpu}                            setGpu={setGpu}

                reset={reset}
            />

            <div className="distro-grid">
                {filtered
                    .filter(d => d.id !== selectedDistro?.id)
                    .map(distro => (
                        <DistroCard key={distro.id} distro={distro} />
                    ))}
            </div>

        </div>
    );
};

export default DistroPicker;
