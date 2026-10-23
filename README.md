Chatbulnes 🏥💬Asistente virtual de orientación y soporte clínico para cuidadores domiciliarios de pacientes críticos derivados del Hospital Clínico Félix Bulnes.

📋 Índice
Sobre el Proyecto
Ejes Clínicos Cubiertos
Arquitectura y Stack Tecnológico
Estructura del Proyecto
Instalación y Puesta en Marcha
Endpoints de la API
Métricas de Calidad y Ciclo PDCA
Equipo y Reconocimientos

📖 Sobre el Proyecto
Chatbulnes es una solución de salud digital (e-Health) concebida ante la alta ocupación de camas críticas del Hospital Félix Bulnes (~120%). Su propósito es acompañar a los cuidadores informales mediante respuestas inmediatas, estandarizadas y clínicamente seguras, reduciendo hasta un 80% de consultas rutinarias en los canales asistenciales.

⚠️ Aviso de Seguridad: Chatbulnes es un recurso educativo y de orientación. No reemplaza consultas de urgencia médica ni realiza diagnósticos.

🩺 Ejes Clínicos CubiertosEl asistente prioriza tres áreas críticas validadas por el equipo de salud:Anticoagulantes: Control de dosis, omisiones horarias, monitoreo de INR y signos de hemorragia.Hipoglicemiantes e Insulinas: Dosis preprandial, técnica de glucometría capilar y protocolo "Regla de los 15" ante hipoglicemia.Prevención de Caídas y Hábitat Seguro: Transferencias seguras (cama-silla), acondicionamiento ambiental y detección inmediata de signos de alarma.

💻 Arquitectura y Stack TecnológicoCapaTecnologíaFunción PrincipalFrontendReact + Vite + Tailwind CSSPWA accesible: botones amplios, tipografía ≥16px y alto contraste.BackendNode.js + ExpressAPI REST con normalización de texto y manejo de estados.Motor de BúsquedaFuse.js + Reglas ClínicasBúsqueda difusa (fuzzy match) y filtro fuera de dominio (OOD).Base de ConocimientoJSON Q&A CuradoPreguntas y respuestas validadas por profesionales clínicos.PersistenciaPostgreSQLRegistro de interacciones anónimas, feedback (👍/👎) y eventos.Observabilidadprom-client (Prometheus)Recolección de latencia p95 y tasas de error 5xx.TestingJest / MochaPruebas de regresión, cobertura y respuestas de seguridad.

📂 Estructura del Proyectochatbulnes/
├── client/                 # Aplicación Frontend (React PWA)
│   ├── src/
│   │   ├── components/     # Componentes de interfaz (Chat, Chips, Alertas)
│   │   └── App.jsx         # Punto de entrada de la UI
├── server/                 # Servicio Backend (Node.js/Express)
│   ├── data/
│   │   └── clinical_qa.json# Base de conocimiento validada
│   ├── services/
│   │   ├── searchEngine.js # Búsqueda con Fuse.js + Reglas de triaje
│   │   └── metrics.js      # Métricas prom-client
│   └── server.js           # API y rutas REST
├── tests/                  # Pruebas automatizadas (Jest)
├── .env.example            # Plantilla de variables de entorno
└── README.md               # Documentación general

⚙️ Instalación y Puesta en MarchaPrerrequisitosNode.js: Versión 18.x o superiornpm o yarnBase de datos PostgreSQL (opcional para desarrollo local)Pasos de ConfiguraciónClonar el repositorio:git clone https://github.com/tu-usuario/chatbulnes.git
cd chatbulnes
Configurar variables de entorno:cp .env.example .env
Completar valores para PORT, DATABASE_URL y CORS_ORIGIN.Instalar dependencias:npm install

Iniciar en modo desarrollo:npm run dev
📡 Endpoints de la APIPOST /api/askRecibe la consulta del usuario, clasifica la intención mediante búsqueda difusa y retorna la respuesta clínica sugerida junto con banderas de severidad.GET /healthzMonitoreo del estado operativo del servicio (health check).GET /metricsExposición de telemetría y contadores para Prometheus y paneles Grafana.

📊 Métricas de Calidad y Ciclo PDCA
IndicadorDefiniciónMeta (8 semanas)Latencia p95
Tiempo de respuesta en el 95% de interacciones< 700 ms
Precisión Clínica 
Coincidencia y exactitud del consejo entregado≥ 93%
Filtro Fuera de Dominio (OOD)
Descarte acertado de temas no relacionados≥ 97%
Tasa de Errores Fallas técnicas a nivel de servidor ≤ 0.2%
Satisfacción Usuario Calificaciones positivas de cuidadores (👍)≥ 90%

👥 Equipo y Reconocimientos
Autor: Pablo Francisco Fuenzalida Pizarro
Carrera: Ingeniería en Tecnologías de la Información y Comunicaciones
Institución: Universidad San Sebastián — Sede Santiago
Contexto de Aplicación: Hospital Clínico Félix Bulnes (Cerro Navia)
