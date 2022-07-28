import { useState } from 'react'
import useChat from './hoocks/useChat.js'

function App() {
  const { users, messages, sendMessage,log } = useChat()
  const [text, setText] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    sendMessage(text)
    setText('')
  }

  return (
    <>
      <h1>Chat</h1>
      <ul>{users.map((u, ind) => (
        <li key={ind}>{u.name}</li>
      ))}</ul>
      <p>{log}</p>
      <form onSubmit={onSubmit}>
        <input type='text' autoFocus placeholder='Message...' value={text} onChange={(e) => setText(e.target.value)} />
        <button type='submit'>Send</button>
      </form>
      <ul>{messages.map((m, ind) => (
        <li key={ind}>{m}</li>
      ))}</ul>
    </>
  )
}

export default App
