export async function onRequest(context) {
  const YT_API_KEY = context.env.YT_API_KEY;
  const CHANNEL_ID = 'UCtqAb6OTpfT-BRDgVp2aa3w';
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=6&type=video`;
  const res = await fetch(url);
  return new Response(await res.text(), { headers: { 'Content-Type': 'application/json' } });
}
