import React from "react";
import Button from "./ui/Button";
import "../../styles/components/ActionNavBar.css"

const ActionNavBar = () => {
    return (
        <div className="action-nav">
            <Button variant="primary">ISO Picker</Button>
            <Button variant="secondary">About</Button>
        </div>
    );
};

export default ActionNavBar;