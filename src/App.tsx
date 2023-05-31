import { askToIa } from './services/apiAi'
import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [loading, setLoading] = useState<Boolean>(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    askToIa(prompt)
      .then(res => setAnswer(res))
      .finally(() => setLoading(false))
  }

  return (
    <div className="App">
      <h2>¿What is your question?</h2>
      <span>Just ask a question, no more...</span>
      <form onSubmit={handleSubmit}>
        <div className='content'>
          <textarea value={prompt} onChange={handleChange} name="prompt" id="prompt" cols={30} rows={10}></textarea>
          <textarea value={loading ? 'Thinking...' : answer} disabled name="answer" id="answer" cols={50} rows={30}></textarea>
        </div>
        <button>Ask</button>
      </form>
    </div>
  )
}

export default App
