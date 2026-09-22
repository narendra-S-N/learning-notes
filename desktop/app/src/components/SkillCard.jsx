import { useEffect, useState } from 'react'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'te', label: 'Telugu' },
  { code: 'ta', label: 'Tamil' },
]

export function SkillCard({ skill, onDelete, onEdit, onAddItem, onDeleteItem, onEditItem }) {
  const [isOpen, setIsOpen] = useState(true)
  const [sortOrder, setSortOrder] = useState('newest')
  const items = skill.items || []
  const sortedItems = [...items].sort((first, second) => {
    const firstNumber = Number(first.number) || 0
    const secondNumber = Number(second.number) || 0
    return sortOrder === 'newest' ? secondNumber - firstNumber : firstNumber - secondNumber
  })

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const question = form.elements.question.value.trim()
    const answer = form.elements.answer.value.trim()
    if (!question || !answer) return
    onAddItem(skill.id, { question, answer })
    form.reset()
  }

  return (
    <article className={`skill-card ${isOpen ? 'is-open' : ''}`}>
      <button className="skill-heading" type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen}>
        <span className="skill-symbol">{skill.name.slice(0, 1).toUpperCase()}</span>
        <span className="skill-name">{skill.name}</span>
        <span className="question-count">{items.length} {items.length === 1 ? 'question' : 'questions'}</span>
        <span className="chevron">⌄</span>
      </button>
      <div className="skill-actions">
        <label className="sort-control" onClick={(event) => event.stopPropagation()}>
          <span className="sr-only">Sort questions</span>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort questions">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
        <button type="button" className="icon-action" onClick={() => onEdit({ skillId: skill.id, name: skill.name })} aria-label="Edit skill" title="Edit skill">&#9998;</button>
        <button type="button" className="icon-action danger" onClick={() => onDelete(skill)} aria-label="Delete skill" title="Delete skill">&#128465;</button>
      </div>
      {isOpen && <div className="skill-content">
        <form className="qa-form" onSubmit={handleSubmit}>
          <label>Question<input name="question" placeholder="Enter a question..." required /></label>
          <label>Answer<textarea name="answer" placeholder="Enter the answer..." rows="4" required /></label>
          <button type="submit" aria-label="Add question and answer">+</button>
        </form>
        {sortedItems.map((item, index) => <QuestionAccordion key={item.id} item={item} number={item.number || (sortOrder === 'newest' ? items.length - index : index + 1)} skillId={skill.id} onEdit={onEdit} onDeleteItem={onDeleteItem} />)}
        {!items.length && <p className="no-questions">No questions yet. Add your first one below.</p>}
      </div>}
    </article>
  )
}

async function translateText(text, language) {
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${encodeURIComponent(text)}`)
  if (!response.ok) throw new Error('Translation failed')
  const data = await response.json()
  return data[0].map((part) => part[0]).join('')
}

function QuestionAccordion({ item, number, skillId, onEdit, onDeleteItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState('en')
  const [translated, setTranslated] = useState({ question: item.question, answer: item.answer })
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationError, setTranslationError] = useState(false)

  useEffect(() => {
    if (language === 'en') {
      setTranslated({ question: item.question, answer: item.answer })
      setTranslationError(false)
      return
    }

    let cancelled = false
    setIsTranslating(true)
    setTranslationError(false)
    Promise.all([translateText(item.question, language), translateText(item.answer, language)])
      .then(([question, answer]) => {
        if (!cancelled) setTranslated({ question, answer })
      })
      .catch(() => {
        if (!cancelled) {
          setTranslated({ question: item.question, answer: item.answer })
          setTranslationError(true)
        }
      })
      .finally(() => {
        if (!cancelled) setIsTranslating(false)
      })
    return () => { cancelled = true }
  }, [item.answer, item.question, language])

  return <div className={`qa-row ${isOpen ? 'is-open' : ''}`}>
    <div className="qa-question-line">
      <button className="qa-question" type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen}>
        <span>Q{number}</span><strong>{isTranslating ? 'Translating...' : translated.question}</strong><span className="qa-chevron">⌄</span>
      </button>
      <label className="question-language">
        <span className="sr-only">Translate question and answer</span>
        <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Translate question and answer">
          {languages.map(({ code, label }) => <option key={code} value={code}>{label}</option>)}
        </select>
      </label>
    </div>
    {isOpen && <div className="qa-details">
      <div className="qa-answer"><span>A</span><p>{isTranslating ? 'Translating...' : translated.answer}</p></div>
      {translationError && <p className="translation-error">Translation unavailable. Showing English.</p>}
      <div className="row-actions">
        <button type="button" className="icon-action" onClick={() => onEdit({ skillId, itemId: item.id, name: item.question, answer: item.answer, translations: item.translations })} aria-label="Edit question" title="Edit question">&#9998;</button>
        <button type="button" className="icon-action danger" onClick={() => onDeleteItem(skillId, item.id)} aria-label="Delete question" title="Delete question">&#128465;</button>
      </div>
    </div>}
  </div>
}
