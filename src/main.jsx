import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import "./styles/base/Reset.css";
import "./styles/base/Fonts.css";
import "./styles/base/Spacing.css";
import "./styles/base/Typography.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
