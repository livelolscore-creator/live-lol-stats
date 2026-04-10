import './styles/scheduleStyle.css'

import { getScheduleResponse } from "../../utils/LoLEsportsAPI";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";
import { Schedule, ScheduleEvent } from "../types/baseTypes";

interface EventsScheduleProps {
    mode?: 'matches' | 'results';
}

export function EventsSchedule({ mode = 'matches' }: EventsScheduleProps) {
    const [liveEvents, setLiveEvents] = useState<ScheduleEvent[]>([])
    const [last7DaysEvents, setlast7DaysEvents] = useState<ScheduleEvent[]>([])
    const [next7DaysEvents, setNext7DaysEvents] = useState<ScheduleEvent[]>([])

    useEffect(() => {
        getScheduleResponse().then(response => {
            let schedule: Schedule = response.data.data.schedule
            setLiveEvents(schedule.events.filter(filterLiveEvents))
            setlast7DaysEvents(schedule.events.filter(filterByLast7Days))
            setNext7DaysEvents(schedule.events.filter(filterByNext7Days))
        }).catch(error => console.error(error))
    }, [])

    useEffect(() => {
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        
        if (mode === 'results') {
            document.title = "LiveLoLScore — Results | Recent LoL Esports Match Results";
            if (metaDescription) metaDescription.setAttribute("content", "View recent League of Legends esports match results. See final scores from LCK, LEC, LCS, LPL and international tournaments.");
            if (metaKeywords) metaKeywords.setAttribute("content", "LoL results, League of Legends results, esports scores, LCK results, LEC results, LCS results, LPL results");
        } else {
            document.title = "LiveLoLScore — Live Esports Stats | LCK, LEC, LCS, LPL Schedule";
            if (metaDescription) metaDescription.setAttribute("content", "Track live League of Legends esports matches in real-time. View upcoming schedules, live match stats, and results for LCK, LEC, LCS, LPL and international tournaments.");
            if (metaKeywords) metaKeywords.setAttribute("content", "LoL schedule, League of Legends schedule, esports schedule, LCK schedule, LEC schedule, LCS schedule, LPL schedule, LoL live");
        }
    }, [mode]);

    if (mode === 'results') {
        return (
            <div className="orders-container">
                <EventCards emptyMessage="No recent matches" scheduleEvents={last7DaysEvents} title="Recent Results" clickable={true} sortDesc={true} />
            </div>
        );
    }

    return (
        <div className="orders-container">
            <EventCards emptyMessage="No live matches right now" scheduleEvents={liveEvents} title="Live Now" clickable={true} />

            {/* Ad slot between live and upcoming */}
            <div className="ad-banner-inline">Advertisement · 728×90</div>

            <EventCards emptyMessage="No upcoming matches this week" scheduleEvents={next7DaysEvents} title="Upcoming" clickable={true} />
        </div>
    );
}

type EventCardProps = {
    emptyMessage: string;
    scheduleEvents: ScheduleEvent[];
    title: string;
    clickable?: boolean;
    sortDesc?: boolean;
}

function EventCards({ emptyMessage, scheduleEvents, title, clickable = true, sortDesc = false }: EventCardProps) {
    if (scheduleEvents !== undefined && scheduleEvents.length !== 0) {
        return (
            <div>
                <h2 className="games-of-day">{title}</h2>
                <div className="games-list-container">
                    <div className="games-list-items">
                        {scheduleEvents.sort((a, b) => {
                            const timeA = new Date(a.startTime).getTime();
                            const timeB = new Date(b.startTime).getTime();
                            return sortDesc ? timeB - timeA : timeA - timeB || a.league.name.localeCompare(b.league.name);
                        }).map(scheduleEvent => {
                            return scheduleEvent.league.slug !== "tft_esports" ? (
                                <EventCard
                                    key={`${scheduleEvent.match.id}_${scheduleEvent.startTime}`}
                                    scheduleEvent={scheduleEvent}
                                    clickable={clickable}
                                />
                            ) : null
                        })}
                    </div>
                </div>
            </div>
        );
    } else {
        return <h2 className="games-of-day">{emptyMessage}</h2>;
    }
}

function filterLiveEvents(scheduleEvent: ScheduleEvent) {
    return scheduleEvent.match && (scheduleEvent.state === "inProgress" || (scheduleEvent.state === "unstarted" && ((scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[0].result.gameWins > 0 && !scheduleEvent.match.teams[0].result.outcome) || scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[1].result && scheduleEvent.match.teams[1].result.gameWins > 0 && !scheduleEvent.match.teams[1].result.outcome)) || (scheduleEvent.state === "completed" && ((scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[0].result.gameWins > 0 && !scheduleEvent.match.teams[0].result.outcome) || scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[1].result && scheduleEvent.match.teams[1].result.gameWins > 0 && !scheduleEvent.match.teams[1].result.outcome)));
}

function filterByLast7Days(scheduleEvent: ScheduleEvent) {
    if (scheduleEvent.state === "completed" || (scheduleEvent.match && (scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[0].result.outcome))) {
        let minDate = new Date(); let maxDate = new Date()
        minDate.setDate(minDate.getDate() - 7)
        maxDate.setHours(maxDate.getHours() - 1)
        let eventDate = new Date(scheduleEvent.startTime)
        if (eventDate.valueOf() > minDate.valueOf() && eventDate.valueOf() < maxDate.valueOf()) {
            if (scheduleEvent.match === undefined) return false
            if (scheduleEvent.match.id === undefined) return false
            return true;
        } else { return false; }
    } else { return false }
}

function filterByNext7Days(scheduleEvent: ScheduleEvent) {
    if (scheduleEvent.match && (scheduleEvent.state === "inProgress" || (scheduleEvent.state === "completed" && (scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[0].result.gameWins > 0) || (scheduleEvent.match.teams[1].result && scheduleEvent.match.teams[1].result.gameWins > 0)))) { return }
    let minDate = new Date(); let maxDate = new Date()
    minDate.setHours(minDate.getHours() - 1)
    maxDate.setDate(maxDate.getDate() + 7)
    let eventDate = new Date(scheduleEvent.startTime)
    if (eventDate.valueOf() > minDate.valueOf() && eventDate.valueOf() < maxDate.valueOf()) {
        if (scheduleEvent.match === undefined) return false
        if (scheduleEvent.match.id === undefined) return false
        return true;
    } else { return false; }
}
