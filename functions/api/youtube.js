export async function onRequestGet(context) {
  const { env } = context;
  
  const channelID = "UCtqAb6OTpfT-BRDgVp2aa3w";
  const apiKey = env.YT_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API Key não configurada" }), { status: 500 });
  }

  try {
    // PEGANDO 12 VÍDEOS AGORA
    const videosURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet&order=date&maxResults=12&type=video`;
    
    const liveURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&eventType=live&type=video&key=${apiKey}`;

    const [videosRes, liveRes] = await Promise.all([fetch(videosURL), fetch(liveURL)]);
    
    const videosData = await videosRes.json();
    const liveData = await liveRes.json();

    return new Response(JSON.stringify({
      videos: videosData,
      live: liveData
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}