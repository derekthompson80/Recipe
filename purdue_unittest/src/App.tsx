import { useState } from 'react'
import { chatbot } from './services/chatbotService'
import type { ChatResponse } from './services/chatbotService'
import { generateKYCData, generateAMLData } from './utils/generateData'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [responses, setResponses] = useState<ChatResponse[]>([])
  const [kycData, setKycData] = useState<any[]>([])

  const handleSend = async () => {
    const res = await chatbot.sendMessage(input)
    setResponses([...responses, res])
    setInput('')
  }

  const handleGenerateKYC = () => {
    setKycData(generateKYCData(3))
  }

  return (
    <div className="App">
      <h1>KYC/AML Chatbot Test Platform</h1>
      
      <div className="chat-section">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask about KYC/AML..."
        />
        <button onClick={handleSend}>Send</button>
        <div className="responses">
          {responses.map((r, i) => (
            <p key={i} style={{ color: r.error ? 'red' : 'inherit' }}>{r.message}</p>
          ))}
        </div>
      </div>

      <div className="data-section">
        <button onClick={handleGenerateKYC}>Generate Synthetic KYC Data</button>
        <pre>{JSON.stringify(kycData, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
