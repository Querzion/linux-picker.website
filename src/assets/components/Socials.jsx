import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "./ui/Button";

const GitHubLink = () => {
    return (
        <Button
            variant="secondary"
            size="lg"
            iconOnly
            ariaLabel="View project on GitHub"
            startIcon={<GitHubIcon fontSize="small" />}
            onClick={() =>
                window.open(
                    "https://github.com/Querzion/linux-picker.website",
                    "_blank",
                    "noopener,noreferrer"
                )
            }
        />
    );
};

export default GitHubLink;