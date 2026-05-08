import { Routes, Route } from "react-router-dom";
import MainLayout from "./assets/layouts/MainLayout";

import Welcome from "./assets/components/Welcome";
import About from "./assets/components/About";
import DistroPicker from "./assets/components/DistroPicker";

import { DistroProvider } from "./assets/components/contexts/DistroContext";
import "./App.css";

function App() {
    return (
        <DistroProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Welcome />} />
                    <Route path="picker" element={<DistroPicker />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </DistroProvider>
    );
}

export default App;