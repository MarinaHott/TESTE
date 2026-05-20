import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { parseMessages, filterMessages, formatForGemini } from './utils/parseWhatsApp'
import { summarize } from './utils/gemini'

const FILTERS = [
  { value: 'all', label: 'Todas as mensagens' },
  { value: 'since-last', label: 'Desde minha última mensagem' },
  { value: 'last-24h', label: 'Últimas 24 horas' },
  { value: 'last-7d', label: 'Últimos 7 dias' },
]

function SettingsScreen({ onSave }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_key') || '')
  const [userName, setUserName] = useState(() => localStorage.getItem('user_name') || '')

  function handleSave(e) {
    e.preventDefault()
    localStorage.setItem('gemini_key', apiKey.trim())
    localStorage.setItem('user_name', userName.trim())
    onSave()
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.logo}>💬</span>
        <h1 className={styles.title}>WA Summarizer</h1>
        <p className={styles.subtitle}>Configure sua conta para começar</p>
      </div>

      <form className={styles.form} onSubmit={handleSave}>
        <div className={styles.field}>
          <label className={styles.label}>Gemini API Key</label>
          <input
            className={styles.input}
            type="password"
            placeholder="AIza..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
          <span className={styles.hint}>
            Obtenha em{' '}
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">
              Google AI Studio
            </a>
          </span>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Seu nome no grupo</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Como aparece no WhatsApp"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <span className={styles.hint}>Usado para o filtro &quot;desde minha última mensagem&quot;</span>
        </div>

        <button className={styles.btnPrimary} type="submit">
          Salvar e continuar
        </button>
      </form>
    </div>
  )
}

function MainScreen({ onSettings }) {
  const [file, setFile] = useState(null)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [msgCount, setMsgCount] = useState(null)

  async function handleSummarize() {
    if (!file) return
    setError('')
    setResult('')
    setLoading(true)
    setMsgCount(null)

    try {
      const text = await file.text()
      const apiKey = localStorage.getItem('gemini_key')
      const userName = localStorage.getItem('user_name') || ''

      const messages = parseMessages(text)
      const filtered = filterMessages(messages, filter, userName)

      if (filtered.length === 0) {
        setError('Nenhuma mensagem encontrada para o filtro selecionado.')
        setLoading(false)
        return
      }

      setMsgCount(filtered.length)
      const conversation = formatForGemini(filtered)
      const summary = await summarize(apiKey, conversation)
      setResult(summary)
    } catch (err) {
      setError(err.message || 'Erro ao processar.')
    } finally {
      setLoading(false)
    }
  }

  function renderResult(text) {
    return text.split('\n').map((line, i) => {
      if (/^\*\*(.+)\*\*$/.test(line)) {
        return <h3 key={i} className={styles.resultHeading}>{line.replace(/\*\*/g, '')}</h3>
      }
      if (/\*\*(.+?)\*\*/.test(line)) {
        const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        return <p key={i} className={styles.resultLine} dangerouslySetInnerHTML={{ __html: html }} />
      }
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <p key={i} className={styles.resultBullet}>{line}</p>
      }
      if (line.trim() === '') return <br key={i} />
      return <p key={i} className={styles.resultLine}>{line}</p>
    })
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.logoSmall}>💬</span>
          <span className={styles.topBarTitle}>WA Summarizer</span>
        </div>
        <button className={styles.btnIcon} onClick={onSettings} title="Configurações">⚙️</button>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <label className={styles.uploadArea}>
            <input
              type="file"
              accept=".txt"
              className={styles.fileInput}
              onChange={(e) => { setFile(e.target.files[0]); setResult(''); setError('') }}
            />
            <span className={styles.uploadIcon}>📄</span>
            <span className={styles.uploadText}>
              {file ? file.name : 'Selecionar arquivo .txt do WhatsApp'}
            </span>
            <span className={styles.uploadHint}>
              {file ? 'Toque para trocar o arquivo' : 'Exportar conversa → Sem mídia → .txt'}
            </span>
          </label>
        </div>

        <div className={styles.card}>
          <label className={styles.label}>Filtrar mensagens</label>
          <div className={styles.filterGroup}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={filter === f.value ? styles.filterActive : styles.filterBtn}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <button
          className={styles.btnPrimary}
          onClick={handleSummarize}
          disabled={!file || loading}
        >
          {loading
            ? <span className={styles.loadingRow}><span className={styles.spinner} /> Resumindo...</span>
            : '✨ Resumir conversa'}
        </button>

        {msgCount !== null && !error && (
          <p className={styles.msgCount}>{msgCount} mensagens analisadas</p>
        )}

        {error && <div className={styles.errorBox}>{error}</div>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <span>📋 Resumo</span>
              <button
                className={styles.copyBtn}
                onClick={() => navigator.clipboard?.writeText(result)}
              >
                Copiar
              </button>
            </div>
            <div className={styles.resultBody}>{renderResult(result)}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('main')

  useEffect(() => {
    const key = localStorage.getItem('gemini_key')
    const name = localStorage.getItem('user_name')
    if (!key || !name) setScreen('settings')
  }, [])

  if (screen === 'settings') {
    return <SettingsScreen onSave={() => setScreen('main')} />
  }
  return <MainScreen onSettings={() => setScreen('settings')} />
}
