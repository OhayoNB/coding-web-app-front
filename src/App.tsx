import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Codeblock } from 'views/Codeblock'
import { Lobby } from 'views/Lobby'
import './assets/styles/main.scss'
import { AppFooter } from './components/AppFooter'
import { AppHeader } from './components/AppHeader'
import { Login } from './views/Login'

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="main-container">
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="lobby/*" element={<Lobby />} />
          <Route path="codeblock" element={<Codeblock />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

export default App
