import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {ThemeProvider} from "./theme/ThemeContext"

// @ts-ignore - Speed Insights requires React 18+ but works with React 17
const { SpeedInsights } = require('@vercel/speed-insights/dist/react/index.js');

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
            <SpeedInsights />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
