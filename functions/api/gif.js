export async function onRequest(context){
  const {request, env} = context;
  const q = new URL(request.url).searchParams.get('q');
  const KEY = env.GIPHY_KEY;
  const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=${q}&limit=10`);
  return new Response(await res.text(), {headers:{'Content-Type':'application/json'}});
}
