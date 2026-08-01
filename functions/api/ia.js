export async function onRequestPost(context) {
  const { request, env } = context;
  const GROQ_KEY = env.GROQ_KEY;

  try {
    const { pergunta } = await request.json(); // <-- ESSA LINHA TAVA FALTANDO
    if (!pergunta) return new Response(JSON.stringify({resposta: 'Me faça uma pergunta'})), {headers: {'Content-Type': 'application/json'}}

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{role: "system", content: "Você é IA do Tijolo Craft. Responda sobre Minecraft em 3 linhas max. Seja direto e BR."},
                   {role: "user", content: pergunta}],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const dados = await res.json();
    return new Response(JSON.stringify({resposta: dados.choices[0].message.content}), {headers: {'Content-Type': 'application/json'}});

  } catch (e) {
    return new Response(JSON.stringify({resposta: "Erro: " + e.message}), {status: 500, headers: {'Content-Type': 'application/json'}});
  }
}
