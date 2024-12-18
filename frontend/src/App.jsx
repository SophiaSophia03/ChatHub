import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Setting from './pages/SettingPage/Setting'

function App() {
  return (
    <div>
      <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/setting" element={<Setting />}></Route>
        </Routes>

      <Footer />
    </div>
  )
}

export default App