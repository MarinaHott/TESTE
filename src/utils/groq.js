const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

// Groq free tier: 12k TPM. Each chunk ~1.5k tokens in + ~500 out = ~2k per call.
// Wait 12s between chunks to safely stay under the per-minute limit.
const CHUNK_CHARS = 6000  // ~1500 tokens
const INTER_CHUNK_DELAY_MS = 12000

const SYSTEM_PROMPT = `Você é um assistente que resume conversas de grupos do WhatsApp em português brasileiro.

Para grupos de conteúdo (milhas, notícias, ofertas, links): destaque os tópicos principais e o que vale a pena ler ou acompanhar.
Para grupos pessoais (amigos, família, trabalho): destaque convites, combinados, datas marcadas e menções importantes.

Responda SEMPRE em bullet points curtos e diretos. Seja objetivo e conciso.`

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export async function summarize(apiKey, conversationText) {
  if (conversationText.length <= CHUNK_CHARS) {
    return callGroq(apiKey, buildPrompt(conversationText))
  }

  // Split into chunks with delay between calls
  const chunks = []
  for (let i = 0; i < conversationText.length; i += CHUNK_CHARS) {
    chunks.push(conversationText.slice(i, i + CHUNK_CHARS))
  }

  const partials = []
  for (let i = 0; i < chunks.length; i++) {
    if (i > 0) await sleep(INTER_CHUNK_DELAY_MS)
    const partial = await callGroq(apiKey, buildPrompt(chunks[i]))
    partials.push(partial)
  }

  if (partials.length === 1) return partials[0]

  await sleep(INTER_CHUNK_DELAY_MS)
  const consolidated = partials.map((p, i) => `Parte ${i + 1}:\n${p}`).join('\n\n')
  return callGroq(
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
