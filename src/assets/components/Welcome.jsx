import React from 'react'
import Card from './ui/Card'

const Welcome = () => {
    return (
        <Card title="Welcome" className='Welcome'>

            <div className="page-section">

                <h2>Welcome to The Linux Picker</h2>

                <p>
                    A modern and intelligent tool created to help both new and experienced
                    users discover Linux distributions that actually fit their needs —
                    without the noise, gatekeeping, or endless forum scrolling.
                </p>

                <p>
                    Whether you're searching for a stable daily driver, a lightweight
                    system for older hardware, a gaming-ready setup, a privacy focused
                    environment, or your very first Linux experience, the Linux Picker
                    cuts through the complexity and shows you what matters.
                </p>

                <p>
                    Every distribution is scored on <strong>difficulty</strong> and <strong>stability</strong> —
                    not just labeled, but rated 1–10 with plain-language translations so
                    you immediately know what you're looking at. Beginner Friendly.
                    Intermediate. Expert. Rock Solid. Bleeding Edge. No guesswork.
                </p>

                <h3>Filter by what actually matters to you</h3>

                <ul>
                    <li><strong>Difficulty</strong> — how hard is it to install, configure, and maintain</li>
                    <li><strong>Stability</strong> — how likely is something to break after an update</li>
                    <li><strong>System Type</strong> — Desktop, Server, Gaming, Minimal, Workstation</li>
                    <li><strong>GPU</strong> — out-of-box AMD, Intel, or NVIDIA driver support</li>
                    <li><strong>Release Model</strong> — Rolling, LTS, Fixed, Immutable, Semi-Rolling</li>
                    <li><strong>Init System</strong> — systemd, OpenRC, runit, s6, dinit</li>
                    <li><strong>Display Protocol</strong> — Wayland or X11</li>
                    <li><strong>Desktop Environment</strong> — filtered to only valid options for your chosen protocol</li>
                    <li><strong>Primary Package Manager</strong> — APT, DNF, Pacman, Portage, Nix, and more</li>
                    <li><strong>Also Supports</strong> — Flatpak, Snap, AppImage, AUR</li>
                    <li><strong>Distribution Family</strong> — Debian, Ubuntu, Arch, RedHat, SUSE, Independent</li>
                    <li><strong>Max RAM Requirement</strong> — find distros that run on your hardware</li>
                    <li><strong>Architecture</strong> — x86_64, ARM64, ARMhf, i386, PPC64, MIPS</li>
                </ul>

                <h3>More than just a filter</h3>

                <p>
                    Each distribution card shows system requirements, package management details,
                    out-of-box highlights, and a full links panel — home page, download, wiki,
                    forums, source code, and social channels — all in one place.
                </p>

                <p>
                    Select any distribution to see its full profile in the header,
                    with gradient bars showing difficulty and stability at a glance,
                    and the card colors shifting to match each distro's own brand identity.
                </p>

                <p>
                    Explore. Compare. Learn.
                    Find a Linux distribution built for the way you work.
                </p>

            </div>

        </Card>
    )
}

export default Welcome
