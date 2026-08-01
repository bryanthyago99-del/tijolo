export async function onRequest(context) {
  const { env } = context;
  const DB = env.DB;
  
  try {
    const { results } = await DB.prepare("SELECT * FROM comentarios ORDER BY id DESC LIMIT 50").all();
    return new Response(JSON.stringify(results), {headers: {'Content-Type': 'application/json'}});
  } catch(e) {
    return new Response(JSON.stringify({erro: e.message}), {status: 500});
  }
}
