import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header      from "../components/Header.jsx";
import DistroLinks from "../components/DistroLinks.jsx";
import Footer      from "../components/Footer.jsx";

import { useDistro } from "../components/contexts/DistroContext";

import "../../styles/layouts/MainLayout.css";

export default function MainLayout() {
    const { selectedDistro } = useDistro();
    const [linksOpen, setLinksOpen] = useState(false);

    /* close the links card whenever the selected distro changes or clears */
    useEffect(() => {
        setLinksOpen(false);
    }, [selectedDistro?.id]);

    return (
        <div className="app-layout">

            <Header
                onToggleLinks={() => setLinksOpen(prev => !prev)}
                linksOpen={linksOpen}
            />

            {/* DistroLinks slides in between header and page content
                only when a distro is selected and the user clicked Links */}
            {linksOpen && selectedDistro && <DistroLinks />}

            <main className="app-main">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}