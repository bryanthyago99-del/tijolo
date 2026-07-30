export async function onRequestPost({request, env}) {
  try {
    const {pergunta} = await request.json();
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${env.GROQ_KEY}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{role: "user", content: `Você é a IA do Tijolo Craft. Responda curto e engraçado: ${pergunta}`}]
      })
    });
    const data = await res.json();
    return new Response(JSON.stringify({resposta: data.choices[0].message.content}), {headers: {'Content-Type': 'application/json'}});
  } catch(e) {
    return new Response(JSON.stringify({resposta: "Erro: " + e.message}), {status: 500});
  }
}
