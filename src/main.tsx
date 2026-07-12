import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BuilderProvider } from './context/BuilderContext'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><BuilderProvider><App /></BuilderProvider></StrictMode>,
)

