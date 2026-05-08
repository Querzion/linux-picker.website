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
            <Card className={`header-card ${selectedDistro ? "distro-selected" : ""}`} bare>

                {/* =====================================================
                    BRAND
                ===================================================== */}
                <div className="brand">
                    {selectedDistro ? ( 
                        <>
                            <img
                                className="brand-logo"
                                src={selectedDistro.logo}
                                alt={selectedDistro.name}
                            />
                            <div className="brand-title-block">
                                <span className="brand-title distro-active">
                                    {selectedDistro.name.toUpperCase()}
                                </span>
                                <span className={`stability ${selectedDistro.stability}`}>
                                    {selectedDistro.stability}
                                </span>
                            </div>
                        </>
                    ) : (
                        <Brand />
                    )}
                </div>

                {/* =====================================================
                    MOBILE MENU
                ===================================================== */}
                <div className="mobile-menu">
                    <IconButton onClick={() => setOpen(true)} sx={{ p: 1 }}>
                        <MenuIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                </div>

                {/* =====================================================
                    DESKTOP NAV
                ===================================================== */}
                <div className="header-nav">
                    {selectedDistro ? (
                        <>
                            <Button
                                variant="secondary"
                                width="160px"
                                external
                                onClick={() =>
                                    window.open(selectedDistro.website, "_blank", "noopener,noreferrer")
                                }
                            >
                                Visit Site
                            </Button>

                            <Button
                                variant="primary"
                                width="160px"
                                external
                                onClick={() =>
                                    window.open(selectedDistro.downloadPage, "_blank", "noopener,noreferrer")
                                }
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

                {/* =====================================================
                    DIVIDER (only when selected)
                ===================================================== */}
                {selectedDistro && (
                    <hr className="header-distro-divider" />
                )}

                {/* =====================================================
                    DISTRO DESCRIPTION (only when selected)
                ===================================================== */}
                {selectedDistro && (
                    <p className="brand-distro-description">
                        {selectedDistro.description}
                    </p>
                )}

                {/* =====================================================
                    DISTRO TAGS (only when selected)
                ===================================================== */}
                {selectedDistro && (
                    <div className="header-distro-tags tag-row">
                        <span className="tag-chip">{selectedDistro.family}</span>
                        <span className="tag-chip">
                            {selectedDistro.serverFocused ? "server" : "desktop"}
                        </span>
                        {selectedDistro.displayProtocol?.map((p) => (
                            <span key={p} className="tag-chip">{p}</span>
                        ))}
                        {selectedDistro.displayEnvironments?.slice(0, 4).map((e) => (
                            <span key={e} className="tag-chip">{e}</span>
                        ))}
                        {selectedDistro.tags?.slice(0, 5).map((tag) => (
                            <span key={tag} className="tag-chip">{tag}</span>
                        ))}
                    </div>
                )}

                {/* =====================================================
                    MOBILE DRAWER
                ===================================================== */}
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
                                    onClick={() => {
                                        window.open(selectedDistro.website, "_blank", "noopener,noreferrer");
                                        setOpen(false);
                                    }}
                                >
                                    Visit Site
                                </Button>

                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => {
                                        window.open(selectedDistro.downloadPage, "_blank", "noopener,noreferrer");
                                        setOpen(false);
                                    }}
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