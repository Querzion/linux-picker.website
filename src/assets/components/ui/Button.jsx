import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../../../styles/components/ui/Buttons.css";

const Button = ({
    children,

    /* variants */
    variant = "primary",

    /* sizing */
    size = "md", // sm | md | lg

    /* behavior */
    type = "button",
    onClick,
    disabled = false,
    loading = false,

    /* icons */
    startIcon,
    endIcon,
    external = false,

    /* accessibility */
    title,

    className = "",
    ...props
}) => {

    const validVariants = [
        "primary",
        "secondary",
        "ghost",
        "outline",
        "success",
        "warning",
        "danger"
    ];

    const validSizes = ["sm", "md", "lg"];

    const safeVariant = validVariants.includes(variant)
        ? variant
        : "primary";

    const safeSize = validSizes.includes(size)
        ? size
        : "md";

    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            title={title}
            className={`btn btn-${safeVariant} btn-${safeSize} ${className}`}
            {...props}
        >
            {/* Loading state overrides content */}
            {loading ? (
                <span className="btn-loading">
                    <CircularProgress size={16} />
                </span>
            ) : (
                <>
                    {startIcon && (
                        <span className="btn-icon btn-icon-start">
                            {startIcon}
                        </span>
                    )}

                    <span className="btn-content">
                        {children}
                    </span>

                    {(endIcon || external) && (
                        <span className="btn-icon btn-icon-end">
                            {external ? (
                                // lightweight inline external icon fallback (no extra import needed)
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"/>
                                    <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z"/>
                                </svg>
                            ) : (
                                endIcon
                            )}
                        </span>
                    )}
                </>
            )}
        </button>
    );
};

export default Button;