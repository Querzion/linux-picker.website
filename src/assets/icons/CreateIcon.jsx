import React from "react";
import { NerdIcon } from "./NerdIcon";
import { NerdIcons } from "./registry";

export const createIcon = (name) => {
    return ({ size = "1.3em", className = "", ...props }) => (
        <NerdIcon
            glyph={NerdIcons[name] ?? NerdIcons.fallback}
            size={size}
            className={className}
            {...props}
        />
    );
};