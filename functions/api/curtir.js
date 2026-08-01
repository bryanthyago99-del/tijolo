export async function onRequestPost(context) {
  const { request, env } = context;
  const DB = env.DB;
  
  try {
    const { id } = await request.json();
    
    if (!id) {
      return new Response(JSON.stringify({erro: "ID obrigatório"}), {status: 400});
    }

    await DB.prepare("UPDATE comentarios SET curtidas = curtidas + 1 WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({sucesso: true}));
  } catch(e) {
    return new Response(JSON.stringify({erro: e.message}), {status: 500});
  }
}
