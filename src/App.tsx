import './styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css';

import {Match} from "./components/Match/Match";
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import {Footer} from "./components/Footer/Footer";
import {EventsSchedule} from "./components/Schedule/EventsSchedule";
import {Home} from "./components/Home/Home";
import {Standings} from "./components/Standings/Standings";
import {News} from "./components/News/News";
import {Privacy} from "./components/Privacy/Privacy";
import {GearReviews} from "./components/GearReviews/GearReviews";
import {League} from "./components/League/League";
import {Team} from "./components/Team/Team";
import {Navbar} from "./components/Navbar/Navbar";
import { useTheme } from './theme/ThemeContext'
import React from "react";
// @ts-ignore - Using direct import due to webpack 4 limitations in CRA
const { Analytics } = require('@vercel/analytics/dist/react/index.js');

function App() {
    const { theme } = useTheme();

    return (
        <HashRouter basename="/">
            <div className="theme-container" style={{...theme as React.CSSProperties}}>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/matches/" component={() => <EventsSchedule mode="matches" />}/>
                        <Route path="/results/" component={() => <EventsSchedule mode="results" />}/>
                        <Route path="/standings/" component={Standings}/>
                        <Route path="/news/" component={News}/>
                        <Route path="/privacy/" component={Privacy}/>
                        <Route path="/gear/" component={GearReviews}/>
                        <Route path="/league/:league" component={League}/>
                        <Route path="/team/:team" component={Team}/>
                        <Route path="/live/:gameid/:slug?" component={Match}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
                <Footer/>
            </div>
            <Analytics />
        </HashRouter>
    );
}

export default App;
