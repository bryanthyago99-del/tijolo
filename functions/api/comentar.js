export async function onRequestPost(context) {
  const db = context.env.DB;
  const { nome, texto } = await context.request.json();
  await db.prepare("INSERT INTO comentarios (nome, texto) VALUES (?,?)").bind(nome, texto).run();
  return new Response(JSON.stringify({ok: true}), { headers: { 'Content-Type': 'application/json' } });
}
