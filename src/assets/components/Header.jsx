import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Brand from "./Brand";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isPicker = location.pathname === "/picker";
    const isAbout = location.pathname === "/about";

    return (
        <Container>
            <Card className="header-card">

                <div className="brand">
                    <Brand />
                </div>

                <div className="header-nav">

                    {/* ISO Picker ↔ Home toggle */}
                    <Button
                        variant="primary"
                        width="120px"
                        onClick={() =>
                            navigate(isPicker ? "/" : "/picker")
                        }
                    >
                        {isPicker ? "Home" : "ISO Picker"}
                    </Button>

                    {/* About ↔ Home toggle */}
                    <Button
                        variant="ghost"
                        width="120px"
                        onClick={() =>
                            navigate(isAbout ? "/" : "/about")
                        }
                    >
                        {isAbout ? "Home" : "About"}
                    </Button>

                </div>

            </Card>
        </Container>
    );
};

export default Header;