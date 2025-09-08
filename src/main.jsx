import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Container, Card, Form, Button } from 'react-bootstrap';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
