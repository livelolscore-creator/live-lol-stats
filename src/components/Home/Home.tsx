import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/homeStyle.css'
import { getScheduleResponse, getMatchDetailsResponse, getWindowResponse, getLeaguesResponse } from "../../utils/LoLEsportsAPI";
import { Schedule, ScheduleEvent, Window, WindowFrame } from "../types/baseTypes";

interface StandingTeam {
    code: string;
    name: string;
    image: string;
    record: { wins: number; losses: number };
}

const LEAGUES = ["lck", "lec", "lcs", "lpl", "lcp"];
const START_DATE = "2026-03-15";

export function Home() {
    const [liveEvents, setLiveEvents] = useState<ScheduleEvent[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<ScheduleEvent[]>([]);
    const [recentResults, setRecentResults] = useState<ScheduleEvent[]>([]);
    const [windowDataMap, setWindowDataMap] = useState<Record<string, Window>>({});
    const [gameTimeMap, setGameTimeMap] = useState<Record<string, string>>({});
    const [countdownMap, setCountdownMap] = useState<Record<string, string>>({});
    const [liveKillsMap, setLiveKillsMap] = useState<Record<string, {blue: number, red: number}>>({});
    const [standingsData, setStandingsData] = useState<Record<string, StandingTeam[]>>({});

    useEffect(() => {
        getScheduleResponse().then(response => {
            const schedule: Schedule = response.data.data.schedule;
            
            const live = schedule.events.filter(e => {
                return e.match && (
                    e.state === "inProgress" || 
                    (e.state === "unstarted" && (
                        (e.match.teams[0].result && e.match.teams[0].result.gameWins > 0 && !e.match.teams[0].result.outcome) ||
                        (e.match.teams[1].result && e.match.teams[1].result.gameWins > 0 && !e.match.teams[1].result.outcome)
                    ))
                );
            }).sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
            
            const upcoming = schedule.events.filter(e => e.state === "unstarted" && e.match && new Date(e.startTime) > new Date()).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
            
            const liveSlice = live.slice(0, 3);
            const upcomingSlice = upcoming.slice(0, 3 - liveSlice.length);
            
            setLiveEvents(liveSlice);
            setUpcomingEvents(upcomingSlice);
            setRecentResults(schedule.events.filter(e => e.state === "completed" && e.match).sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()).slice(0, 5));

            liveSlice.forEach(event => {
                if (event.match?.id) {
                    fetchLiveStats(event.match.id);
                }
            });
        }).catch(console.error);
    }, []);

    useEffect(() => {
        fetchStandingsData();
    }, []);

    useEffect(() => {
        const updateCountdowns = () => {
            const newCountdowns: Record<string, string> = {};
            upcomingEvents.forEach(event => {
                if (event.match?.id && event.startTime) {
                    const matchTime = new Date(event.startTime).getTime();
                    const now = Date.now();
                    const diff = matchTime - now;
                    
                    if (diff > 0) {
                        const hours = Math.floor(diff / (1000 * 60 * 60));
                        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                        newCountdowns[event.match.id] = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    } else {
                        newCountdowns[event.match.id] = "LIVE";
                    }
                }
            });
            setCountdownMap(newCountdowns);
        };
        
        updateCountdowns();
        const interval = setInterval(updateCountdowns, 1000);
        return () => clearInterval(interval);
    }, [upcomingEvents]);

    const fetchStandingsData = async () => {
        try {
            const leaguesResponse = await getLeaguesResponse();
            const leaguesData = leaguesResponse?.data?.data?.leagues || [];
            
            const leagueIdMap: Record<string, string> = {};
            for (const league of leaguesData) {
                const slug = league.slug?.toLowerCase();
                if (slug && LEAGUES.includes(slug)) {
                    leagueIdMap[slug] = league.id;
                }
            }
            
            const schedulePromises = Object.values(leagueIdMap).map(id => getScheduleResponse(undefined, id));
            const scheduleResponses = await Promise.all(schedulePromises);
            
            const standingsResult: Record<string, Record<string, StandingTeam>> = {};
            const startDate = new Date(START_DATE);
            
            let allEvents: any[] = [];
            for (const response of scheduleResponses) {
                const schedule = response?.data?.data?.schedule;
                if (schedule?.events) {
                    allEvents = [...allEvents, ...schedule.events];
                }
            }
            
            if (allEvents.length > 0) {
                const sortedEvents = allEvents.sort(
                    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
                );
                
                const filteredEvents = sortedEvents.filter(e => new Date(e.startTime) >= startDate);
                const recentEvents = filteredEvents;
                
                for (const event of recentEvents) {
                    const leagueSlug = event.league.slug?.toLowerCase();
                    if (!leagueSlug || !LEAGUES.includes(leagueSlug)) continue;
                    
                    if (!standingsResult[leagueSlug]) standingsResult[leagueSlug] = {};
                    
                    const isCompleted = event.state === 'completed';
                    
                    for (const team of event.match.teams) {
                        if (!standingsResult[leagueSlug][team.code]) {
                            standingsResult[leagueSlug][team.code] = {
                                code: team.code,
                                name: team.name,
                                image: team.image,
                                record: { wins: 0, losses: 0 }
                            };
                        }
                        
                        const currentTeam = standingsResult[leagueSlug][team.code];
                        if (!currentTeam.record) {
                            currentTeam.record = { wins: 0, losses: 0 };
                        }
                        
                        if (isCompleted) {
                            if (team.result?.outcome === 'win') {
                                currentTeam.record.wins++;
                            } else if (team.result?.outcome === 'loss') {
                                currentTeam.record.losses++;
                            }
                        }
                    }
                }
            }
            
            const finalStandings: Record<string, StandingTeam[]> = {};
            for (const [leagueSlug, teams] of Object.entries(standingsResult)) {
                finalStandings[leagueSlug] = Object.values(teams)
                    .filter(t => t.record.wins > 0 || t.record.losses > 0)
                    .sort((a, b) => {
                        const aWins = a.record?.wins || 0;
                        const bWins = b.record?.wins || 0;
                        if (bWins !== aWins) return bWins - aWins;
                        const aLosses = a.record?.losses || 0;
                        const bLosses = b.record?.losses || 0;
                        return aLosses - bLosses;
                    })
                    .slice(0, 4);
            }
            
            setStandingsData(finalStandings);
        } catch (err) {
            console.error("Failed to fetch standings:", err);
        }
    };

    const fetchLiveStats = (matchId: string) => {
        getMatchDetailsResponse(matchId).then(response => {
            const games = response.data.data.event.match.games;
            const inProgressGame = games.find((g: any) => g.state === "inProgress");
            if (inProgressGame) {
                getWindowResponse(inProgressGame.id).then(windowRes => {
                    if (windowRes?.data?.frames && windowRes.data.frames.length > 0) {
                        const frames = windowRes.data.frames;
                        const firstFrame = frames[0];
                        const firstTimestamp = new Date(firstFrame.rfc460Timestamp).getTime();
                        
                        const interval = setInterval(() => {
                            const latestFrame = frames[frames.length - 1];
                            if (latestFrame?.gameState === "in_game") {
                                const elapsedMs = Date.now() - firstTimestamp;
                                const minutes = Math.floor(elapsedMs / 60000);
                                const seconds = Math.floor((elapsedMs % 60000) / 1000);
                                setGameTimeMap(prev => ({ ...prev, [matchId]: `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` }));
                                setLiveKillsMap(prev => ({ ...prev, [matchId]: {
                                    blue: latestFrame.blueTeam.totalKills,
                                    red: latestFrame.redTeam.totalKills
                                }}));
                            } else if (latestFrame?.gameState === "finished") {
                                setGameTimeMap(prev => ({ ...prev, [matchId]: "GAME ENDED" }));
                            }
                        }, 1000);
                        
                        return () => clearInterval(interval);
                    }
                }).catch(console.error);
            }
        }).catch(console.error);
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="live-matches-grid">
                    {liveEvents.map((event, index) => (
                            <Link key={`live-${index}`} to={`/live/${event.match.id}`} className="hero-link">
                            <div className="hero-live">
                                <div className="hero-badge">
                                    <span className="live-dot" />
                                    LIVE NOW
                                </div>
                                <div className="hero-match">
                                    <span className="hero-league">{event.league.name}</span>
                                    <div className="hero-teams">
                                        <div className="hero-team">
                                            <img src={event.match.teams[0]?.image} alt={event.match.teams[0]?.name} />
                                            <span>{event.match.teams[0]?.code}</span>
                                        </div>
                                        <div className="hero-score">
                                            <span>{event.match.teams[0]?.result?.gameWins || 0}</span>
                                            <span className="vs">:</span>
                                            <span>{event.match.teams[1]?.result?.gameWins || 0}</span>
                                        </div>
                                        <div className="hero-team">
                                            <img src={event.match.teams[1]?.image} alt={event.match.teams[1]?.name} />
                                            <span>{event.match.teams[1]?.code}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {upcomingEvents.map((event, index) => (
                        event.match && (
                            <Link key={`upcoming-${index}`} to={`/live/${event.match.id}/game-index/1`} className="hero-link">
                                <div className="hero-upcoming">
                                    <span className="hero-label">UPCOMING</span>
                                    <div className="hero-match">
                                        <span className="hero-league">{event.league.name}</span>
                                        <div className="hero-teams">
                                            <div className="hero-team">
                                                <img src={event.match.teams[0].image} alt={event.match.teams[0].name} />
                                                <span>{event.match.teams[0].code}</span>
                                            </div>
                                            <div className="hero-vs">VS</div>
                                            <div className="hero-team">
                                                <img src={event.match.teams[1].image} alt={event.match.teams[1].name} />
                                                <span>{event.match.teams[1].code}</span>
                                            </div>
                                        </div>
                                        <div className="hero-countdown">{countdownMap[event.match.id] || "00:00:00"}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    ))}
                </div>
                {liveEvents.length === 0 && upcomingEvents.length === 0 && (
                    <div className="hero-empty">
                        <span>No live matches</span>
                        <span className="hero-sub">Check back soon for upcoming games</span>
                    </div>
                )}
            </section>

            <section className="results-section">
                <div className="results-column">
                    <h2 className="section-title">Recent Results</h2>
                    <div className="results-list">
                        {recentResults.map((event, i) => (
                            <Link key={i} to={`/live/${event.match.id}/game-index/${event.match.strategy.count}`} className="result-item-link">
                                <div className="result-item">
                                    <span className="result-league">{event.league.name}</span>
                                    <div className="result-teams">
                                        <div className="result-team">
                                            <img src={event.match.teams[0].image} alt={event.match.teams[0].name} />
                                            <span className={event.match.teams[0].result?.outcome === "win" ? "winner" : ""}>
                                                {event.match.teams[0].code}
                                            </span>
                                        </div>
                                        <span className="result-score">
                                            {event.match.teams[0].result?.gameWins} - {event.match.teams[1].result?.gameWins}
                                        </span>
                                        <div className="result-team">
                                            <span className={event.match.teams[1].result?.outcome === "win" ? "winner" : ""}>
                                                {event.match.teams[1].code}
                                            </span>
                                            <img src={event.match.teams[1].image} alt={event.match.teams[1].name} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="meta-column">
                    <h2 className="section-title">Play of the Day</h2>
                    <div className="power-player-card">
                        <div className="power-player-avatar">
                            <span className="crown-icon">👑</span>
                        </div>
                        <div className="power-player-info">
                            <span className="power-player-name">ShowMaker</span>
                            <span className="power-player-team">Position - MID</span>
                        </div>
                        <div className="power-player-stats">
                            <span className="power-stat">
                                <span className="stat-label">Pick</span>
                                <span className="stat-value">Over 6.5 Kills</span>
                            </span>
                            <span className="power-stat">
                                <span className="stat-label">Match</span>
                                <span className="stat-value">DK VS KT</span>
                            </span>
                        </div>
                        <span className="power-badge">Play of the Day</span>
                    </div>
                </div>
            </section>

            <section className="meta-section">
                <div className="meta-column">
                    <h2 className="section-title">Top 5 Meta Champions</h2>
                    <div className="meta-list">
                        {["Ahri", "Zeri", "Jinx", "Orianna", "Vi"].map((champ, i) => (
                            <div key={champ} className="meta-item">
                                <span className="meta-rank">{i + 1}</span>
                                <div className="meta-champ-icon">
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champ}.png`} alt={champ} />
                                </div>
                                <span className="meta-champ-name">{champ}</span>
                                <span className="meta-presence">{95 - i * 8}% P/B</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="standings-column">
                    <h2 className="section-title">Quick Standings</h2>
                    <div className="standings-grid">
                        {Object.keys(standingsData).length > 0 ? (
                            <>
                                {["lck", "lpl", "lec", "lcs"].map(leagueId => (
                                    standingsData[leagueId] ? (
                                        <div key={leagueId} className="standing-block">
                                            <h3 className="standing-league">{leagueId.toUpperCase()}</h3>
                                            {standingsData[leagueId].slice(0, 4).map((team, i) => (
                                                <div key={team.code} className="standing-row">
                                                    <span className="standing-pos">{i + 1}</span>
                                                    <span className="standing-team">{team.code}</span>
                                                    <span className="standing-record">{team.record.wins}-{team.record.losses}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null
                                ))}
                            </>
                        ) : (
                            <>
                                {[
                                    { league: "LCK", teams: [{code: "T1", record: "8-1"}, {code: "Gen.G", record: "7-2"}, {code: "DK", record: "6-3"}, {code: "KT", record: "5-4"}] },
                                    { league: "LPL", teams: [{code: "BLG", record: "7-1"}, {code: "JDG", record: "6-2"}, {code: "WBG", record: "5-3"}, {code: "LNG", record: "4-3"}] },
                                    { league: "LEC", teams: [{code: "G2", record: "8-0"}, {code: "FNC", record: "6-2"}, {code: "MDK", record: "5-3"}, {code: "SK", record: "4-4"}] },
                                    { league: "LCS", teams: [{code: "TL", record: "7-1"}, {code: "C9", record: "6-2"}, {code: "100T", record: "5-3"}, {code: "NRG", record: "4-4"}] },
                                ].map(league => (
                                    <div key={league.league} className="standing-block">
                                        <h3 className="standing-league">{league.league}</h3>
                                        {league.teams.map((team, i) => (
                                            <div key={team.code} className="standing-row">
                                                <span className="standing-pos">{i + 1}</span>
                                                <span className="standing-team">{team.code}</span>
                                                <span className="standing-record">{team.record}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
