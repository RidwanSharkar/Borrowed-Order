import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { CodeProvider } from './CodeContent'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeProvider>
      <App />
    </CodeProvider>
  </StrictMode>,
)
