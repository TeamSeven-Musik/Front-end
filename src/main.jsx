import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import PlayerContextProvider from './pages/context/PlayerContext.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <PlayerContextProvider>
    <App />
    </PlayerContextProvider>
  </StrictMode>,
)
