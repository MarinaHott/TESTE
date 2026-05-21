const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Você é um assistente que resume conversas de grupos do WhatsApp em português brasileiro.

Para grupos de conteúdo (milhas, notícias, ofertas, links): destaque os tópicos principais e o que vale a pena ler ou acompanhar.
Para grupos pessoais (amigos, família, trabalho): destaque convites, combinados, datas marcadas e menções importantes.

Responda SEMPRE em bullet points curtos e diretos. Seja objetivo e conciso.`

export async function summarize(apiKey, conversationText) {
  const estimated = Math.ceil(conversationText.length / 4)
  const CHUNK_TOKENS = 3000

  if (estimated <= CHUNK_TOKENS) {
    return await callGroq(apiKey, buildPrompt(conversationText))
  }

  // Split into chunks and summarize each, then consolidate
  const chunkSize = CHUNK_TOKENS * 4
  const chunks = []
  for (let i = 0; i < conversationText.length; i += chunkSize) {
    chunks.push(conversationText.slice(i, i + chunkSize))
  }

  const partials = []
  for (const chunk of chunks) {
    const partial = await callGroq(apiKey, buildPrompt(chunk))
    partials.push(partial)
  }

  if (partials.length === 1) return partials[0]

  const consolidated = partials.map((p, i) => `Parte ${i + 1}:\n${p}`).join('\n\n')
  return await callGroq(
    apiKey,
    `A seguir estão resumos parciais de uma conversa longa. Consolide em um único resumo final em bullet points curtos, eliminando repetições:\n\n${consolidated}`
  )
}

function buildPrompt(text) {
  return `Resuma a seguinte conversa de WhatsApp:\n\n${text}`
}

async function callGroq(apiKey, userMessage) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.4,
      max_tokens: 1024,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Erro ${res.status}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? 'Sem resposta.'
}
