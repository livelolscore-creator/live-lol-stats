const axios = require('axios');

axios.get('https://esports-api.lolesports.com/persisted/gw/getLeagues', {
  params: { hl: 'en-US' },
  headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' }
}).then(r => {
  const leagues = r.data?.data?.leagues || [];
  console.log('Total leagues:', leagues.length);
  
  // Find LCK league
  const lck = leagues.find(l => l.slug?.toLowerCase() === 'lck');
  if (lck) {
    console.log('\nLCK League:');
    console.log('ID:', lck.id);
    console.log('Name:', lck.name);
    console.log('Slug:', lck.slug);
    
    // Check if it has standings data
    if (lck.standings) {
      console.log('\nLCK Standings (from leagues):');
      lck.standings.forEach(s => {
        if (s.team?.code === 'HLE') {
          console.log('HLE:', s.wins + '-' + s.losses);
        }
      });
    }
  }
}).catch(e => console.error('Error:', e.message))