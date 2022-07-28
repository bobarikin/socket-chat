import useChat from './hoocks/useChat.js'

function App() {
  const { users, log } = useChat()
  return (
    <>
      <h1>Chat</h1>
      <ul>{users.map((u, ind) => (
        <li key={ind}>{u.name}</li>
      ))}</ul>
      <p>{log}</p>
    </>
  )
}

export default App
