const axios = require('axios');

axios.get('https://esports-api.lolesports.com/persisted/gw/getSchedule', {
  params: { hl: 'en-US' },
  headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' }
}).then(r => {
  const events = r.data?.data?.schedule?.events || [];
  console.log('Total events:', events.length);
  
  // Get event IDs from schedule
  const completed = events.filter(e => e.state === 'completed').slice(0, 3);
  console.log('\nSample completed events:');
  completed.forEach(e => {
    console.log('ID:', e.id, 'Date:', e.startTime?.split('T')[0], 'League:', e.league?.slug);
  });
  
  // Check if any April events exist
  const april = events.filter(e => e.startTime?.includes('2026-04-'));
  console.log('\nApril 2026 events:', april.length);
}).catch(e => console.error('Error:', e.message))
