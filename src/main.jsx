import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

import {

  Toaster,

} from 'react-hot-toast'

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <App />

    {/* PREMIUM TOASTS */}

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{

        style: {

          background:
            '#1f1f1f',

          color: '#fff',

          borderRadius:
            '18px',

          padding: '16px',

          fontSize: '16px',

          boxShadow:
            '0 10px 30px rgba(0,0,0,0.3)',

        },

        success: {

          duration: 3000,

          iconTheme: {

            primary:
              '#22c55e',

            secondary:
              '#fff',

          },

        },

        error: {

          duration: 3000,

          iconTheme: {

            primary:
              '#ef4444',

            secondary:
              '#fff',

          },

        },

      }}
    />

  </React.StrictMode>

)