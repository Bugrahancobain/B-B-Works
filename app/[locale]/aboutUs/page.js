"use client";

import React from "react";
import "./about.css";

export default function AboutPage() {
    return (
        <div className="aboutPageMain">
            <header className="aboutHeader">
                <h1>About Our Agency</h1>
                <p>Discover more about who we are and what we do.</p>
            </header>

            <section className="aboutMissionSection">
                <div className="missionImage">
                    <img src="/path-to-your-image.jpg" alt="Mission" />
                </div>
                <div className="missionContent">
                    <h2>Our Mission</h2>
                    <p>
                        We aim to deliver outstanding results for our clients and ensure their satisfaction.
                    </p>
                </div>
            </section>

            <section className="aboutTeamSection">
                <h2>Meet Our Team</h2>
                <div className="teamGrid">
                    <div className="teamMember">
                        <img src="/path-to-team-member.jpg" alt="Team Member" />
                        <h3>John Doe</h3>
                        <p>CEO & Founder</p>
                    </div>
                    <div className="teamMember">
                        <img src="/path-to-team-member.jpg" alt="Team Member" />
                        <h3>Jane Smith</h3>
                        <p>Marketing Specialist</p>
                    </div>
                </div>
            </section>

            <footer className="aboutFooter">
                <p>© 2024 Your Agency. All Rights Reserved.</p>
            </footer>
        </div>
    );
}