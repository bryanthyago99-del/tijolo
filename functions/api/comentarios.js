export async function onRequest({env}) {
  try {
    const { results } = await env.DB.prepare("SELECT * FROM comentarios ORDER BY id DESC LIMIT 20").all();
    return new Response(JSON.stringify(results), {headers: {'Content-Type': 'application/json'}});
  } catch(e) {
    return new Response(JSON.stringify({error: e.message}), {status: 500});
  }
}
