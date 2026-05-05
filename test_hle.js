const axios = require('axios');

// Fetch LCK games
axios.get('https://esports-api.lolesports.com/persisted/gw/getSchedule', {
  params: { hl: 'en-US', leagueId: '98781191266232' },
  headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' }
}).then(r => {
  const events = r.data?.data?.schedule?.events || [];
  const completed = events.filter(e => e.state === 'completed');
  
  console.log('Total LCK completed games:', completed.length);
  
  // Count HLE wins/losses
  let hleWins = 0;
  let hleLosses = 0;
  
  completed.forEach(e => {
    if (!e.match?.teams) return;
    e.match.teams.forEach(team => {
      if (team.code === 'HLE') {
        if (team.result?.outcome === 'win') hleWins++;
        else if (team.result?.outcome === 'loss') hleLosses++;
      }
    });
  });
  
  console.log('HLE record from API:', hleWins + '-' + hleLosses);
  console.log('Last 3 games:');
  completed.slice(-3).forEach(e => {
    const hle = e.match?.teams?.find(t => t.code === 'HLE');
    console.log(e.startTime?.split('T')[0], e.state, hle?.result?.outcome);
  });
}).catch(e => console.error('Error:', e.message))