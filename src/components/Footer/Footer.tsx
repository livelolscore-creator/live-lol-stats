import './styles/footerStyle.css'
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

export function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="footer-ad-slot">
                Advertisement · 728×90
            </div>

            <div className="footer-container">
                <div className="footer-brand">
                    <div className="footer-logo-mark">
                        <img src={logoImg} alt="LiveLoLScore" />
                    </div>
                    <div>
                        <div className="footer-brand-name">LiveLoLScore</div>
                        <div className="footer-brand-tagline">Live Esports Stats</div>
                    </div>
                </div>

                <div className="footer-links">
                    <Link className="footer-link" to="/privacy/">Privacy Policy</Link>
                </div>

                <div className="footer-contact">
                    <div>Contact: livelolscore@gmail.com</div>
                    <div>For advertising inquiries, please contact us at this email.</div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© 2025 LiveLoLScore. This website is not endorsed by or affiliated with Riot Games. Portions of the materials used are trademarks and/or copyrighted works of Riot Games, Inc.</span>
            </div>
        </footer>
    );
}