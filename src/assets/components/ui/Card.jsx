import React from "react";

const Card = ({ children, header, footer, className = "", clickable = false, bare = false, ...props }) => {
    return (
        <div className={`card ${clickable ? "card-clickable" : ""} ${className}`} {...props}>
            {!bare && header && <div className="card-header">{header}</div>}
            {bare ? children : <div className="card-body">{children}</div>}
            {!bare && footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};

export default Card;