import { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { EditModal } from './EditModal'
import { SkillCard } from './SkillCard'
import { SkillComposer } from './SkillComposer'

const skillsQuery = query(collection(db, 'skills'), orderBy('createdAt', 'desc'))

export function App() {
  const [skills, setSkills] = useState([])
  const [status, setStatus] = useState('Connecting to Firebase...')
  const [loadError, setLoadError] = useState(false)
  const [editEntry, setEditEntry] = useState(null)

  useEffect(() => onSnapshot(skillsQuery, (snapshot) => {
    setSkills(snapshot.docs.map((item) => ({ id: item.id, ...item.data(), items: item.data().items || [] })))
    setStatus('Synced with Firebase')
    setLoadError(false)
  }, () => {
    setStatus('Firebase connection failed')
    setLoadError(true)
  }), [])

  async function createSkill(name) {
    try { await addDoc(collection(db, 'skills'), { name, items: [], createdAt: serverTimestamp() }); setStatus('Saved to Firebase') } catch { setStatus('Could not save skill') }
  }

  async function deleteSkill(skill) {
    if (!window.confirm(`Delete the ${skill.name} skill and all its questions?`)) return
    try { await deleteDoc(doc(db, 'skills', skill.id)); setStatus('Saved to Firebase') } catch { setStatus('Could not delete skill') }
  }

  async function addItem(skillId, item) {
    const skill = skills.find((entry) => entry.id === skillId)
    const nextNumber = skill.items.reduce((highest, current) => Math.max(highest, Number(current.number) || 0), 0) + 1
    try { await updateDoc(doc(db, 'skills', skillId), { items: [...skill.items, { ...item, id: crypto.randomUUID(), number: nextNumber }] }); setStatus('Saved to Firebase') } catch { setStatus('Could not save question') }
  }

  async function deleteItem(skillId, itemId) {
    if (!window.confirm('Delete this question and answer?')) return
    const skill = skills.find((entry) => entry.id === skillId)
    try { await updateDoc(doc(db, 'skills', skillId), { items: skill.items.filter((item) => item.id !== itemId) }); setStatus('Saved to Firebase') } catch { setStatus('Could not delete question') }
  }

  async function saveEdit({ name, answer }) {
    const skill = skills.find((entry) => entry.id === editEntry.skillId)
    try {
      if (editEntry.itemId) await updateDoc(doc(db, 'skills', skill.id), { items: skill.items.map((item) => item.id === editEntry.itemId ? { ...item, question: name, answer } : item) })
      else await updateDoc(doc(db, 'skills', skill.id), { name })
      setEditEntry(null)
      setStatus('Saved to Firebase')
    } catch { setStatus('Could not save changes') }
  }

  return <main className="workspace">
    <header className="topbar"><div className="brand"><span className="brand-mark">Q</span><span>Knowledge vault</span></div><span className="save-status"><span className={`status-dot ${loadError ? 'error' : ''}`}></span>{status}</span></header>
    <section className="intro"><p className="eyebrow">Your study guide</p><h1>Build your <em>skill tree.</em></h1><p className="subheading">Capture what you know, one question at a time.</p></section>
    <SkillComposer onCreate={createSkill} disabled={loadError} />
    <section className="skills-area" aria-live="polite">{loadError ? <div className="empty-state"><p>Could not load your skills.</p><span>Check your Firestore setup and refresh.</span></div> : !skills.length ? <div className="empty-state"><span className="empty-icon">✦</span><p>Your questions will appear here</p><span>Enter a skill above to begin your collection.</span></div> : skills.map((skill) => <SkillCard key={skill.id} skill={skill} onDelete={deleteSkill} onEdit={setEditEntry} onAddItem={addItem} onDeleteItem={deleteItem} onEditItem={setEditEntry} />)}</section>
    <EditModal entry={editEntry} onClose={() => setEditEntry(null)} onSave={saveEdit} />
  </main>
}
