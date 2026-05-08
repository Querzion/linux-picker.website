import React, { forwardRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "../../../styles/components/ui/Buttons.css";

const Button = forwardRef(({
    children,

    /* =====================================================
        VARIANTS
    ===================================================== */
    variant = "primary",

    /* =====================================================
        SIZING
    ===================================================== */
    size = "md",

    /* =====================================================
        BEHAVIOR
    ===================================================== */
    type = "button",
    onClick,

    disabled = false,
    loading = false,

    fullWidth = false,

    /* =====================================================
        WIDTH CONTROL (NEW)
    ===================================================== */
    width,

    /* =====================================================
        ICONS
    ===================================================== */
    startIcon,
    endIcon,

    iconOnly = false,
    external = false,

    /* =====================================================
        ACCESSIBILITY
    ===================================================== */
    title,
    ariaLabel,

    /* =====================================================
        STYLING
    ===================================================== */
    elevated = false,
    className = "",

    ...props
}, ref) => {

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

    const classes = [
        "btn",
        `btn-${safeVariant}`,
        `btn-${safeSize}`,

        fullWidth && "btn-full",
        elevated && "btn-elevated",
        iconOnly && "btn-icon-only",

        loading && "btn-is-loading",

        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            ref={ref}
            type={loading ? "button" : type}
            onClick={onClick}
            disabled={isDisabled}
            title={title}
            aria-label={ariaLabel || title}
            aria-busy={loading}
            className={classes}
            style={{
                width: width || undefined
            }}
            {...props}
        >
            {loading ? (
                <span className="btn-loading">
                    <CircularProgress size={16} thickness={5} color="inherit" />
                </span>
            ) : (
                <>
                    {startIcon && (
                        <span className="btn-icon btn-icon-start">
                            {startIcon}
                        </span>
                    )}

                    {!iconOnly && (
                        <span className="btn-content">
                            {children}
                        </span>
                    )}

                    {(endIcon || external) && (
                        <span className="btn-icon btn-icon-end">
                            {external ? (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7 17L17 7" />
                                    <path d="M7 7h10v10" />
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
});

Button.displayName = "Button";

export default Button;