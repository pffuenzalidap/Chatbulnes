const express = require('express');
const cors = require('cors');
const Fuse = require('fuse.js');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Leer la base de conocimientos
let qaData = { preguntas_frecuentes: [] };
const dataPath = path.join(__dirname, 'Q_A_v1.json');
if (fs.existsSync(dataPath)) {
  qaData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

// Configurar Fuse.js más permisivo para atrapar sugerencias
const fuse = new Fuse(qaData.preguntas_frecuentes, {
  keys: ['pregunta_principal', 'sinonimos', 'categoria'],
  includeScore: true,
  threshold: 0.65, // Aumentamos la tolerancia para encontrar similitudes
  ignoreLocation: true
});

app.post('/api/ask', (req, res) => {
  const { query } = req.body;
  const cleanQuery = query.trim();
  const results = fuse.search(cleanQuery);
  
  if (results.length > 0) {
    const bestScore = results[0].score;
    
    // 1. Coincidencia muy segura
    if (bestScore <= 0.45) {
      const item = results[0].item;
      let isCritical = (cleanQuery.toLowerCase().includes('caida') || cleanQuery.toLowerCase().includes('golpe') || cleanQuery.toLowerCase().includes('sangr'));
      return res.json({
        success: true,
        answer: item.respuesta,
        category: item.categoria,
        warning: isCritical ? "🚨 Atención: Si hay dolor intenso o sangrado abundante, acuda a Urgencias (131)." : null
      });
    } 
    
    // 2. Coincidencia parcial (Mostrar Sugerencias)
    if (bestScore > 0.45 && bestScore <= 0.65) {
       // Tomar hasta 3 sugerencias relevantes
       const suggestions = results.slice(0, 3).map(r => r.item.pregunta_principal);
       return res.json({
          success: true,
          isSuggestion: true,
          answer: "No encontré una respuesta exacta para tu consulta, pero encontré temas muy relacionados en nuestra base clínica. ¿Te referías a alguna de estas opciones?",
          suggestions: suggestions,
          category: "Orientación y Sugerencias"
       });
    }
  }
  
  // 3. Totalmente fuera de dominio
  return res.json({
    success: false,
    answer: "Soy un asistente clínico del Hospital Félix Bulnes. Mi conocimiento se centra en Prevención de Caídas, Anticoagulantes e Hipoglicemiantes. Por favor, intenta reformular tu duda médica.",
    category: "Fuera de Dominio"
  });
});

app.listen(3001, () => console.log('El Chef (Backend V2) está cocinando en http://localhost:3001'));
