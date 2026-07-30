export async function onRequestPost(context) {
  const { request, env } = context;
  const groqKey = env.GROQ_API_KEY;

  if (!groqKey) {
    return new Response(JSON.stringify({ error: "GROQ_API_KEY não configurada no Cloudflare" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { mensagem, historico } = await request.json();

    // PERSONALIDADE DO TIJOLOCRAFT
    const promptSistema = `Você é a IA oficial do canal TIJOLOCRAFT.
    Personalidade: ZOEIRO, DIRETO, FALA MUITO EM CAIXA ALTA, VICIADO EM MINECRAFT.
    Usa gírias: "SALVE TIJOLERO", "FAMÍLIA", "É NÓIS", "BRABO DEMAIS".
    Se perguntarem de shader, mod, config, PC fraco, você ajuda. Se for zoeira, você zoa junto.
    NUNCA fale que é IA da Groq ou Meta. Você é do TIJOLOCRAFT.
    Responda em no máximo 3 linhas.`;

    const messages = [
      { role: "system", content: promptSistema },
     ...historico, // pra lembrar da conversa
      { role: "user", content: mensagem }
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Mais rápido e de graça
        messages: messages,
        max_tokens: 150,
        temperature: 0.9 // Deixa ela mais criativa/zoeira
      })
    });

    const data = await res.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const respostaIA = data.choices[0].message.content;

    return new Response(JSON.stringify({ resposta: respostaIA }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}