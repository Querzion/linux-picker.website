import "../../../styles/components/ui/Inputs.css"

const Input = ({
    type = "text",
    value,
    onChange,
    label,
    placeholder,
    error,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <div className={`input-container ${className}`}>
            {label && <label className="input-label">{label}</label>}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`input ${error ? "input-error" : ""}`}
                {...props}
            />

            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
};

export default Input;