export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get('type'); // 'short' ou null

  const CHANNEL_ID = 'UCtqAb6OTpfT-BRDgVp2aa3w';
  const YT_KEY = env.YOUTUBE_KEY; // você vai colocar no Cloudflare Pages > Settings > Variables

  if (!YT_KEY) {
    return new Response(JSON.stringify({ error: 'YOUTUBE_KEY não configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Base da API
    let apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YT_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12&type=video`;

    // Se for shorts, filtra por duração curta
    if (type === 'short') {
      apiUrl += '&videoDuration=short';
    }

    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error('Erro na API do YouTube: ' + res.status);
    }

    const data = await res.json();

    // Retorna no mesmo formato que seu index.html já espera
    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // cache de 5 min pra não estourar cota
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
