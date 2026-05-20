// Parses Brazilian WhatsApp export format: [DD/MM/AAAA, HH:MM:SS] Nome: mensagem
const MSG_REGEX = /^\[(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\] ([^:]+): (.*)$/;

function cleanLine(line) {
  // Remove U+200E (LRM) and other invisible marks WhatsApp adds before timestamps
  return line.replace(/[‎‏﻿‪-‮]/g, '');
}

export function parseMessages(text) {
  const lines = text.replace(/\r/g, '').split('\n');
  const messages = [];

  for (const rawLine of lines) {
    const line = cleanLine(rawLine);
    const match = line.match(MSG_REGEX);
    if (match) {
      const [, date, time, sender, content] = match;
      const [day, month, year] = date.split('/').map(Number);
      const [hour, min, sec] = time.split(':').map(Number);
      messages.push({
        date: new Date(year, month - 1, day, hour, min, sec),
        sender: sender.trim(),
        content: content.trim(),
      });
    } else if (messages.length > 0 && line.trim()) {
      // multiline continuation
      messages[messages.length - 1].content += '\n' + line.trim();
    }
  }

  return messages;
}

export function filterMessages(messages, filter, userName) {
  if (!messages.length) return messages;

  if (filter === 'since-last') {
    const myName = userName.trim().toLowerCase();
    let lastIdx = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender.toLowerCase() === myName) {
        lastIdx = i;
        break;
      }
    }
    return lastIdx === -1 ? messages : messages.slice(lastIdx + 1);
  }

  const now = new Date();
  if (filter === 'last-24h') {
    const cutoff = new Date(now - 24 * 60 * 60 * 1000);
    return messages.filter((m) => m.date >= cutoff);
  }

  if (filter === 'last-7d') {
    const cutoff = new Date(now - 7 * 24 * 60 * 60 * 1000);
    return messages.filter((m) => m.date >= cutoff);
  }

  return messages;
}

export function formatForGemini(messages) {
  return messages
    .map((m) => `${m.sender}: ${m.content}`)
    .join('\n');
}
