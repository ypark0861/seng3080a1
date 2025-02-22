import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Favorites from './components/favorites'

function App() {
let [page, setPage] = useState('home');

  return (
    <>
      <div>
        <Nav setPage={setPage} />
        <div className='mainbody'>
          { page === 'home' ? <Home /> : <Favorites /> }
        </div>
      </div>
    </>
  )
}

export default App
