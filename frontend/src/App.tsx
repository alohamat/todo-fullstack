import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route path='/pages' element={<MainPage />}/>
    </Routes>
  )
}

export default App
