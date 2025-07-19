import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {
  

  return (
      <Routes>
        <Route path='' element={<MainPage />}/>
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
  )
}

export default App
