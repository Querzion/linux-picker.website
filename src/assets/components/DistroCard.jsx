import React from "react";
import Card from "./ui/Card";

const DistroCard = ({ distro }) => {
    return (
        <Card
            className="distro-card-item"
            style={{
                borderColor: distro.accentColor,
                background:  distro.bgColor,
            }}
        >
            <img src={distro.logo} alt={distro.name} />

            <div className="text-block">
                <h3>
                    <strong>{distro.name.split(" ")[0]}</strong>{" "}
                    <span>{distro.name.split(" ").slice(1).join(" ")}</span>
                </h3>
                <p>{distro.description}</p>
            </div>
        </Card>
    );
};

export default DistroCard;