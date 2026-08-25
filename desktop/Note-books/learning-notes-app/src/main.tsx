import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Button from './components/Button.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      
<Button title="Sign Up" />
<Button title="Log In" />
<Button title="Sign Up" />
    <App />
    </div>
    
  </StrictMode>,
)
