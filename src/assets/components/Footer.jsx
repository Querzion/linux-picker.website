import React from "react";
import Copyright from "./Copyright";
import DarkMode from "./DarkMode";
import Socials from "./Socials";
import Card from "./ui/Card";
import Container from "./ui/Container";

export default function Footer() {
    return (
        <Container>
            <Card className="footer">
                <footer className="desktop">

                    <div className="footer-top">

                        <div className="footer-left footer-btn-move">
                            <DarkMode />
                        </div>

                        <div className="footer-center">
                            <p className="footer-title">The Linux Picker</p>
                            <p className="footer-subtitle">Sapientia et Ingenium</p>

                            <Copyright />

                            <div className="footer-meta">
                                Crafted with intellect in the Kingdom of Sweden
                            </div>
                        </div>

                        <div className="footer-right footer-btn-move">
                            <Socials />
                        </div>

                    </div>

                </footer>
            </Card>
        </Container>
    );
}