export async function onRequestPost(context) {
  const { request, env } = context;
  const { shader_id, nome, comentario } = await request.json();
  await env.DB.prepare(
    "INSERT INTO comentarios (shader_id, nome, comentario) VALUES (?, ?, ?)"
  ).bind(shader_id, nome, comentario).run();
  return Response.json({success: true});
}