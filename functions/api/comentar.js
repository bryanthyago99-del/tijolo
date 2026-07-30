export async function onRequestPost({request, env}) {
  try {
    const {nome, texto} = await request.json();
    await env.DB.prepare("INSERT INTO comentarios (nome, texto) VALUES (?,?)").bind(nome, texto).run();
    return new Response(JSON.stringify({ok: true}), {headers: {'Content-Type': 'application/json'}});
  } catch(e) {
    return new Response(JSON.stringify({error: e.message}), {status: 500});
  }
}
