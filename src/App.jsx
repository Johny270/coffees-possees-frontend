// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AllCoffeeShops from './components/AllCoffeeShops/AllCoffeeShops'
import AllClubs from './components/AllClubs/AllClubs'
import NewClub from './components/NewClub/NewClub'
import ClubDetails from './components/ClubDetails/ClubDetails'

// services
import * as authService from './services/authService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  return (
    <main>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clubs"
          element={
            <ProtectedRoute user={user}>
              <AllClubs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shops"
          element={
            <ProtectedRoute user={user}>
              <AllCoffeeShops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute user={user}>
              <NewClub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details"
          element={
            <ProtectedRoute user={user}>
              <ClubDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  )
}

export default App
