import './styles/navbarStyle.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggler } from "./ThemeToggler";
import logoImg from "../../assets/images/logo.png";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar-container">
                <div className="navbar-left">
                    <Link className="navbar-logo" to="/">
                        <div className="navbar-logo-icon">
                            <img src={logoImg} alt="LiveLoLScore" />
                        </div>
                        <div className="navbar-logo-text">
                            <span className="navbar-brand-name">LiveLoLScore</span>
                            <span className="navbar-brand-sub">Live Esports</span>
                        </div>
                    </Link>
                </div>

                <button
                    className="navbar-hamburger"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`navbar-center ${mobileMenuOpen ? 'open' : ''}`}>
                    <Link className="navbar-nav-link" to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link className="navbar-nav-link" to="/matches/" onClick={() => setMobileMenuOpen(false)}>Matches</Link>
                    <Link className="navbar-nav-link" to="/results/" onClick={() => setMobileMenuOpen(false)}>Results</Link>
                    <Link className="navbar-nav-link" to="/standings/" onClick={() => setMobileMenuOpen(false)}>Standings</Link>
                    <Link className="navbar-nav-link" to="/news/" onClick={() => setMobileMenuOpen(false)}>News</Link>
                    <Link className="navbar-nav-link" to="/gear/" onClick={() => setMobileMenuOpen(false)}>Gaming Gear</Link>
                    <a className="navbar-nav-link" href="https://lolesports.com" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>LoL Esports</a>
                </div>

                <div className="navbar-right">
                    <div className="navbar-live-badge">
                        <span className="live-dot"/>
                        LIVE
                    </div>
                </div>
            </nav>

            {/* Top leaderboard ad slot — swap with your Google AdSense tag */}
            <div className="ad-banner-top-wrapper">
                <div className="ad-banner-top">
                    Advertisement · 728×90
                </div>
            </div>
        </>
    );
}
