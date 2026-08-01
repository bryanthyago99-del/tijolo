export async function onRequest(context) {
  const { env } = context;

  // Servidores REAIS que já existem - BR e Global
  const servidores = [
    {
      nome: "MineBR.net - Survival",
      ip: "minebr.net",
      porta: 25565,
      versao: "1.8 - 1.21"
    },
    {
      nome: "Craftlandia - RPG",
      ip: "craftlandia.com.br", 
      porta: 25565,
      versao: "1.7 - 1.20"
    },
    {
      nome: "GothamCraft - PvP",
      ip: "gothamcraft.com.br",
      porta: 25565,
      versao: "1.8 - 1.21"
    },
    {
      nome: "Hypixel - MiniGames",
      ip: "mc.hypixel.net",
      porta: 25565,
      versao: "1.8 - 1.21"
    }
  ];

  // Faz ping em todos ao mesmo tempo
  const servidoresComStatus = await Promise.all(
    servidores.map(async (serv) => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/2/${serv.ip}:${serv.porta}`, {
          signal: AbortSignal.timeout(4000)
        });
        const data = await res.json();

        if (data.online) {
          return {
            ...serv,
            online: data.players.online || 0,
            max: data.players.max || 1000
          };
        } else {
          return {
            ...serv,
            online: -1,
            max: 1000
          };
        }
      } catch (e) {
        return {
          ...serv,
          online: -1,
          max: 1000
        };
      }
    })
  );

  return new Response(JSON.stringify({ servidores: servidoresComStatus }), {
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=45' // atualiza a cada 45s
    }
  });
}
