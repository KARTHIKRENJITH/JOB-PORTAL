import React from 'react'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/home'
import Phone from './components/Phone/phone'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/phone' element={<Phone />} />
      </Routes>

    </div>
  )
}

export default App
