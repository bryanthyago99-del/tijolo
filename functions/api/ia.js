export async function onRequestPost(context) {
  const { request, env } = context;
  const GROQ_KEY = env.GROQ_KEY;

  if (!GROQ_KEY) {
    return new Response(JSON.stringify({ resposta: 'Erro: GROQ_KEY não configurada' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { pergunta } = await request.json();
    if (!pergunta) return new Response(JSON.stringify({ resposta: 'Me faça uma pergunta' }));

    // PROMPT CURTO pra gastar pouco token
    const system = "Você é IA do Tijolo Craft. Responda sobre Minecraft Bedrock/Java em 3 linhas max. Seja direto, use emoji, fale como BR.";

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // mais barato
        messages: [
          { role: "system", content: system },
          { role: "user", content: pergunta }
        ],
        max_tokens: 150, // limite duro pra não gastar
        temperature: 0.7
      })
    });

    const data = await res.json();
    const resposta = data.choices?.[0]?.message?.content || "Não consegui responder agora 😅";

    return new Response(JSON.stringify({ resposta }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ resposta: 'Erro na IA. Tenta de novo.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
