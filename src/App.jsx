import { Routes, Route } from "react-router-dom";
import { DistroProvider } from "./assets/components/contexts/DistroContext";

import MainLayout from "./assets/layouts/MainLayout";

import NotFound from "./assets/pages/NotFound";
import Welcome from "./assets/components/Welcome";
import About from "./assets/components/About";
import DistroPicker from "./assets/components/DistroPicker";

import "./App.css";

function App() {
    return (
        <DistroProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Welcome />} />
                    <Route path="picker" element={<DistroPicker />} />
                    <Route path="about" element={<About />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </DistroProvider>
    );
}

export default App;