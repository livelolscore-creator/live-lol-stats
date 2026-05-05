import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './styles/standingsStyle.css'
import { getScheduleResponse, getLeaguesResponse } from "../../utils/LoLEsportsAPI";

interface StandingTeam {
    id: string;
    name: string;
    code: string;
    image: string;
    record?: {
        wins: number;
        losses: number;
    };
    games?: number;
    points?: number;
    last5?: ('W' | 'L')[];
}

interface LeagueData {
    league: string;
    leagueSlug: string;
    name: string;
    shortName: string;
    teams: StandingTeam[];
    lastUpdated: string;
}

const LEAGUES = [
    { id: "lck", name: "LCK", shortName: "LCK", fullName: "League of Legends Championship Korea", leagueId: "98767991310872058" },
    { id: "lec", name: "LEC", shortName: "LEC", fullName: "League of Legends European Championship" },
    { id: "lcs", name: "LCS", shortName: "LCS", fullName: "League Championship Series" },
    { id: "lpl", name: "LPL", shortName: "LPL", fullName: "League of Legends Pro League" },
    { id: "lcp", name: "LCP", shortName: "LCP", fullName: "League of Legends Champions Philippines" },
];

interface ScheduleTeam {
    name: string;
    code: string;
    image: string;
    result?: {
        outcome: string;
        gameWins: number;
    };
    record?: {
        wins: number;
        losses: number;
    };
}

interface ScheduleMatch {
    id: string;
    teams: ScheduleTeam[];
}

interface ScheduleEvent {
    startTime: string;
    state: string;
    type: string;
    blockName?: string;
    league: {
        name: string;
        slug: string;
    };
    match: ScheduleMatch;
}

interface ScheduleData {
    data?: {
        schedule?: {
            events?: ScheduleEvent[];
            pages?: { older?: string; newer?: string };
        };
    };
}

const LEAGUE_ICONS: Record<string, string> = {
    lck: "KR",
    lec: "EU",
    lcs: "NA",
    lpl: "CN",
    lcp: "PH",
};

const START_DATE = "2026-03-21";

export function Standings() {
    const [selectedLeague, setSelectedLeague] = useState<string>("lck");
    const [allLeaguesData, setAllLeaguesData] = useState<Record<string, LeagueData>>({});
    const [loading, setLoading] = useState(true);
    const [apiStatus, setApiStatus] = useState<string>("");
    const [error, setError] = useState<string>("");
    const history = useHistory();

    useEffect(() => {
        document.title = "LiveLoLScore — Standings | LCK, LEC, LCS, LPL Rankings";
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaDescription) metaDescription.setAttribute("content", "View live League of Legends esports standings for LCK, LEC, LCS, and LPL. Track team rankings, win/loss records, and tournament standings in real-time.");
        if (metaKeywords) metaKeywords.setAttribute("content", "LoL standings, LCK standings, LEC standings, LCS standings, LPL standings, LoL rankings, esports standings");
        
        fetchStandingsFromSchedule();
        
        return () => {
            if (metaDescription) metaDescription.setAttribute("content", "Track live League of Legends esports matches in real-time.");
            if (metaKeywords) metaKeywords.setAttribute("content", "League of Legends esports, LoL live scores");
        };
    }, []);

    const fetchStandingsFromSchedule = async () => {
        setLoading(true);
        setError("");
        
        const leagueStandings: Record<string, Record<string, StandingTeam>> = {};
        const leagueMatchResults: Record<string, Record<string, ('W' | 'L')[]>> = {};
        let successCount = 0;

        try {
            const leaguesResponse = await getLeaguesResponse();
            const leaguesData = leaguesResponse?.data?.data?.leagues || [];
            
            const leagueIdMap: Record<string, string> = {};
            for (const league of leaguesData) {
                const slug = league.slug?.toLowerCase();
                if (slug && LEAGUES.find(l => l.id === slug)) {
                    leagueIdMap[slug] = league.id;
                }
            }
            
            const schedulePromises = LEAGUES
                .filter(l => leagueIdMap[l.id])
                .map(league => getScheduleResponse(undefined, leagueIdMap[league.id]));
            
            const scheduleResponses = await Promise.all(schedulePromises);
            
            let allEvents: ScheduleEvent[] = [];
            for (const response of scheduleResponses) {
                const scheduleData = response?.data as ScheduleData;
                if (scheduleData?.data?.schedule?.events) {
                    allEvents = [...allEvents, ...scheduleData.data.schedule.events];
                }
            }
            
            if (allEvents.length > 0) {
                const sortedEvents = allEvents.sort(
                    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
                );
                
                const startDate = new Date(START_DATE);
                const now = new Date();
                const recentEvents = sortedEvents.filter(e => {
                    const eventDate = new Date(e.startTime);
                    return eventDate >= startDate && eventDate <= now;
                });
                
                const teamMatchHistory: Record<string, Record<string, {outcome: 'W' | 'L', startTime: Date}[]>> = {};
                
                for (const event of recentEvents) {
                    const leagueSlug = event.league.slug?.toLowerCase();
                    
                    if (!leagueSlug || !LEAGUES.find(l => l.id === leagueSlug)) {
                        continue;
                    }
                    
                    if (!leagueStandings[leagueSlug]) {
                        leagueStandings[leagueSlug] = {};
                        leagueMatchResults[leagueSlug] = {};
                        teamMatchHistory[leagueSlug] = {};
                    }
                    
                    const isCompleted = event.state === 'completed';

                    if (!event.match?.teams) continue;

                    for (const team of event.match.teams) {
                        if (!leagueStandings[leagueSlug][team.code]) {
                            leagueStandings[leagueSlug][team.code] = {
                                id: team.code,
                                name: team.name,
                                code: team.code,
                                image: team.image,
                                record: { wins: 0, losses: 0 }
                            };
                            leagueMatchResults[leagueSlug][team.code] = [];
                            teamMatchHistory[leagueSlug][team.code] = [];
                        }
                        
                        if (isCompleted) {
                            let outcome: 'W' | 'L' | null = null;
                            
                            const currentTeam = leagueStandings[leagueSlug][team.code];
                            if (!currentTeam.record) {
                                currentTeam.record = { wins: 0, losses: 0 };
                            }
                            
                            if (team.result?.outcome === 'win') {
                                outcome = 'W';
                                currentTeam.record.wins++;
                            } else if (team.result?.outcome === 'loss') {
                                outcome = 'L';
                                currentTeam.record.losses++;
                            }
                            
                            if (outcome) {
                                teamMatchHistory[leagueSlug][team.code].push({
                                    outcome,
                                    startTime: new Date(event.startTime)
                                });
                            }
                        }
                    }
                }
                
                for (const leagueSlug of Object.keys(teamMatchHistory)) {
                    for (const teamCode of Object.keys(teamMatchHistory[leagueSlug])) {
                        const matches = teamMatchHistory[leagueSlug][teamCode]
                            .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
                            .slice(0, 5);
                        leagueMatchResults[leagueSlug][teamCode] = matches.map(m => m.outcome);
                    }
                }
                
                const results: Record<string, LeagueData> = {};
                
                for (const league of LEAGUES) {
                    const teams = leagueStandings[league.id];
                    if (teams && Object.keys(teams).length > 0) {
                        const allTeams = Object.values(teams);
                        const teamsWithRecords = allTeams.filter(t => t.record && (t.record.wins > 0 || t.record.losses > 0));
                        
                        const teamsArray = teamsWithRecords
                            .sort((a, b) => {
                                const aWins = a.record?.wins || 0;
                                const bWins = b.record?.wins || 0;
                                if (bWins !== aWins) return bWins - aWins;
                                const aLosses = a.record?.losses || 0;
                                const bLosses = b.record?.losses || 0;
                                return aLosses - bLosses;
                            })
                            .map((t, index) => ({
                                ...t,
                                games: (t.record?.wins || 0) + (t.record?.losses || 0),
                                points: (t.record?.wins || 0) * 3,
                                last5: leagueMatchResults[league.id]?.[t.code] || []
                            }));
                        
                        if (teamsArray.length > 0) {
                            const leagueInfo = LEAGUES.find(l => l.id === league.id);
                            results[league.id] = {
                                league: leagueInfo?.shortName || league.id.toUpperCase(),
                                leagueSlug: league.id,
                                name: leagueInfo?.fullName || league.id,
                                shortName: leagueInfo?.shortName || league.id.toUpperCase(),
                                teams: teamsArray,
                                lastUpdated: new Date().toISOString()
                            };
                            successCount++;
                        }
                    }
                }
                
                if (successCount > 0) {
                    setAllLeaguesData(results);
                    setApiStatus(`Standings calculated from ${successCount} league(s)`);
                } else {
                    setError("No completed matches found. Standings will update as matches finish.");
                    setApiStatus("No completed matches");
                }
            } else {
                setError("Unable to fetch schedule data.");
                setApiStatus("API unavailable");
            }
        } catch (err) {
            console.error("Failed to fetch schedule:", err);
            setError("Unable to fetch live standings data.");
            setApiStatus("API unavailable");
        }
        
        setLoading(false);
    };

    const handleLeagueChange = (leagueSlug: string) => {
        setSelectedLeague(leagueSlug);
    };

    const currentLeagueData = allLeaguesData[selectedLeague];
    const currentLeagueInfo = LEAGUES.find(l => l.id === selectedLeague);

    if (loading) {
        return (
            <div className="standings-container">
                <div className="standings-header">
                    <h1 className="standings-title">Standings</h1>
                </div>
                <div className="standings-loading">
                    <div className="loading-spinner"></div>
                    <p>Calculating standings from match results...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="standings-container">
                <div className="standings-header">
                    <h1 className="standings-title">Standings</h1>
                </div>
                <div className="standings-error">
                    <p>{error}</p>
                    <button onClick={fetchStandingsFromSchedule} className="retry-btn">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const totalGames = currentLeagueData?.teams.reduce((sum, t) => sum + (t.games || 0), 0) || 0;

    return (
        <div className="standings-container">
            <div className="standings-header">
                <h1 className="standings-title">Standings</h1>
                <div className="standings-league-tabs">
                    {LEAGUES.map(league => (
                        <button
                            key={league.id}
                            className={`league-tab ${selectedLeague === league.id ? "active" : ""} ${!allLeaguesData[league.id] ? "disabled" : ""}`}
                            onClick={() => handleLeagueChange(league.id)}
                            disabled={!allLeaguesData[league.id]}
                        >
                            {league.shortName}
                        </button>
                    ))}
                </div>
            </div>

            {currentLeagueData && (
                <>
                    <div className="standings-league-banner">
                        <div className="league-banner-left">
                            <div className="league-icon">
                                {LEAGUE_ICONS[selectedLeague] || selectedLeague.toUpperCase().slice(0, 2)}
                            </div>
                            <div className="league-banner-info">
                                <h2>{currentLeagueInfo?.fullName}</h2>
                                <span>{currentLeagueData.teams.length} Teams</span>
                            </div>
                        </div>
                        <div className="league-banner-stats">
                            <div className="stat-item">
                                <div className="stat-value">{totalGames}</div>
                                <div className="stat-label">Games Played</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{currentLeagueData.teams.length}</div>
                                <div className="stat-label">Teams</div>
                            </div>
                        </div>
                    </div>

                    <div className="standings-status-bar">
                        <div className="standings-api-status">{apiStatus}</div>
                        <div className="standings-updated">
                            Updated: {new Date(currentLeagueData.lastUpdated).toLocaleString()}
                        </div>
                    </div>

                    <div className="standings-main">
                        <table className="standings-table">
                            <thead>
                                <tr>
                                    <th className="th-rank"></th>
                                    <th className="th-team">Name</th>
                                    <th className="th-record">W - L</th>
                                    <th className="th-last5">Last 5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentLeagueData.teams.map((team, index) => {
                                    const last5 = team.last5 || [];
                                    return (
                                        <tr 
                                            key={team.id} 
                                            className={`standings-row ${index < 4 ? "top-4" : ""}`}
                                            onClick={() => history.push({
                                                pathname: `/team/${team.code.toLowerCase()}`,
                                                state: { teamData: team }
                                            })}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td className="rank-cell">
                                                <span className="rank-badge">{index + 1}</span>
                                            </td>
                                            <td className="team-cell">
                                                <img 
                                                    src={team.image} 
                                                    alt={team.name} 
                                                    className="team-logo"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                                <div className="team-info">
                                                    <span className="team-name">
                                                        {team.name}
                                                        {index < 4 && <span className="playoff-badge">Playoffs</span>}
                                                    </span>
                                                    <span className="team-code">{team.code}</span>
                                                </div>
                                            </td>
                                            <td className="record-cell">
                                                <div className="record-row">
                                                    <span className="record-wins">{team.record?.wins || 0}</span>
                                                    <span className="record-sep"> - </span>
                                                    <span className="record-losses">{team.record?.losses || 0}</span>
                                                </div>
                                                <div className="last5-mobile">
                                                    {[0, 1, 2, 3, 4].map(i => (
                                                        <span 
                                                            key={i} 
                                                            className={`last5-box ${last5[i] ? last5[i].toLowerCase() : 'none'}`}
                                                        >
                                                            {last5[i] || ''}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="standings-legend">
                            <div className="legend-item">
                                <span className="legend-dot top3"></span>
                                <span>Top 3</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot playoffs"></span>
                                <span>Playoff Seeds</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!currentLeagueData && (
                <div className="standings-no-data">
                    <p>No standings data available for {selectedLeague.toUpperCase()} yet.</p>
                    <p className="no-data-hint">Standings will appear once matches are completed.</p>
                </div>
            )}
        </div>
    );
}
