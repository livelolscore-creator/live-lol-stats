const axios = require('axios');

// Try a sample event ID for April 30th
axios.get('https://esports-api.lolesports.com/persisted/gw/getEventDetails', {
  params: { hl: 'en-US', id: '107373692326358770' },
  headers: { 'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' }
}).then(r => {
  const event = r.data?.data?.event;
  if (event) {
    console.log('Event date:', event.startTime);
    console.log('State:', event.state);
    console.log('Teams:', event.match?.teams?.map(t => t.code));
  } else {
    console.log('No event data returned');
    console.log('Response:', JSON.stringify(r.data).slice(0, 200));
  }
}).catch(e => console.error('Error:', e.message))