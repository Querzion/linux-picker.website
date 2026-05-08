import React from "react";
import logo from "/logo.svg";

const Brand = () => {
    return (
        <div className="brand">
            <img
                src={logo}
                alt="The Linux Picker logo"
                className="brand-logo"
            />

            <h1 className="brand-title">
                THE LINUX PICKER
            </h1>
        </div>
    );
};

export default Brand;