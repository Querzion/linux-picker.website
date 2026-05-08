import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Brand from "./Brand";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isPicker = location.pathname === "/picker";
    const isAbout = location.pathname === "/about";

    const [open, setOpen] = useState(false);

    const go = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <Container>
            <Card className="header-card" bare>

                <div className="brand">
                    <Brand />
                </div>

                <div className="mobile-menu">
                    <IconButton onClick={() => setOpen(true)} sx={{ p: 1 }}>
                        <MenuIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                </div>

                <div className="header-nav">
                    <Button
                        variant="secondary"
                        width="120px"
                        onClick={() => navigate(isPicker ? "/" : "/picker")}
                    >
                        {isPicker ? "Home" : "ISO Picker"}
                    </Button>

                    <Button
                        variant="secondary"
                        width="120px"
                        onClick={() => navigate(isAbout ? "/" : "/about")}
                    >
                        {isAbout ? "Home" : "About"}
                    </Button>
                </div>

                <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(false)}
                    className="mobile-drawer"
                >
                    <div className="drawer-menu">

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

                    </div>
                </Drawer>

            </Card>
        </Container>
    );
};

export default Header;