import { useState } from 'react'

function InboxView() {
  const [name, setName] = useState('')
  return (
    <>
      <h1>Bonjour</h1>
      <div className='row'></div>

      <p>Aucun taches pour aujourd'hui</p>

      <form
        className='row'
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <input
          id='greet-input'
          onChange={e => setName(e.currentTarget.value)}
          placeholder='Enter a name...'
        />
        <button type='submit'>Greet</button>
      </form>
    </>
  )
}

export { InboxView }
