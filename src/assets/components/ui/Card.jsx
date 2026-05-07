import React from "react";

const Card = ({ children, header, footer, className = "", clickable = false, ...props }) => {
    return (
        <div className={`card ${clickable ? "card-clickable" : ""} ${className}`} {...props}>
            {header && <div className="card-header">{header}</div>}
            <div className="card-body">{children}</div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};

export default Card;