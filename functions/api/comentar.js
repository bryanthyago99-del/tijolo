export async function onRequestPost(context) {
  const { request, env } = context;
  const DB = env.DB;
  
  try {
    const { nome, texto, foto, gif } = await request.json();
    
    if (!nome || !texto) {
      return new Response(JSON.stringify({erro: "Nome e texto obrigatório"}), {status: 400});
    }

    await DB.prepare("INSERT INTO comentarios (nome, texto, foto, gif) VALUES (?, ?, ?, ?)")
      .bind(nome, texto, foto || "", gif || "").run();

    return new Response(JSON.stringify({sucesso: true}));
  } catch(e) {
    return new Response(JSON.stringify({erro: e.message}), {status: 500});
  }
}
