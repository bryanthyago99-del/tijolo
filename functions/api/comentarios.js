export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const shader_id = url.searchParams.get("shader_id");
  const { results } = await env.DB.prepare(
    "SELECT * FROM comentarios WHERE shader_id = ? ORDER BY data DESC"
  ).bind(shader_id).all();
  return Response.json(results);
}