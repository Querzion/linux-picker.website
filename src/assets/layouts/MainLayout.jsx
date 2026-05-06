import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../../styles/layouts/MainLayout.css"

export default function MainLayout() {
    return (
        <div className="app-layout">
            <Header />

            <main className="app-main">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}