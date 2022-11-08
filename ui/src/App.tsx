/// <reference path='../typings.d.ts'/>
import React from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './globals/global.css'
import Filter from '../mocks/components/filter/filter'
import Home from './pages/home/home'
import Cards from './components/cards/cards'
import SearchResult from './pages/searchResult/searchResult'
import FoodItems from './pages/foodItems/foodItems'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Default:React.FC<{count:number, handleclick:React.MouseEventHandler<HTMLButtonElement>}> = (props) => {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={props.handleclick}>
          count is {props.count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)

  const HandleClick = () => {
    setCount((count) => count + 1)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Default count={count} handleclick = {HandleClick} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/filter' element={<Filter />} />
        <Route path='/card' element={<Cards />} />
        <Route path='/results' element={<SearchResult />} />
        <Route path='/foodItems' element={<FoodItems />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App