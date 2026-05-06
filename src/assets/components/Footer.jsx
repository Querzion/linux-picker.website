import React from "react";

export default function Footer() {
    return (
        <footer className="hidden md:block bg-(--surface) border-t border-(--border) py-8">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Main Footer Content */}
                <div className="mb-4">
                    <p className="text-xl font-serif tracking-wide text-text-strong">
                        The Linux Picker
                    </p>

                    <p className="text-sm italic text-(--text-muted) mt-1">
                        Sapientia et Ingenium
                    </p>
                </div>

                {/* Secondary row */}
                <div className="text-sm text-(--text-subtle)">
                    © {new Date().getFullYear()} <a href="https://lerrium.solutions" target="_blank" rel="noreferrer">Lerrium Solutions.</a>
                    All rights reserved.
                </div>

                {/* Tertiary row */}
                <div className="text-xs text-(--text-faint) mt-3">
                    Crafted with intellect in the Kingdom of Sweden
                </div>

            </div>
        </footer>
    );
}