import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([{ 
    sender: 'bot', 
    text: '¡Hola! Soy el Doctor Virtual del Hospital Félix Bulnes 👨‍⚕️. Estoy aquí para guiarte de forma segura en el cuidado domiciliario. ¿En qué te puedo ayudar hoy?' 
  }]);
  const [input, setInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (textQuery) => {
    const query = textQuery || input;
    if (!query) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    if (!textQuery) setInput('');

    try {
      const res = await fetch('http://localhost:3001/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: data.answer, 
        warning: data.warning, 
        category: data.category,
        isSuggestion: data.isSuggestion,
        suggestions: data.suggestions 
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error conectando al servidor local.' }]);
    }
  }

  const startSimulation = async () => {
    setIsSimulating(true);
    // Agregamos consultas reales que antes fallaban para demostrar las sugerencias y la nueva comprensión
    const testCases = [
      "¿como debo tratarme si tengo hipoglucemia?", 
      "olvide dosis del taco", 
      "ayuda la persona sufrio una caida muy fea en el baño",
      "quiero comprar zapatos"
    ];
    for (const test of testCases) {
      await new Promise(r => setTimeout(r, 1800));
      await sendMessage(test);
    }
    setIsSimulating(false);
  }

  return (
    <div className="main-wrapper">
      <div className="container">
        <header>
          <span className="badge">HOSPITAL FÉLIX BULNES</span>
          <h1>Chatbulnes</h1>
          <p className="subtitle">Orientación Clínica Domiciliaria</p>
        </header>
        
        <div className="sim-bar">
          <span>Modo Pruebas / Tesis:</span>
          <button onClick={startSimulation} disabled={isSimulating} className="sim-btn">
            {isSimulating ? "Simulando interacción..." : "▶ Ejecutar Simulación"}
          </button>
        </div>

        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`msg-wrapper ${m.sender}`}>
              {m.sender === 'bot' && <div className="avatar">👨‍⚕️</div>}
              
              <div className={`msg ${m.sender}`}>
                <div className="bubble">
                  {m.category && <div className="cat">{m.category}</div>}
                  {m.text}
                  
                  {/* Renderizado de Sugerencias Clickeables */}
                  {m.isSuggestion && m.suggestions && (
                    <div className="suggestions-container">
                      {m.suggestions.map((sug, idx) => (
                        <button key={idx} className="suggestion-btn" onClick={() => sendMessage(sug)}>
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.warning && <div className="warn">{m.warning}</div>}
                </div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="input-area">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu duda clínica..." 
            disabled={isSimulating}
          />
          <button className="send-btn" onClick={() => sendMessage()} disabled={isSimulating}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
