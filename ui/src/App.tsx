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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/filter' element={<Filter />} />
        <Route path='/card' element={<Cards />} />
        <Route path='/restaurants/:city' element={<SearchResult />} />
        <Route path='/restaurant/:city/:id' element={<FoodItems />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App