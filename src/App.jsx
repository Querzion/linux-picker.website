import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MainLayout from './assets/layouts/MainLayout'
import './App.css'
import MainPage from './assets/pages/MainPage'
import AboutPage from './assets/pages/AboutPage'

function App() {

  return (
    <MainLayout selectedDistro={selectedDistro}>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              distros={distros}
              selectedDistro={selectedDistro}
              setSelectedDistro={setSelectedDistro}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
