export function SkillComposer({ onCreate, disabled }) {
  function handleSubmit(event) {
    event.preventDefault()
    const input = event.currentTarget.elements.skill
    const name = input.value.trim()
    if (!name) return
    onCreate(name)
    event.currentTarget.reset()
  }

  return (
    <section className="skill-composer" aria-labelledby="skill-title">
      <div className="section-label">
        <span className="step-number">01</span>
        <div><h2 id="skill-title">Add a skill</h2><p>Start with a topic you want to master.</p></div>
      </div>
      <form className="input-shell" onSubmit={handleSubmit}>
        <span className="input-icon">+</span>
        <input name="skill" type="text" placeholder="Enter a skill, e.g. JavaScript" autoComplete="off" disabled={disabled} required />
        <kbd>Enter</kbd>
      </form>
    </section>
  )
}
