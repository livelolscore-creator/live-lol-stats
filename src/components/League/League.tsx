import { useEffect, useState } from "react";
import "./styles/leagueStyle.css";
import { getStandingsResponse } from "../../utils/LoLEsportsAPI";

interface TeamStanding {
    id: string;
    name: string;
    code: string;
    image: string;
    record?: {
        wins: number;
        losses: number;
    };
}

interface LeagueData {
    league: string;
    leagueSlug: string;
    name: string;
    image: string;
    teams: TeamStanding[];
    lastUpdated: string;
}

const LEAGUES = [
    { slug: "lck", name: "LCK", fullName: "League of Legends Champions Korea", image: "https://am-a.akamaihd.net/image?resize=100:&f=http%3A%2F%2Fstatic.lolesports.com%2F leagues%2F1592516269321-LCK-LogosFINAL-horizontal-SafeArea.png" },
    { slug: "lec", name: "LEC", fullName: "League of Legends European Championship", image: "https://am-a.akamaihd.net/image?resize=100:&f=http%3A%2F%2Fstatic.lolesports.com%2F leagues%2F1615815101132-LEC-2021-SafeArea.png" },
    { slug: "lcs", name: "LCS", fullName: "League of Legends Championship Series", image: "https://am-a.akamaihd.net/image?resize=100:&f=http%3A%2F%2Fstatic.lolesports.com%2F leagues%2F1615815223068-LCS-2021_logos_final-01.png" },
    { slug: "lpl", name: "LPL", fullName: "League of Legends Pro League", image: "https://am-a.akamaihd.net/image?resize=100:&f=http%3A%2F%2Fstatic.lolesports.com%2F leagues%2F1592516223271-LPL-Logos-01.png" },
    { slug: "pcs", name: "PCS", fullName: "Pacific Championship Series", image: "https://am-a.akamaihd.net/image?resize=100:&f=http%3A%2F%2Fstatic.lolesports.com%2F leagues%2F1592516209494-PCS-2020Logosv-01.png" },
];

const TOURNAMENT_IDS = [
    { id: "110609143714132019", name: "LCK", slug: "lck" },
    { id: "110609143644015524", name: "LEC", slug: "lec" },
    { id: "110609143713172486", name: "LCS", slug: "lcs" },
    { id: "110609143713139109", name: "LPL", slug: "lpl" },
    { id: "110609143714132031", name: "PCS", slug: "pcs" },
];

export function League({ match }: any) {
    const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
    const [loading, setLoading] = useState(true);
    const leagueSlug = match.params.league;

    const leagueInfo = LEAGUES.find(l => l.slug === leagueSlug);

    useEffect(() => {
        if (!leagueInfo) {
            setLoading(false);
            return;
        }

        const fetchLeagueData = async () => {
            const tournament = TOURNAMENT_IDS.find(t => t.slug === leagueSlug);
            if (!tournament) {
                setLoading(false);
                return;
            }

            try {
                const response = await getStandingsResponse(tournament.id);
                const data = response?.data?.data?.standings;
                
                let teams: TeamStanding[] = [];
                
                if (data && data.length > 0) {
                    for (const standing of data) {
                        if (standing.stages) {
                            for (const stage of standing.stages) {
                                if (stage.sections) {
                                    for (const section of stage.sections) {
                                        if (section.standings?.entries && section.standings.entries.length > 0) {
                                            teams = section.standings.entries.map((entry: any) => ({
                                                id: entry.team.id,
                                                name: entry.team.name,
                                                code: entry.team.code,
                                                image: entry.team.image,
                                                record: {
                                                    wins: entry.record?.wins || 0,
                                                    losses: entry.record?.losses || 0,
                                                }
                                            }));
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                setLeagueData({
                    league: tournament.name,
                    leagueSlug: tournament.slug,
                    name: tournament.name,
                    image: leagueInfo.image,
                    teams: teams,
                    lastUpdated: new Date().toISOString()
                });
            } catch (error) {
                console.error("Failed to fetch league data:", error);
            }
            setLoading(false);
        };

        fetchLeagueData();
    }, [leagueSlug, leagueInfo]);

    useEffect(() => {
        if (!leagueInfo) return;

        const seoTitle = `${leagueInfo.fullName} (${leagueInfo.name}) Standings & Schedule 2025 | LiveLoLScore`;
        const seoDescription = `View live ${leagueInfo.fullName} standings, schedule, and match results. Track ${leagueInfo.name} teams, rankings, and upcoming matches. Updated in real-time.`;
        const keywords = `${leagueInfo.name} standings, ${leagueInfo.name} schedule, ${leagueInfo.name} results, ${leagueInfo.fullName}, ${leagueInfo.name} teams, esports standings`;

        document.title = seoTitle;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (metaDescription) metaDescription.setAttribute("content", seoDescription);
        if (metaKeywords) metaKeywords.setAttribute("content", keywords);
        if (ogTitle) ogTitle.setAttribute("content", seoTitle);
        if (ogDescription) ogDescription.setAttribute("content", seoDescription);

        return () => {
            if (metaDescription) metaDescription.setAttribute("content", "Track live League of Legends esports matches in real-time.");
            if (metaKeywords) metaKeywords.setAttribute("content", "League of Legends esports, LoL live scores");
        };
    }, [leagueInfo]);

    if (loading) {
        return (
            <div className="league-container">
                <div className="league-loading">Loading {leagueInfo?.name || "League"} data...</div>
            </div>
        );
    }

    if (!leagueInfo) {
        return (
            <div className="league-container">
                <div className="league-error">League not found</div>
            </div>
        );
    }

    return (
        <div className="league-container">
            <div className="league-breadcrumb">
                <a href="/">Home</a> / <a href="/standings/">Standings</a> / <span>{leagueInfo.name}</span>
            </div>

            <div className="league-header">
                <div className="league-logo">
                    <img src={leagueInfo.image} alt={leagueInfo.name} />
                </div>
                <div className="league-info">
                    <h1 className="league-title">{leagueInfo.fullName}</h1>
                    <p className="league-subtitle">{leagueInfo.name} Standings & Rankings 2025</p>
                </div>
            </div>

            {leagueData && leagueData.teams.length > 0 ? (
                <div className="league-standings">
                    <div className="standings-card full">
                        <div className="standings-header">
                            <h3>{leagueInfo.name} Current Standings</h3>
                            <span className="last-updated">
                                Updated: {new Date(leagueData.lastUpdated).toLocaleString()}
                            </span>
                        </div>
                        <div className="standings-table">
                            <div className="standings-row header">
                                <span className="col-rank">Rank</span>
                                <span className="col-team">Team</span>
                                <span className="col-record">W - L</span>
                                <span className="col-winrate">Win %</span>
                            </div>
                            {leagueData.teams.map((team, index) => {
                                const totalGames = (team.record?.wins || 0) + (team.record?.losses || 0);
                                const winRate = totalGames > 0 ? Math.round((team.record?.wins || 0) / totalGames * 100) : 0;
                                return (
                                    <div key={team.id} className="standings-row">
                                        <span className="col-rank">{index + 1}</span>
                                        <span className="col-team">
                                            <img src={team.image} alt={team.name} />
                                            <span>{team.code}</span>
                                        </span>
                                        <span className="col-record">
                                            {team.record?.wins || 0} - {team.record?.losses || 0}
                                        </span>
                                        <span className="col-winrate">{winRate}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="league-no-data">
                    <p>No standings data available at the moment. Please check back later.</p>
                </div>
            )}

            <div className="league-description">
                <h2>About {leagueInfo.fullName}</h2>
                <p>
                    The {leagueInfo.fullName} ({leagueInfo.name}) is one of the premier League of Legends esports leagues in the world. 
                    Watch live matches, track team standings, and follow the latest results throughout the season.
                </p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SportsEvent",
                    "name": `${leagueInfo.fullName} 2025`,
                    "description": `View live ${leagueInfo.fullName} standings, schedule, and match results. Track ${leagueInfo.name} teams, rankings, and upcoming matches. Updated in real-time.`,
                    "organizer": {
                        "@type": "Organization",
                        "name": leagueInfo.fullName,
                        "url": "https://lolesports.com"
                    },
                    "eventStatus": "https://schema.org/EventScheduled",
                    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode"
                })
            }} />
        </div>
    );
}
