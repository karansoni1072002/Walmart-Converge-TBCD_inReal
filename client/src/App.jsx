import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './components/Login'
import ScannerPage from './components/ScannerPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/scanbarcode' element={<ScannerPage />} />
      </Routes>
    </>
  )
}

export default App

