import { useEffect, useState } from "react";
import "./styles/newsStyle.css";

interface NewsArticle {
    id: number;
    title: string;
    category: "patch" | "roster" | "tournament" | "analysis";
    league: string;
    date: string;
    summary: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
    {
        id: 1,
        title: "LCK Spring Split 2025: Early Season Favorites Emerge",
        category: "tournament",
        league: "LCK",
        date: "2025-01-15",
        summary: "The LCK Spring Split has kicked off with T1 and Gen.G establishing early dominance. T1 roster shuffle appears to have paid off, with their bot lane synergy looking sharper than ever. Gen.G continues their methodical approach, winning games through superior macro play and objective control. The surprise package so far has been Kwangdong Freecs, who have exceeded expectations with their aggressive early game style. DK and HLE remain competitive but inconsistent, suggesting potential roster adjustments may be coming. With MSI qualification race heating up, every game matters for teams eyeing international competition. The return of live crowds has added new energy to the LCK broadcast, with fans showing incredible support for their favorite teams."
    },
    {
        id: 2,
        title: "Patch 25.3 Preview: Champion Buffs and Nerfs Analysis",
        category: "patch",
        league: "Global",
        date: "2025-01-14",
        summary: "Riot latest patch addresses several balance concerns from the community. Ahri receives quality-of-life improvements, increasing her late-game relevance in competitive play. The ADC meta continues to evolve as traditional marksmen regain prominence over caster supports. Jungle clears have been adjusted, potentially shifting the early-game dynamics that dominated the previous patch. Top lane bruisers see minor adjustments that could reshape the meta picks. The cloud drake buff encourages early dragon fights, potentially benefiting teams with strong early objective control. Professional teams will need to rapidly adapt their strategies as patch 25.3 goes live across all regions this week."
    },
    {
        id: 3,
        title: "LPL Transfers: Major Roster Changes Shake Up Chinese Scene",
        category: "roster",
        league: "LPL",
        date: "2025-01-13",
        summary: "The LPL off-season has concluded with several blockbuster moves reshaping the competitive landscape. BLG secured their roster core while making strategic additions to their coaching staff. JDG rebuild focuses on developing emerging talent alongside experienced leaders. Weibo Gaming surprised analysts by maintaining their championship-winning lineup. The biggest story involves roster shuffling among mid-tier teams, with several organizations betting big on rookie acquisitions. Scout move generated significant buzz, with fans eagerly anticipating his performance in new colors. These changes set the stage for what promises to be the most competitive LPL season in history, with at least six teams capable of challenging for the title."
    },
    {
        id: 4,
        title: "Worlds 2025 Format Changes: What Teams Need to Know",
        category: "tournament",
        league: "International",
        date: "2025-01-12",
        summary: "Riot Games announced significant format changes for Worlds 2025, aiming to increase competitive integrity and fan engagement. The tournament expands to include two additional teams, bringing the total to twenty-four representatives from all major regions. The group stage now features four groups of six teams, with the top two advancing in a double-elimination format. This change gives teams more margin for error while maintaining high stakes throughout the event. Regional qualifier brackets have been restructured, placing greater importance on regular season performance. The play-in stage remains unchanged, providing emerging regions additional paths to the main event. Teams and fans have generally welcomed these changes as a positive evolution for League of Legends premier competition."
    },
    {
        id: 5,
        title: "ADC Meta Shift: Why Traditional Marksmen Are Making a Comeback",
        category: "analysis",
        league: "Global",
        date: "2025-01-11",
        summary: "After months of unconventional bot lane picks dominating professional play, traditional ADC champions have reclaimed their position as the primary choice. This shift stems from systematic nerfs to support items and assassin champions that enabled the mage ADC experiment. Professional teams now prioritize lane dominant pairs that can secure early dragons while scaling into late-game relevance. Twitch and Jinx have emerged as the frontrunners, with their hyper-carry potential perfectly suited to the current meta. Engagement support nerfs have reduced the all-in threat in lane, allowing ADC players more freedom to farm safely. Teams with elite ADC performers are seeing immediate benefits, with statistics showing a clear correlation between traditional marksmen success and team rankings."
    },
    {
        id: 6,
        title: "LEC Winter Split Recap: G2 Dominance Continues",
        category: "tournament",
        league: "LEC",
        date: "2025-01-10",
        summary: "G2 Esports has solidified their position at the top of the LEC Winter Split standings, displaying a level of consistency that has frustrated their competitors. Their innovative champion picks and strategic flexibility have set a new standard for European League of Legends. Fnatic remains their closest challenger, though questions persist about their ability to close out close games. The surprise performer of the split has been Team BDS, whose aggressive playstyle has disrupted traditional team compositions. SK Gaming and MAD Lions continue fighting for playoff positioning in what has become a crowded middle tier. With the international break approaching, teams will use this time to refine strategies and address weaknesses before the split critical phase."
    },
    {
        id: 7,
        title: "Faker Journey: Four Worlds Titles and Counting",
        category: "analysis",
        league: "LCK",
        date: "2025-01-09",
        summary: "Lee Sang-hyeok, known worldwide as Faker, continues to defy expectations as he competes at the highest level years after many thought his prime had passed. His longevity in professional League of Legends stands as a testament to his work ethic and adaptability. Each season brings new challenges, yet Faker consistently delivers performances that elevate his entire team. T1 decision to build around their legendary mid laner has proven prescient, with roster chemistry reaching new heights. Young talents on the roster credit Faker mentorship for their rapid improvement. As esports continues maturing, Faker career serves as a blueprint for sustained excellence. His pursuit of additional World Championship titles drives him forward, with fans worldwide cheering for more history."
    },
    {
        id: 8,
        title: "LCS Spring Preview: Can Team Liquid Defend Their Title?",
        category: "tournament",
        league: "LCS",
        date: "2025-01-08",
        summary: "Team Liquid enters the LCS Spring Split as defending champions, facing increased pressure from hungry rivals. Cloud9 has assembled a roster designed to end their championship drought, making significant roster investments. 100 Thieves looks to build on their strong finish last season, with chemistry improvements being a key focus. NRG Esports continues establishing themselves as a competitive force in North American League of Legends. The LCS has introduced new broadcast elements and enhanced viewer experience features. Young talent from the Challengers circuit provides additional depth across multiple organizations. This split promises exciting competition as teams vie for international qualification spots at MSI."
    },
    {
        id: 9,
        title: "Meta Report: Jungle Paths That Win Games in Competitive Play",
        category: "analysis",
        league: "Global",
        date: "2025-01-07",
        summary: "Professional League of Legends has seen a dramatic shift in jungle pathing strategies this season. Early aggressive paths have replaced the traditional farming-centric approaches that dominated last year. Teams prioritize early dragon control, fundamentally changing how junglers approach their clearing routes. The rise of champions like Vi and Sejuani enables strong early gank potential while maintaining teamfight utility. Deep warding patterns have evolved as teams look to track enemy jungler movements more precisely. Counter-jungling has become riskier, with punished teams losing significant tempo advantages. These meta developments reward teams with strong communication and coordinated early-game setups."
    },
    {
        id: 10,
        title: "Rise of Esports Betting: Impact on Professional League of Legends",
        category: "analysis",
        league: "International",
        date: "2025-01-06",
        summary: "Esports betting has grown into a billion-dollar industry, with League of Legends representing a significant portion of total wagers. Major betting platforms now sponsor professional teams and tournaments, changing the financial landscape of competitive play. Integrity concerns have prompted Riot Games to implement stricter regulations and monitoring systems. Players and coaches receive education about responsible gambling and maintaining competitive integrity. The betting ecosystem provides additional revenue streams for organizations through sponsorship deals. Fans engage more deeply with matches when financial stakes are involved, though this raises ethical questions. Industry stakeholders continue working to balance commercial interests with protecting vulnerable individuals."
    },
    {
        id: 11,
        title: "Champion Pool Analysis: Mid Lane Meta Favorites",
        category: "analysis",
        league: "Global",
        date: "2025-01-05",
        summary: "The current mid lane meta showcases remarkable champion diversity, with traditional mages sharing spotlight with assassins and control mages. Orianna maintains high priority due to her teamfight presence and safe laning phase. Syndra continues appearing frequently, offering strong lane presence and valuable pick potential. The return of Azir in professional play demonstrates his high skill ceiling rewarding dedicated practice. Rookies often gravitate toward mechanical champions like Akali and Yone to showcase individual skill. Team compositions increasingly prioritize mid laner versatility, enabling flex picks across multiple roles. Championship teams consistently demonstrate deep champion pools, suggesting mastery of diverse champions remains crucial for success."
    },
    {
        id: 12,
        title: "Team Chemistry: The Unspoken Factor in Championship Runs",
        category: "analysis",
        league: "International",
        date: "2025-01-04",
        summary: "Beyond individual skill and strategic preparation, team chemistry often determines championship success. Organizations invest heavily in sports psychologists and team building activities to foster cohesion. Communication patterns during high-pressure situations reveal the true strength of team relationships. Veteran players frequently cite trust as the foundation enabling aggressive, coordinated plays. Rookies benefit immensely from supportive teammates who help navigate the pressures of professional competition. The rise of international rosters presents unique challenges in developing effective team chemistry. Successful teams create environments where players feel comfortable expressing concerns and suggesting improvements openly."
    }
];

const CATEGORIES = ["all", "patch", "roster", "tournament", "analysis"] as const;
const LEAGUES = ["all", "LCK", "LEC", "LCS", "LPL", "International", "Global"] as const;

const MAILCHIMP_URL = "https://us16.list-manage.com/subscribe/post";
const MAILCHIMP_PARAMS = {
    u: "99bb906bac9d8b36bb050f16c75f29f4",
    id: "1d4e86c84f"
};

export function News() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedLeague, setSelectedLeague] = useState<string>("all");
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const [email, setEmail] = useState<string>("");
    const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        document.title = "LiveLoLScore — News & Analysis | LoL Esports Updates, Patch Notes & Roster Changes";
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaDescription) metaDescription.setAttribute("content", "Stay updated with the latest League of Legends esports news. Get analysis on patch notes, roster changes, tournament results, and meta shifts across LCK, LEC, LCS, and LPL.");
        if (metaKeywords) metaKeywords.setAttribute("content", "LoL esports news, League of Legends news, LoL patch notes, roster changes, esports analysis, LCK news, LEC news, LCS news, LPL news");
    }, []);

    const filteredArticles = NEWS_ARTICLES.filter((article) => {
        const categoryMatch = selectedCategory === "all" || article.category === selectedCategory;
        const leagueMatch =
            selectedLeague === "all" ||
            article.league === selectedLeague ||
            article.league === "International" ||
            article.league === "Global";
        return categoryMatch && leagueMatch;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "patch":
                return "category-patch";
            case "roster":
                return "category-roster";
            case "tournament":
                return "category-tournament";
            case "analysis":
                return "category-analysis";
            default:
                return "";
        }
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setErrorMessage("Please enter a valid email address.");
            setSubscribeStatus("error");
            return;
        }

        setSubscribeStatus("loading");
        setErrorMessage("");

        try {
            const formData = new FormData();
            formData.append("EMAIL", email);
            formData.append("u", MAILCHIMP_PARAMS.u);
            formData.append("id", MAILCHIMP_PARAMS.id);

            const response = await fetch(`${MAILCHIMP_URL}?u=${MAILCHIMP_PARAMS.u}&id=${MAILCHIMP_PARAMS.id}`, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });

            setSubscribeStatus("success");
            setEmail("");

            setTimeout(() => {
                setSubscribeStatus("idle");
            }, 5000);
        } catch (error) {
            setSubscribeStatus("error");
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="news-container">
            <div className="news-header">
                <h1 className="news-title">News & Analysis</h1>
                <p className="news-subtitle">
                    Latest updates from the world of League of Legends esports
                </p>
            </div>

            <div className="news-filters">
                <div className="filter-group">
                    <span className="filter-label">Category:</span>
                    <div className="filter-buttons">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${
                                    selectedCategory === category ? "active" : ""
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="filter-group">
                    <span className="filter-label">League:</span>
                    <div className="filter-buttons">
                        {LEAGUES.map((league) => (
                            <button
                                key={league}
                                className={`filter-btn ${
                                    selectedLeague === league ? "active" : ""
                                }`}
                                onClick={() => setSelectedLeague(league)}
                            >
                                {league}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="news-grid">
                {filteredArticles.map((article) => (
                    <article key={article.id} className="news-card">
                        <div className="news-card-header">
                            <span
                                className={`news-category ${getCategoryColor(
                                    article.category
                                )}`}
                            >
                                {article.category.toUpperCase()}
                            </span>
                            <span className="news-league">{article.league}</span>
                        </div>
                        <h2 className="news-card-title">{article.title}</h2>
                        <span className="news-date">{formatDate(article.date)}</span>
                        <div
                            className={`news-summary ${
                                expandedArticle === article.id ? "expanded" : ""
                            }`}
                        >
                            <p>{article.summary}</p>
                        </div>
                        <button
                            className="news-read-more"
                            onClick={() =>
                                setExpandedArticle(
                                    expandedArticle === article.id ? null : article.id
                                )
                            }
                        >
                            {expandedArticle === article.id ? "Show Less" : "Read More"}
                        </button>
                    </article>
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <div className="news-empty">
                    <p>No articles found for the selected filters.</p>
                </div>
            )}

            <div className="news-subscribe">
                <div className="subscribe-card">
                    <h3>Stay Updated</h3>
                    <p>Get the latest esports news delivered to your inbox</p>

                    {subscribeStatus === "success" ? (
                        <div className="subscribe-success">
                            <span className="success-icon">&#10003;</span>
                            <p>Thanks for subscribing! Check your inbox to confirm.</p>
                        </div>
                    ) : (
                        <form className="subscribe-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="subscribe-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="subscribe-btn"
                                disabled={subscribeStatus === "loading"}
                            >
                                {subscribeStatus === "loading" ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                    )}

                    {subscribeStatus === "error" && errorMessage && (
                        <p className="subscribe-error">{errorMessage}</p>
                    )}

                    <p className="subscribe-disclaimer">
                        No spam, unsubscribe anytime.
                    </p>
                </div>
            </div>
        </div>
    );
}
