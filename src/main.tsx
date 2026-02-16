import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// ATTENTION : Vérifie bien le nom de ton fichier CSS. 
// Si ça erreur ici, change le chemin par './index.css' ou celui que tu as.
import './styles/globals.css' 

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("L'élément root n'a pas été trouvé. Vérifie ton index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
