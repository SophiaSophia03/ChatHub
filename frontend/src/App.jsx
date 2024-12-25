import React, {useEffect} from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Setting from './pages/SettingPage/Setting'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser)return(
    <div className='flex justify-center items-center h-screen'> <Loader className='size-10 animate-spin' /> </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar />

        <Routes>
          <Route exact path="/" element={authUser ? <Home /> : <Navigate to="/login" />}></Route>
          <Route exact path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />}></Route>
          <Route exact path="/login" element={!authUser ? <Login /> : <Navigate to="/" />}></Route>
          <Route exact path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />}></Route>
          <Route exact path="/setting" element={authUser ? <Setting /> : <Navigate to="/login" />}></Route>
        </Routes>

        <Toaster />

      <Footer />
    </div>
  )
}

export default App