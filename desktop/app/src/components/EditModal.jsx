export function EditModal({ entry, onClose, onSave }) {
  if (!entry) return null

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const name = form.elements.name.value.trim()
    const answer = form.elements.answer?.value.trim() || ''
    if (name && (!entry.itemId || answer)) onSave({ name, answer })
  }

  return (
    <div className="modal is-visible" role="presentation">
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close edit dialog" />
      <form className="modal-card" onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="edit-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close edit dialog">&times;</button>
        <p className="eyebrow">Edit entry</p>
        <h2 id="edit-title">{entry.itemId ? 'Update question' : 'Update skill'}</h2>
        {!entry.itemId && <label className="modal-field">Skill name<input name="name" defaultValue={entry.name} autoFocus required /></label>}
        {entry.itemId && <>
          <label className="modal-field">Question<input name="name" defaultValue={entry.name} autoFocus required /></label>
          <label className="modal-field">Answer<textarea name="answer" defaultValue={entry.answer} rows="5" required /></label>
        </>}
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Save changes</button></div>
      </form>
    </div>
  )
}
