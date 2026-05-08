import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Card title="404 - Not Found" className="NotFound-Position">
            <div className="NotFound">
                <div className="page-section">
                    <h2>Page not found</h2>
                    <p>The page you are looking for does not exist.</p>

                    <Button onClick={() => navigate("/")}>
                        Go Home
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default NotFound;