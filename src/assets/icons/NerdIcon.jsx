import React from "react";

export const NerdIcon = ({
    glyph,
    size = "1em",
    className = "",
    ...props
}) => {
    return (
        <span
            className={`nf-icon ${className}`}
            style={{ fontSize: size }}
            {...props}
        >
            {glyph}
        </span>
    );
};