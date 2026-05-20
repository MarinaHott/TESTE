const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const SYSTEM_PROMPT = `Você é um assistente que resume conversas de grupos do WhatsApp em português brasileiro.
Analise a conversa e forneça um resumo estruturado com:
- **Resumo geral**: visão geral do que foi discutido
- **Pontos principais**: tópicos e assuntos abordados
- **Decisões tomadas**: conclusões ou acordos alcançados (se houver)
- **Próximos passos**: ações ou tarefas mencionadas (se houver)

Seja conciso, claro e objetivo. Use linguagem natural em português brasileiro.`;

export async function summarize(apiKey, conversationText) {
  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: SYSTEM_PROMPT + '\n\nConversa:\n' + conversationText },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Erro ${res.status}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sem resposta.';
}
