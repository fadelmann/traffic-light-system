import React from 'react'
import ReactDOM from 'react-dom/client'
import  { App } from './App'
import { TrafficLightProvider } from './contexts/trafficLightContext';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <TrafficLightProvider>
      <App />
    </TrafficLightProvider>
  </React.StrictMode>
);