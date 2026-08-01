export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  if (!query) return new Response(JSON.stringify({data: []}), {headers: {'Content-Type': 'application/json'}});

  const GIPHY_API_KEY = env.GIPHY_KEY; // <- Segredo no Cloudflare

  try {
    const giphyRes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=8&rating=g`);
    const data = await giphyRes.json();
    return new Response(JSON.stringify(data), {headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});
  } catch (e) {
    return new Response(JSON.stringify({data: [], error: e.message}), {headers: {'Content-Type': 'application/json'}});
  }
}
