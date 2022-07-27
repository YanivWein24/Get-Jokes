import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import allReducers from './reducers/allReducers'
import { Provider } from 'react-redux'


const store = configureStore({ reducer: allReducers },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

