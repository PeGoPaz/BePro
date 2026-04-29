import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div classname='mx-4 sm:mx-[10%]'>
    // TODO: Make all the paths
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ '
      </Routes>
    </div>
  )
}

export default App
