/// <reference path='../typings.d.ts'/>
import React from 'react'
import './App.css'
import './globals/global.css'
import Filter from '../mocks/components/filter/filter'
import Home from './pages/home/home'
import Cards from './components/cards/cards'
import SearchResult from './pages/searchResult/searchResult'
import FoodItems from './pages/foodItems/foodItems'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import CustDash from './pages/dashboards/customer/dashboard'
import Cart from './pages/cart/cart'
import MgrDash from './pages/dashboards/manager/dashboard'
import DelDash from './pages/dashboards/deliveryMan/dashboard'
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
        <Route path='/dashboard/:username' element={<CustDash />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App