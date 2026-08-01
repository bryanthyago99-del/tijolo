export async function onRequest(context) {
  const servidores = [
    { ip: "play.hypixel.net", porta: 19132, nome: "Hypixel Bedrock" },
    { ip: "mcoasis.net", porta: 19132, nome: "MC Oasis" },
    { ip: "nethergames.org", porta: 19132, nome: "NetherGames" }
  ];
  const resultado = servidores.map(s => ({...s, online: Math.floor(Math.random() * 200), max: 5000}));
  return new Response(JSON.stringify({ servidores: resultado }), {headers: {'Content-Type': 'application/json'}});
}
