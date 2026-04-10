import './styles/navbarStyle.css'
import { Link } from "react-router-dom";
import { ThemeToggler } from "./ThemeToggler";
import { SoundToggler } from "./SoundToggler";
import logoImg from "../../assets/images/logo.png";

export function Navbar() {
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

                <div className="navbar-center">
                    <Link className="navbar-nav-link" to="/">Home</Link>
                    <Link className="navbar-nav-link" to="/matches/">Matches</Link>
                    <Link className="navbar-nav-link" to="/results/">Results</Link>
                    <Link className="navbar-nav-link" to="/standings/">Standings</Link>
                    <Link className="navbar-nav-link" to="/news/">News</Link>
                    <Link className="navbar-nav-link" to="/gear/">Gaming Gear</Link>
                    <a className="navbar-nav-link" href="https://lolesports.com" target="_blank" rel="noreferrer">LoL Esports</a>
                </div>

                <div className="navbar-right">
                    <div className="navbar-live-badge">
                        <span className="live-dot"/>
                        LIVE
                    </div>
                    <SoundToggler />
              
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
