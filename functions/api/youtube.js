export async function onRequest(context) {
  const YT_API_KEY = context.env.YT_API_KEY;
  const CHANNEL_ID = 'UCtqAb6OTpfT-BRDgVp2aa3w';
  const urlParams = new URL(context.request.url).searchParams;
  const type = urlParams.get('type'); // pega ?type=short da URL

  let maxResults = 6;
  let query = '';
  
  // Se for shorts, busca mais e depois filtra
  if (type === 'short') {
    maxResults = 15; 
    query = '#shorts'; // força buscar shorts
  }

  const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${CHANNEL_ID}&q=${query}&part=snippet&order=date&maxResults=${maxResults}&type=video`;
  const res = await fetch(url);
  const data = await res.json();

  // Se pediu shorts, filtra só os que tem #shorts no titulo
  let items = data.items;
  if (type === 'short') {
    items = data.items.filter(v => 
      v.snippet.title.toLowerCase().includes('#shorts') || 
      v.snippet.description.toLowerCase().includes('#shorts')
    ).slice(0, 6); // pega só 6
  }

  return new Response(JSON.stringify({ items }), { 
    headers: { 'Content-Type': 'application/json' } 
  });
}
