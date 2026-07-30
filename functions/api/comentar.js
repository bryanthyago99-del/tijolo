export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // 1. Testa se o DB existe
    if (!env.DB) {
      return new Response(JSON.stringify({erro: "DB não encontrado"}), {status: 500});
    }

    const body = await request.json();
    const { nome, texto } = body;

    // 2. Testa os dados
    if (!nome || !texto) {
      return new Response(JSON.stringify({erro: "Nome ou texto vazio"}), {status: 400});
    }

    // 3. Tenta inserir
    await env.DB.prepare("INSERT INTO comentarios (nome, texto) VALUES (?, ?)").bind(nome, texto).run();
    
    return new Response(JSON.stringify({ok: true}), {headers: {'Content-Type': 'application/json'}});

  } catch(e) {
    // 4. Se quebrar, me fala o erro exato
    return new Response(JSON.stringify({erro: e.message, stack: e.stack}), {
      status: 500,
      headers: {'Content-Type': 'application/json'}
    });
  }
}
