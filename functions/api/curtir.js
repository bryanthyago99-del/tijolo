export async function onRequestPost(context) {
  const { request, env } = context;
  const { id } = await request.json();
  const comentario = await env.DB.get(`comentario:${id}`, 'json');
  comentario.curtidas = (comentario.curtidas || 0) + 1;
  await env.DB.put(`comentario:${id}`, JSON.stringify(comentario));
  return new Response(JSON.stringify({ok: true}));
}
