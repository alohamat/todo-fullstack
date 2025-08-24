import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'
import HomePage from './pages/HomePage'
import PrivateRoute from './PrivateRoute'

function App() {
  

  return (
      <Routes>
        {/* public routes */}
        <Route path='' element={<MainPage />}/>
        <Route path='/register' element={<RegisterPage />} />

        {/*private routes */}
        <Route
        path='/home'
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
        />
      </Routes>
  )
}

export default App
