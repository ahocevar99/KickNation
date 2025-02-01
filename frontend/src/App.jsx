import Lineup from './components/Lineup'
import Home from './components/Home'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element= {<SignUp />}/>
      <Route path='/home' element = {<Lineup />} />
      </Routes>
    </Router>
  )
}

export default App
