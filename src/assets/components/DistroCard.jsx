import React from "react";
import Card from "./ui/Card";

const DistroCard = ({ distro }) => {
    return (
        <Card
            className="distro-card-item"
            style={{
                borderColor: distro.accentColor,
                background: distro.bgColor,
            }}
        >
            <div className="card-top">
                <div className="card-header">
                    <img src={distro.logo} alt={distro.name} />
                    <div className="title-block">
                        <h3>{distro.name}</h3>
                        <span className={`stability ${distro.stability}`}>
                            {distro.stability}
                        </span>
                    </div>
                </div>
                <p className="description">{distro.description}</p>
            </div>

            <div className="tag-row">
                <span className="tag-chip">
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