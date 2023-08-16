import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './components/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
