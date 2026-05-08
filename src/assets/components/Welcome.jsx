import React from 'react'
import Card from './ui/Card'

const Welcome = () => {
    return (
        <Card title="Welcome" className='Welcome'>

            <div className="page-section">

                <h2>Welcome to The Linux Picker</h2>

                <p>
                    A modern and simple tool created to help both new and experienced
                    users discover Linux distributions that actually fit their needs.
                </p>

                <p>
                    Whether you're searching for a stable daily driver, a lightweight
                    system for older hardware, a privacy focused environment, or a
                    developer oriented workstation, The Linux Picker helps guide you
                    through the Linux ecosystem without unnecessary complexity.
                </p>

                <p>
                    The goal is simple:
                    make the beginning of your Linux journey easier, clearer, and more accessible.
                </p>

                <p>
                    Use the ISO Picker to filter distributions by:
                </p>

                <ul>
                    <li>Stability</li>
                    <li>Difficulty</li>
                    <li>Desktop Environment</li>
                    <li>Package Manager</li>
                    <li>System Type</li>
                    <li>Display Protocol</li>
                    <li>Distribution Family</li>
                    <li>Origin</li>
                </ul>

                <p>
                    Explore. Compare. Learn.
                    Find a Linux distribution built for the way you work.
                </p>

            </div>

        </Card>
    )
}

export default Welcome