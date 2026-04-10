import './styles/playerStatusStyle.css'
import '../Schedule/styles/scheduleStyle.css'

import { useEffect } from "react";
import { EventDetails, GameMetadata, Record, Result, ScheduleEvent } from "../types/baseTypes";

type Props = {
    gameMetadata?: GameMetadata,
    eventDetails: EventDetails,
    matchState: string,
    records?: Record[],
    results?: Result[],
    scheduleEvent: ScheduleEvent,
}

export function MatchDetails({ gameMetadata, eventDetails, matchState, records, results, scheduleEvent }: Props) {

    useEffect(() => {

    }, []);

    let blueTeam = eventDetails.match.teams[0];
    let redTeam = eventDetails.match.teams[1];

    const auxBlueTeam = blueTeam

    if (gameMetadata?.blueTeamMetadata?.participantMetadata?.[0]?.summonerName) {
        const summonerName = gameMetadata.blueTeamMetadata.participantMetadata[0].summonerName.split(" ");

        if (redTeam.code.startsWith(summonerName[0])) {
            blueTeam = redTeam;
            redTeam = auxBlueTeam;
        }
    }

    let matchResults = results || eventDetails.match.teams.map(team => team.result)

    return (
        <div className="match-details-container">
            <div className="status-live-game-card-content">
                {eventDetails ? (<h3>{eventDetails.league.name} - {scheduleEvent.blockName}  - Best of {eventDetails.match.strategy.count}</h3>) : null}
                <h3>{new Date(scheduleEvent.startTime).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</h3>
                <div className="live-game-stats-header">
                    <div className="live-game-stats-header-team-images">
                        <div className="team-card-wrapper">
                            {TeamCard({ eventDetails, index: 0, matchResults, record: records ? records[0] : undefined })}
                        </div>
                        <h1>
                            <div>Match {matchState}</div>
                            {matchResults ? (<div>{matchResults[0].gameWins}-{matchResults[1].gameWins}</div>) : null}
                            VS
                        </h1>
                        <div className="team-card-wrapper">
                            {TeamCard({ eventDetails, index: 1, matchResults, record: records ? records[1] : undefined })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type TeamCardProps = {
    eventDetails: EventDetails,
    index: number,
    matchResults?: Result[],
    record?: Record,
}

function TeamCard({ eventDetails, index, matchResults, record }: TeamCardProps) {
    return (
        <div className="live-game-card-team">
            <img className="live-game-card-team-image" src={eventDetails.match.teams[index].image}
                alt={eventDetails?.match.teams[index].name} />
            <span>
                <h4>
                    {eventDetails.match.teams[index].name}
                </h4>
            </span>
            <span className='outcome'>
                {matchResults ? (<p className={matchResults[index].outcome}>
                    {matchResults[index].outcome}
                </p>) : null}
            </span>
            {record ?
                (<span>
                    <p>
                        {record.wins} - {record.losses}
                    </p>
                </span>)
                : null}
        </div>
    )
}