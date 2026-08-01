export async function onRequest(context) {
  const { env } = context;
  const list = await env.DB.list({prefix: 'comentario:'});
  const comentarios = await Promise.all(list.keys.map(k => env.DB.get(k.name, 'json')));
  comentarios.reverse();
  return new Response(JSON.stringify(comentarios), {headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});
}
