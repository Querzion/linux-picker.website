import React from "react";
import Card from "./ui/Card";
import { useDistro } from "./contexts/DistroContext";

const DistroCard = ({ distro }) => {
    const { selectedDistro, setSelectedDistro, themeMode } = useDistro();

    const isSelected = selectedDistro?.id === distro.id;
    const theme = distro.themes?.[themeMode] ?? {};

    const handleClick = () => {
        setSelectedDistro(isSelected ? null : distro);
    };

    return (
        <Card
            className={`distro-card-item ${isSelected ? "distro-card-selected" : ""}`}
            clickable
            onClick={handleClick}
            style={{
                backgroundColor: theme.bgColor || distro.bgColor,
                border: `1px solid ${theme.borderColor || distro.accentColor}`,
                color: theme.textColor || "#fff",
            }}
        >
            <div className="card-top">
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

                <p className="description" style={{ color: theme.textColor }}>
                    {distro.description}
                </p>
            </div>

            <div className="tag-row">
                <span
                    className="tag-chip"
                    style={{ borderColor: theme.accentColor, color: theme.textColor }}
                >
                    {distro.serverFocused ? "server" : "desktop"}
                </span>

                {distro.displayProtocol?.map((p) => (
                    <span key={p} className="tag-chip">{p}</span>
                ))}

                {distro.tags?.slice(0, 5).map((tag) => (
                    <span key={tag} className="tag-chip">{tag}</span>
                ))}
            </div>
        </Card>
    );
};

export default DistroCard;