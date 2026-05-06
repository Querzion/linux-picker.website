import { Routes, Route } from "react-router-dom";
import MainLayout from "./assets/layouts/MainLayout";

import MainPage from "./assets/pages/MainPage";
import AboutPage from "./assets/pages/AboutPage";

import "./App.css";

function App() {
    return (
        <Routes>
            {/* Layout route */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
        </Routes>
    );
}

export default App;