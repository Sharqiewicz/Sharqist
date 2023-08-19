import { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

function InboxView() {
  const [name, setName] = useState('')

  const getAllTasks = async () => {
    const abc = await invoke('get_all_tasks')

    console.log(abc, 'abc')
  }
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
        <button onClick={getAllTasks}>Greet</button>
      </form>
    </>
  )
}

export { InboxView }
