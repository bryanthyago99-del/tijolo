export async function onRequest(context) {
  const db = context.env.DB;
  const { results } = await db.prepare("SELECT * FROM comentarios ORDER BY data DESC LIMIT 50").all();
  return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
}
