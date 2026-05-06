import { useEffect, useRef } from "react";
import "../../../styles/components/ui/Sliders.css"

const Slider = ({
    value,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    label,
    showValue = true,
    className = ""
}) => {
    const sliderRef = useRef(null);

    const updateFill = () => {
        if (!sliderRef.current) return;

        const percent =
            ((sliderRef.current.value - min) / (max - min)) * 100;

        sliderRef.current.style.setProperty("--value", `${percent}%`);
    };

    useEffect(() => {
        updateFill();
    }, [value]);

    const handleChange = (e) => {
        updateFill();
        onChange?.(e);
    };

    return (
        <div className={`slider-container ${className}`}>
            {label && (
                <div className="slider-header">
                    <label>{label}</label>
                    {showValue && <span>{value}</span>}
                </div>
            )}

            <input
                ref={sliderRef}
                type="range"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                className="slider"
            />
        </div>
    );
};

export default Slider;