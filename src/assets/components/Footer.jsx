import React from "react";
import Copyright from "./Copyright";
import DarkMode from "./DarkMode";
import "../../styles/components/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <DarkMode />

            <div className="footer-container">

                {/* Main Footer Content */}
                <div className="footer-main">
                    <p className="footer-title">
                        The Linux Picker
                    </p>

                    <p className="footer-subtitle">
                        Sapientia et Ingenium
                    </p>
                </div>

                {/* Secondary row */}
                <Copyright />

                {/* Tertiary row */}
                <div className="footer-meta">
                    Crafted with intellect in the Kingdom of Sweden
                </div>

            </div>
        </footer>
    );
}