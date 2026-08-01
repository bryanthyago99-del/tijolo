export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();
  const comentario = {
    nome: body.nome,
    texto: body.texto,
    foto: body.foto || "",
    gif: body.gif || "",
    data: new Date().toISOString()
  };
  const id = Date.now();
  await env.DB.put(`comentario:${id}`, JSON.stringify(comentario));
  return new Response(JSON.stringify({ok: true}), {headers: {'Content-Type': 'application/json'}});
}
