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

/* ── icon maps ──────────────────────────────────────── */
const PRIMARY_ICON_MAP = {
    home:   <HomeIcon />,
    wiki:   <WikiIcon />,
    news:   <NewsIcon />,
    forum:  <ForumIcon />,
    source: <SourceIcon />,
};

const SOCIAL_ICON_MAP = {
    reddit:   <RedditIcon />,
    x:        <XIcon />,
    facebook: <FacebookIcon />,
    discord:  <DiscordIcon />,
};

const open = (url) =>
    window.open(url, "_blank", "noopener,noreferrer");

/* ═══════════════════════════════════════════════════════
    DISTRO LINKS
═══════════════════════════════════════════════════════ */
const DistroLinks = () => {
    const { selectedDistro, themeMode } = useDistro();

    if (!selectedDistro) return null;

    const theme = selectedDistro.themes?.[themeMode] ?? {};
    const links = selectedDistro.links;

    if (!links) return null;

    /* ── PRIMARY LINKS ─────────────────────────────── */
    const primaryLinks = [
        links.home   && { key: "home",   ...links.home },
        links.wiki   && { key: "wiki",   ...links.wiki },
        links.news   && { key: "news",   ...links.news },
        links.forum  && { key: "forum",  ...links.forum },
        links.source && { key: "source", ...links.source },
    ]
        .filter(Boolean)
        .sort((a, b) => b.importance - a.importance);

    /* ── DOWNLOAD LOGIC ────────────────────────────── */
    const downloadPage = links.download?.page;
    const latestIso    = links.download?.latestIso;

    const showLatestIso =
        latestIso &&
        downloadPage?.url &&
        latestIso.url !== downloadPage.url;

    const rss = links.rss;

    /* ── SOCIALS ───────────────────────────────────── */
    const socials = Object.entries(links.socials || {})
        .map(([key, val]) => ({ key, ...val }))
        .sort((a, b) => b.importance - a.importance);

    /* ── THEME STYLES ──────────────────────────────── */
    const btnPrimaryStyle = {
        background: theme.btnPrimaryBg,
        color: theme.btnPrimaryText,
        borderColor: theme.btnPrimaryBorder,
    };

    const btnSecondaryStyle = {
        background: theme.btnSecondaryBg,
        color: theme.btnSecondaryText,
        borderColor: theme.btnSecondaryBorder,
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

                <div className="distro-links-grid">

                    {/* =========================================================
                        LEFT COLUMN — MAIN LINKS
                    ========================================================= */}
                    <div className="distro-links-main">
                        {primaryLinks.map(({ key, label, url }) => (
                            <Button
                                key={key}
                                variant="secondary"
                                size="md"
                                external
                                startIcon={PRIMARY_ICON_MAP[key]}
                                style={ghostColor}
                                onClick={() => open(url)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>

                    {/* =========================================================
                        ROW 1 RIGHT — RSS + SOCIALS
                    ========================================================= */}
                    <div className="distro-links-right-top">

                        {rss && (
                            <button
                                className="distro-social-btn distro-rss-btn"
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

                    {/* =========================================================
                        ROW 2 RIGHT — DOWNLOADS
                    ========================================================= */}
                    <div className="distro-links-right-bottom">

                        {downloadPage && (
                            <Button
                                variant="primary"
                                size="sm"
                                external
                                startIcon={<DownloadIcon />}
                                style={btnPrimaryStyle}
                                onClick={() => open(downloadPage.url)}
                            >
                                {downloadPage.label}
                            </Button>
                        )}

                        {showLatestIso && (
                            <Button
                                variant="secondary"
                                size="sm"
                                external
                                startIcon={<DownloadIcon />}
                                style={btnSecondaryStyle}
                                onClick={() => open(latestIso.url)}
                            >
                                {latestIso.label}
                            </Button>
                        )}

                    </div>

                </div>
            </Card>
        </Container>
    );
};

export default DistroLinks;