import React from 'react'
import Card from './ui/Card'

const About = () => {
    return (
        <Card title="About" className='About'>

            <div className="page-section">

                <h2>About The Linux Picker</h2>

                <p>
                    <strong>[11 MAY 2026]</strong>
                </p>

                <p>
                    The Linux Picker was created with a clear purpose:
                    to simplify the process of discovering Linux distributions
                    in a world where new users are often overwhelmed by endless
                    choices, conflicting opinions, and technical gatekeeping.
                </p>

                <p>
                    What began as a personal idea evolved into a project focused on
                    accessibility, structure, and intelligent filtering — helping users
                    quickly identify operating systems that align with their goals,
                    hardware, workflow, and experience level.
                </p>

                <p>
                    The platform covers over 90 Linux distributions, each with
                    hand-authored difficulty and stability scores, detailed package
                    management data, system requirements, out-of-box feature flags,
                    and a curated links panel connecting users directly to official
                    resources — wikis, forums, download pages, source repositories,
                    and community channels.
                </p>

                <p>
                    Filtering goes beyond surface-level labels. Users can narrow
                    distributions by init system, display protocol, architecture,
                    RAM requirements, GPU driver support, release model, secondary
                    package formats, and more — with every filter designed to surface
                    genuinely relevant results rather than generic lists.
                </p>

                <p>
                    The platform was created and designed by
                    <strong> Slisk Lindqvist </strong>
                    under the independent and unofficial initiative
                    <strong> Lerrium Solutions</strong>.
                </p>

                <p>
                    The Linux Picker is not affiliated with any Linux distribution,
                    corporation, or organization. Its purpose is entirely educational,
                    informative, and community driven.
                </p>

                <p>
                    Linux represents freedom, customization, transparency,
                    and control over your own system.
                    This project exists to make that world more approachable for everyone.
                </p>

                <p>
                    Sapientia et Ingenium.
                </p>

            </div>

        </Card>
    )
}

export default About
