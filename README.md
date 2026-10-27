# Chatbulnes 🏥💬

Asistente virtual web/móvil para apoyar a cuidadores de pacientes críticos del Hospital Félix Bulnes. Mediante un chatbot con información validada sobre medicamentos y cuidados básicos, busca optimizar la atención domiciliaria y mitigar la sobrecarga hospitalaria.

## 📋 Índice

1. [Sobre el Proyecto](#-sobre-el-proyecto)
2. [Arquitectura Técnica y Stack V2](#-arquitectura-técnica-y-stack-v2)
3. [Características Principales](#-características-principales)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Guía de Instalación Paso a Paso (Entorno Local)](#-guía-de-instalación-paso-a-paso-entorno-local)
6. [Modo de Pruebas y Simulación para Tesis](#-modo-de-pruebas-y-simulación-para-tesis)
7. [Autor y Contexto Académico](#-autor-y-contexto-académico)

---

## 📖 Sobre el Proyecto

**Chatbulnes** es una solución de salud digital (*e-Health*) diseñada como propuesta de título para responder a la alta saturación de camas críticas en el Hospital Clínico Félix Bulnes (\~120% de ocupación UCI). Su propósito es servir de puente de orientación entre el hospital y los cuidadores informales en el hogar, entregando respuestas inmediatas, estandarizadas y clínicamente validadas sobre anticoagulantes, hipoglicemiantes y prevención de caídas.

> ⚠️ **Aviso de Seguridad:** Chatbulnes es un recurso educativo y de orientación domiciliaria. No reemplaza consultas de urgencia médica ni diagnósticos profesionales.

---

## 💻 Arquitectura Técnica y Stack V2

La arquitectura del proyecto está desacoplada en dos capas principales sobre un entorno local de herramientas 100% gratuitas:

| Componente | Tecnología | Descripción Funcional |
| :--- | :--- | :--- |
| **Frontend (Cliente)** | React + Vite + CSS Moderno | Interfaz PWA con diseño optimizado (Glassmorphism), alto contraste, tipografía accesible y avatar clínico interactivo. |
| **Backend (Servidor)** | Node.js + Express | API REST centralizada que procesa las consultas, aplica las reglas de triaje y gestiona las respuestas. |
| **Motor de Búsqueda** | Fuse.js (Búsqueda Difusa) | Algoritmo inteligente configurado para tolerar variaciones ortográficas y ofrecer **sugerencias interactivas** cuando una consulta no es exacta. |
| **Base de Conocimiento** | JSON Estructurado (`Q_A_v1.json`) | Repositorio curado de preguntas frecuentes clínicas, sinónimos y alertas de severidad para derivación a urgencias. |

---

## ✨ Características Principales

* **Sugerencias Inteligentes:** Si el usuario realiza una consulta ambigua o con variaciones de lenguaje, el sistema no se bloquea; ofrece opciones de referencia clickeables.
* **Doctor Virtual (Avatar Dinámico):** Componente visual conversacional que aporta dinamismo y cercanía en la interacción con el cuidador.
* **Filtros de Seguridad Clínica (OOD):** Capacidad de reconocer consultas fuera del dominio médico y recordar los protocolos de emergencia (SAMU 131).
* **Diseño Ergonómico:** Fondo con degradados suaves para evitar la fatiga visual en consultas nocturnas.

---

## 📂 Estructura del Proyecto

```text
chatbulnes_v2/
├── backend/
│   ├── server.js           # Servidor Node.js + Express + Fuse.js
│   ├── Q_A_v1.json         # Base de conocimientos clínica validada
│   └── package.json        # Dependencias del backend
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Componente principal con chat y simulador
│   │   ├── App.css         # Estilos visuales accesibles y modernos
│   │   └── main.jsx        # Punto de montaje de React
│   ├── index.html          # HTML principal optimizado
│   └── package.json        # Dependencias de Vite/React
└── README.md               # Documentación oficial del repositorio
```

---

## ⚙️ Guía de Instalación Paso a Paso (Entorno Local)

Para poner en marcha el proyecto en tu computador de forma gratuita, sigue estos pasos:

### 1. Clonar o descomprimir el repositorio
Asegúrate de tener la carpeta del proyecto abierta en tu terminal o editor de código (como Visual Studio Code).

### 2. Configurar y encender el Backend (El Servidor)
1. Abre una terminal y navega a la carpeta backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias necesarias (`express`, `cors`, `fuse.js`):
   ```bash
   npm install
   ```
3. Inicia el servidor local:
   ```bash
   node server.js
   ```
   *(Deberás ver en consola: "El Chef (Backend V2) está cocinando en http://localhost:3001"). Mantén esta terminal abierta.*

### 3. Configurar y encender el Frontend (La Interfaz)
1. Abre **una nueva ventana o pestaña de terminal**.
2. Navega a la carpeta frontend:
   ```bash
   cd frontend
   ```
3. Instala las dependencias del cliente:
   ```bash
   npm install
   ```
4. Ejecuta el entorno de desarrollo:
   ```bash
   npm run dev
   ```
5. Haz clic en el enlace local que te entrega la terminal (generalmente `http://localhost:5173`) para abrir la aplicación en tu navegador.

---

## 🧪 Modo de Pruebas y Simulación para Tesis

Pensado especialmente para la defensa y demostración del proyecto, el panel superior cuenta con un botón verde titulado **"▶ Ejecutar Simulación"**. 

Al presionarlo, el sistema ejecutará automáticamente una batería de casos de prueba preconfigurados (incluyendo preguntas con variaciones de redacción, consultas con faltas de ortografía e intentos fuera de dominio), permitiendo visualizar en tiempo real cómo el motor inteligente procesa las respuestas y activa las sugerencias o alertas clínicas sin requerir tipeo manual.

---

## 👥 Autor y Contexto Académico

* **Autor:** Pablo Francisco Fuenzalida Pizarro
* **Proyecto:** Tesis para optar al título de Ingeniero en Tecnologías de la Información y Comunicaciones
* **Institución:** Universidad San Sebastián — Sede Santiago
* **Ámbito de Aplicación:** Hospital Clínico Félix Bulnes (Cerro Navia)