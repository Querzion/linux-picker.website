import React from "react";
import Container from "./ui/Container";
import Logo from "./Logo";
import Title from "./Title";
import ActionNavBar from "./ActionNavBar";

const Header = () => {
    return (
        <header>
            <Container>
                <div className="header-inner">
                    
                    {/* Brand group */}
                    <div className="brand-group">
                        <Logo />
                        <Title />
                    </div>

                    {/* Action group */}
                    <ActionNavBar />

                </div>
            </Container>
        </header>
    );
};

export default Header;