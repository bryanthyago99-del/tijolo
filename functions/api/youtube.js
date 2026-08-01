export async function onRequest(context){
  const {request, env} = context;
  const type = new URL(request.url).searchParams.get('type');
  const KEY = env.YT_API_KEY;
  let url = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&channelId=UCtqAb6OTpfT-BRDgVp2aa3w&part=snippet&order=date&maxResults=12&type=video`;
  if(type==='short') url += '&videoDuration=short';
  const res = await fetch(url);
  return new Response(await res.text(), {headers:{'Content-Type':'application/json'}});
}
