import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Routers from './router/routes'


function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Routers/>
      <Footer />
    </BrowserRouter>  
  )
}

export default App