export async function onRequest(context) {
  const servidores = [
    { ip: "stoness.minesrv.net", porta: 25589, nome: "StonesS Network", versao: "Java 1.21.11" },
    { ip: "nocthar.bed.net.br", porta: 25466, nome: "Nocthar", versao: "Bedrock All" },
    { ip: "play.hypixel.net", porta: 19132, nome: "Hypixel Bedrock", versao: "Bedrock" }
  ];

  const resultado = await Promise.all(servidores.map(async s => {
    try {
      const url = `https://api.mcsrvstat.us/2/${s.ip}:${s.porta}`;
      const res = await fetch(url);
      const data = await res.json();
      return {
        ...s,
        online: data.online ? data.players.online : -1,
        max: data.online ? data.players.max : 0
      };
    } catch {
      return { ...s, online: -1, max: 0 };
    }
  }));

  return new Response(JSON.stringify({ servidores: resultado }), {headers: {'Content-Type': 'application/json'}});
}
