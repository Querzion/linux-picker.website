import React from "react";
import "../../styles/components/Footer.css";

const Copyright = () => {
    return (
        <div className="footer-copyright">
            <span>
                © {new Date().getFullYear()}{" "}
                <a
                    href="https://lerrium.solutions"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                >
                    Lerrium Solutions.
                </a>
            </span>
            <span>All rights reserved.</span>
        </div>
    );
};

export default Copyright;