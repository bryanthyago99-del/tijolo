export async function onRequestPost(context){
  const {request, env} = context;
  const {pergunta} = await request.json();
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{"Authorization":`Bearer ${env.GROQ_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"llama-3.1-8b-instant",
      messages:[{role:"system",content:"Você é IA do Tijolo Craft. Responda sobre Minecraft em 3 linhas, BR, direto."},{role:"user",content:pergunta}],
      max_tokens:150
    })
  });
  const data = await res.json();
  return new Response(JSON.stringify({resposta:data.choices[0].message.content}),{headers:{'Content-Type':'application/json'}});
}
