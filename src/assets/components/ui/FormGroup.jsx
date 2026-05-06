import React from "react";
import "../../../styles/components/ui/Forms.css";

const FormGroup = ({
    label,
    error,
    children,
    required = false,
    className = ""
}) => {
    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label className="form-label">
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}

            {children}

            {error && <span className="form-error">{error}</span>}
        </div>
    );
};

export default FormGroup;