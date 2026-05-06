import React from "react";
import distros from "/public/distros.json";
import { useDistroFilter } from "../../js/hooks/useDistoFilter";

const DistroPicker = () => {
    const {
        ENVIRONMENTS,
        protocol,
        setProtocol,
        environment,
        setEnvironment,
        search,
        setSearch,
        filtered
    } = useDistroFilter(distros);

    return (
        <div className="distro-card">

            {/* TOP BAR */}
            <div className="distro-picker-top">

                <div className="protocol-toggle">
                    <button
                        className={protocol === "wayland" ? "active" : ""}
                        onClick={() => setProtocol("wayland")}
                    >
                        Wayland
                    </button>
                    <button
                        className={protocol === "x11" ? "active" : ""}
                        onClick={() => setProtocol("x11")}
                    >
                        X11
                    </button>
                </div>

                <input
                    className="distro-search"
                    placeholder="Search distro..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* ENVIRONMENTS */}
            <div className="slider-group">
                <label>Environments</label>

                <div className="slider-options scroll-x">
                    {ENVIRONMENTS.map((env) => {
                        const disabled =
                            protocol === "wayland" && !env.wayland
                                ? true
                                : protocol === "x11" && !env.x11
                                ? true
                                : false;

                        return (
                            <button
                                key={env.id}
                                className={environment === env.id ? "active" : ""}
                                onClick={() => setEnvironment(env.id)}
                                disabled={disabled}
                            >
                                {env.label.toUpperCase()}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* RESULTS */}
            <div className="distro-grid">
                {filtered.map((distro) => (
                    <div
                        key={distro.id}
                        className="distro-card-item"
                        style={{
                            borderColor: distro.accentColor,
                            background: distro.bgColor
                        }}
                    >
                        <img src={distro.logo} alt={distro.name} />

                        <h3>
                            <strong>{distro.name.split(" ")[0]}</strong>{" "}
                            <span>{distro.name.split(" ").slice(1).join(" ")}</span>
                        </h3>

                        <p>{distro.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DistroPicker;