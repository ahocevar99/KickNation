import Login from './components/Login'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <Router>
      <Navigation />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element= {<SignUp />}/>
          <Route path='/home' element = {<Home />} />
        </Routes>
    </Router>
  )
}

export default App
