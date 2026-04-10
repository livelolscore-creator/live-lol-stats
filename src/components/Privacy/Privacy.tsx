import { useEffect } from "react";
import "./styles/privacyStyle.css";

export function Privacy() {
    useEffect(() => {
        document.title = "LiveLoLScore — Privacy Policy | Data Protection & Cookie Policy";
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaDescription) metaDescription.setAttribute("content", "Read LiveLoLScore's privacy policy. Learn how we collect, use, and protect your data, including information about cookies, third-party services, and your privacy rights.");
        if (metaKeywords) metaKeywords.setAttribute("content", "privacy policy, data protection, cookie policy, LiveLoLScore privacy, esports data policy");
    }, []);

    return (
        <div className="privacy-container">
            <div className="privacy-header">
                <h1 className="privacy-title">Privacy Policy</h1>
                <p className="privacy-updated">Last updated: April 2025</p>
            </div>

            <div className="privacy-content">
                <section className="privacy-section">
                    <h2>1. Information We Collect</h2>
                    <p>
                        LiveLoLScore ("we," "our," or "us") collects information to provide and improve our League of Legends 
                        esports tracking services. This includes:
                    </p>
                    <ul>
                        <li><strong>Usage Data:</strong> Pages visited, time spent on site, and interaction patterns to improve user experience.</li>
                        <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers for analytics purposes.</li>
                        <li><strong>Newsletter Subscriptions:</strong> Email addresses collected through our subscription form, managed through Mailchimp.</li>
                        <li><strong>Game Data:</strong> Match statistics and esports data provided by Riot Games APIs.</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>2. How We Use Your Information</h2>
                    <p>We use collected information for the following purposes:</p>
                    <ul>
                        <li>Providing and maintaining our esports tracking services</li>
                        <li>Sending newsletter updates if you have subscribed (via Mailchimp)</li>
                        <li>Analyzing usage patterns to improve website functionality</li>
                        <li>Displaying relevant advertisements through Google AdSense</li>
                        <li>Complying with legal obligations</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>3. Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies and similar technologies to enhance your browsing experience:
                    </p>
                    <ul>
                        <li><strong>Essential Cookies:</strong> Required for website functionality (theme preferences, sound settings)</li>
                        <li><strong>Analytics Cookies:</strong> Google Analytics to understand site traffic and usage</li>
                        <li><strong>Advertising Cookies:</strong> Google AdSense for personalized advertisements</li>
                    </ul>
                    <p>
                        You can control cookie preferences through your browser settings. Disabling cookies may affect site functionality.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>4. Third-Party Services</h2>
                    <p>We use third-party services that may collect data:</p>
                    <ul>
                        <li><strong>Riot Games:</strong> Our service fetches data from Riot Games APIs. Their privacy policy governs their data practices.</li>
                        <li><strong>Mailchimp:</strong> Email subscription service. Their privacy policy applies to newsletter data.</li>
                        <li><strong>Google Analytics:</strong> Traffic analysis tool. You can opt out using browser extensions.</li>
                        <li><strong>Google AdSense:</strong> Advertisement delivery. Google's privacy policy governs ad personalization.</li>
                        <li><strong>Google Tag Manager:</strong> Analytics and tracking management.</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>5. Data Retention</h2>
                    <p>
                        We retain your information only as long as necessary to provide services or as required by law:
                    </p>
                    <ul>
                        <li>Newsletter subscriptions are retained until you unsubscribe</li>
                        <li>Analytics data is retained for up to 26 months</li>
                        <li>Game data is provided by Riot Games and subject to their retention policies</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>6. Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect your information. However, no internet transmission 
                        is completely secure. We cannot guarantee absolute security of data transmitted to our website.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>7. Your Rights</h2>
                    <p>Depending on your location, you may have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Opt out of marketing communications</li>
                        <li>Object to certain processing activities</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us at <a href="mailto:support@loltrack.gg">support@loltrack.gg</a>.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>8. Children's Privacy</h2>
                    <p>
                        Our service is not intended for users under 13 years of age. We do not knowingly collect 
                        personal information from children under 13. If you believe we have collected such information, 
                        please contact us immediately.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>9. International Data Transfers</h2>
                    <p>
                        Your information may be transferred and processed in countries outside your residence. 
                        We ensure appropriate safeguards are in place for such transfers in accordance with applicable data protection laws.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>10. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy periodically. We will notify you of material changes by 
                        posting the new policy on this page and updating the "Last updated" date. We encourage 
                        you to review this policy regularly.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>11. Riot Games Trademarks</h2>
                    <p>
                        League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. 
                        LiveLoLScore is not endorsed by, sponsored by, or affiliated with Riot Games, Inc. All game-related 
                        content, statistics, and materials are provided for informational purposes only.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>12. Contact Us</h2>
                    <p>If you have questions about this Privacy Policy, please contact us:</p>
                    <ul className="contact-list">
                        <li><strong>Email:</strong> <a href="mailto:support@loltrack.gg">support@loltrack.gg</a></li>
                        <li><strong>Advertising:</strong> <a href="mailto:commerce@loltrack.gg">commerce@loltrack.gg</a></li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
