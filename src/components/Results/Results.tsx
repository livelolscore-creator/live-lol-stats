import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles/resultsStyle.css'
import { getScheduleResponse, generateMatchSlug } from "../../utils/LoLEsportsAPI";
import { Schedule, ScheduleEvent } from "../types/baseTypes";

export function Results() {
    const [results, setResults] = useState<ScheduleEvent[]>([]);

    useEffect(() => {
        document.title = "LiveLoLScore — Results | Recent LoL Esports Match Results";
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaDescription) metaDescription.setAttribute("content", "View recent League of Legends esports match results. See final scores from LCK, LEC, LCS, LPL and international tournaments.");
        if (metaKeywords) metaKeywords.setAttribute("content", "LoL results, League of Legends results, esports scores, LCK results, LEC results, LCS results, LPL results");
        
        getScheduleResponse().then(response => {
            const schedule: Schedule = response.data.data.schedule;
            const completed = schedule.events
                .filter(e => e.state === "completed" && e.match)
                .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
            setResults(completed);
        }).catch(console.error);
    }, []);

    return (
        <div className="results-container">
            <h2 className="results-title">Match Results</h2>
            <div className="results-list">
                {results.map((event, index) => {
                    const matchSlug = generateMatchSlug(
                        event.match.teams[0].code,
                        event.match.teams[1].code,
                        new Date(event.startTime).toISOString()
                    );
                    return (
                    <Link key={index} to={`/live/${event.match.id}/${matchSlug}`} className="result-card-link">
                        <div className="result-card">
                            <div className="result-header">
                                <span className="result-league">{event.league.name}</span>
                                <span className="result-date">
                                    {new Date(event.startTime).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="result-match">
                                <div className="result-team">
                                    <img src={event.match.teams[0].image} alt={event.match.teams[0].name} />
                                    <span className={event.match.teams[0].result?.outcome === "win" ? "winner" : ""}>
                                        {event.match.teams[0].code}
                                    </span>
                                </div>
                                <div className="result-score">
                                    <span className={event.match.teams[0].result?.outcome === "win" ? "winner" : ""}>
                                        {event.match.teams[0].result?.gameWins}
                                    </span>
                                    <span className="score-sep">-</span>
                                    <span className={event.match.teams[1].result?.outcome === "win" ? "winner" : ""}>
                                        {event.match.teams[1].result?.gameWins}
                                    </span>
                                </div>
                                <div className="result-team">
                                    <img src={event.match.teams[1].image} alt={event.match.teams[1].name} />
                                    <span className={event.match.teams[1].result?.outcome === "win" ? "winner" : ""}>
                                        {event.match.teams[1].code}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    );
                })}
            </div>
        </div>
    );
}
