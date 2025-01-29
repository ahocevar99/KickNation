import Login from './components/Login'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element= {<SignUp />}/>
      </Routes>
    </Router>
  )
}

export default App
