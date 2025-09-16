import { Route, Routes, Navigate } from "react-router"
import Signup from "@/pages/signup"
import Login from "@/pages/login"
import Chat from "@/pages/chat"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react"
import Loader from "@/components/loader"
import { Toaster } from "react-hot-toast"

function App() {
    const {checkAuth, isCheckingAuth, authUser} = useAuthStore()
    useEffect(() => {
      checkAuth()
    }, [checkAuth])
  
    console.log({isCheckingAuth, authUser})

    if(isCheckingAuth) {
      return <Loader />
    }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
    <Routes>
      <Route path="/" element={authUser ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
      <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App