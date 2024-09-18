import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './routes/HomePage'
import Header from './components/shared/Header'
import PokeInfo from './routes/PokeInfo'

function App() {
  
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/poke/:name' element={<PokeInfo />} />
      </Routes>
    </div>
  )
}

export default App
