import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Brand from "./Brand";

import { useDistro } from "../components/contexts/DistroContext";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isPicker = location.pathname === "/picker";
    const isAbout = location.pathname === "/about";

    const [open, setOpen] = useState(false);
    const { selectedDistro } = useDistro();

    const go = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <Container>
            <Card className="header-card" bare>

                <div className="brand">
                    {selectedDistro ? (
                        <>
                            <img
                                className="brand-logo"
                                src={selectedDistro.logo}
                                alt={selectedDistro.name}
                            />
                            <span
                                className="brand-title"
                                style={{ color: selectedDistro.accentColor }}
                            >
                                {selectedDistro.name.toUpperCase()}
                            </span>
                        </>
                    ) : (
                        <Brand />
                    )}
                </div>

                <div className="mobile-menu">
                    <IconButton onClick={() => setOpen(true)} sx={{ p: 1 }}>
                        <MenuIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                </div>

                <div className="header-nav">
                    {selectedDistro ? (
                        <>
                            <Button
                                variant="secondary"
                                width="160px"
                                external
                                onClick={() => window.open(selectedDistro.website, "_blank")}
                            >
                                Visit Site
                            </Button>
                            <Button
                                variant="primary"
                                width="160px"
                                external
                                onClick={() => window.open(selectedDistro.downloadPage, "_blank")}
                            >
                                Download ISO
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                width="160px"
                                onClick={() => navigate(isPicker ? "/" : "/picker")}
                            >
                                {isPicker ? "Home" : "ISO Picker"}
                            </Button>
                            <Button
                                variant="secondary"
                                width="160px"
                                onClick={() => navigate(isAbout ? "/" : "/about")}
                            >
                                {isAbout ? "Home" : "About"}
                            </Button>
                        </>
                    )}
                </div>

                <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(false)}
                    className="mobile-drawer"
                >
                    <div className="drawer-menu">
                        {selectedDistro ? (
                            <>
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    onClick={() => { window.open(selectedDistro.website, "_blank"); setOpen(false); }}
                                >
                                    Visit Site
                                </Button>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => { window.open(selectedDistro.downloadPage, "_blank"); setOpen(false); }}
                                >
                                    Download ISO
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    onClick={() => go(isPicker ? "/" : "/picker")}
                                >
                                    {isPicker ? "Home" : "ISO Picker"}
                                </Button>
                                <Button
                                    variant="secondary"
                                    fullWidth
                                    onClick={() => go(isAbout ? "/" : "/about")}
                                >
                                    {isAbout ? "Home" : "About"}
                                </Button>
                            </>
                        )}
                    </div>
                </Drawer>

            </Card>
        </Container>
    );
};

export default Header;