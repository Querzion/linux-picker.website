import React from "react";
import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";

import { useDistro } from "./contexts/DistroContext";

import {
    HomeIcon,
    WikiIcon,
    NewsIcon,
    ForumIcon,
    SourceIcon,
    DownloadIcon,
    RssIcon,
    RedditIcon,
    XIcon,
    FacebookIcon,
    DiscordIcon,
    NerdIcons,
    NerdIcon,
} from "../icons";

import "../../styles/components/DistroLinks.css";

const PRIMARY_ICON_MAP = {
    home: <HomeIcon />,
    wiki: <WikiIcon />,
    news: <NewsIcon />,
    forum: <ForumIcon />,
    source: <SourceIcon />,
};

const SOCIAL_ICON_MAP = {
    reddit: <RedditIcon />,
    x: <XIcon />,
    facebook: <FacebookIcon />,
    discord: <DiscordIcon />,
};

const open = (url) =>
    window.open(url, "_blank", "noopener,noreferrer");

const getButtonSize = () =>
    window.matchMedia("(max-width: 920px)").matches ? "sm" : "md";

const DistroLinks = () => {
    const { selectedDistro, themeMode } = useDistro();

    if (!selectedDistro) return null;

    const theme = selectedDistro.themes?.[themeMode] ?? {};
    const links = selectedDistro.links;

    if (!links) return null;

    const size = getButtonSize();

    const primaryLinks = [
        links.home && { key: "home", ...links.home },
        links.wiki && { key: "wiki", ...links.wiki },
        links.news && { key: "news", ...links.news },
        links.forum && { key: "forum", ...links.forum },
        links.source && { key: "source", ...links.source },
    ].filter(Boolean).sort((a, b) => b.importance - a.importance);

    const downloadPage = links.download?.page;
    const rss = links.rss;

    const socials = Object.entries(links.socials || {})
        .map(([key, val]) => ({ key, ...val }))
        .sort((a, b) => b.importance - a.importance);

    const btnPrimaryStyle = {
        background: theme.btnPrimaryBg,
        color: theme.btnPrimaryText,
        borderColor: theme.btnPrimaryBorder,
        width: "100%",
    };

    const ghostColor = {
        color: theme.textSecondary,
    };

    return (
        <Container>
            <Card
                className="distro-links-card"
                bare
                style={{
                    backgroundColor: theme.bgColor,
                    borderColor: theme.borderColor,
                    color: theme.textColor,
                }}
            >

                {/* =========================
                    HARD LAYOUT CONTRACT
                ========================== */}
                <div className="distro-layout">

                    {/* LEFT COLUMN */}
                    <div className="distro-left">
                        {primaryLinks.map(({ key, label, url }) => (
                            <Button
                                key={key}
                                variant="secondary"
                                size={size}
                                external
                                startIcon={PRIMARY_ICON_MAP[key]}
                                style={{ ...ghostColor, width: "100%" }}
                                onClick={() => open(url)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="distro-right">

                        {/* SOCIAL BLOCK */}
                        <div className="distro-social">
                            {rss && (
                                <button
                                    className="distro-social-btn"
                                    title={rss.label}
                                    onClick={() => open(rss.url)}
                                    style={{ color: theme.textMuted }}
                                >
                                    <RssIcon />
                                </button>
                            )}

                            {socials.map(({ key, label, url }) => (
                                <button
                                    key={key}
                                    className="distro-social-btn"
                                    title={label}
                                    onClick={() => open(url)}
                                    style={{ color: theme.textSecondary }}
                                >
                                    {SOCIAL_ICON_MAP[key] ?? (
                                        <NerdIcon glyph={NerdIcons.fallback} />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* DOWNLOAD BLOCK */}
                        <div className="distro-download">
                            {downloadPage && (
                                <Button
                                    variant="primary"
                                    size={size}
                                    external
                                    startIcon={<DownloadIcon />}
                                    style={btnPrimaryStyle}
                                    onClick={() => open(downloadPage.url)}
                                >
                                    {downloadPage.label}
                                </Button>
                            )}
                        </div>

                    </div>

                </div>

            </Card>
        </Container>
    );
};

export default DistroLinks;