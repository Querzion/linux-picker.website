import React from "react";
import Button from "./Button";
import "../../../styles/components/ui/Forms.css";

const Form = ({
    children,
    onSubmit,
    title,
    description,
    submitText = "Submit",
    loading = false,
    className = ""
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form className={`form ${className}`} onSubmit={handleSubmit}>
            {(title || description) && (
                <div className="form-header">
                    {title && <h2 className="form-title">{title}</h2>}
                    {description && (
                        <p className="form-description">{description}</p>
                    )}
                </div>
            )}

            <div className="form-body">
                {children}
            </div>

            <div className="form-actions">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                >
                    {loading ? "Loading..." : submitText}
                </Button>
            </div>
        </form>
    );
};

export default Form;