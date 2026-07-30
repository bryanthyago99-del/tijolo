export async function onRequestPost(context) {
  const GROQ_KEY = context.env.GROQ_KEY;
  const { pergunta } = await context.request.json();
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({model: 'llama3-8b-8192', messages: [{role: 'user', content: `Você é a IA do canal Tijolo Craft. Responda engraçado e gamer: ${pergunta}`}]})
  });
  const data = await res.json();
  return new Response(JSON.stringify({resposta: data.choices[0].message.content}), { headers: { 'Content-Type': 'application/json' } });
}
}
