import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Zoom, { WebRtcContext } from './webrtc/main'
// rxjs 
const WebRtcProvider = React.createContext<WebRtcContext>({} as WebRtcContext);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WebRtcProvider.Provider value={Zoom}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WebRtcProvider.Provider>
)
