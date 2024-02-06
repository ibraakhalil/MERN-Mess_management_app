import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/general/Header'
import Footer from './components/general/Footer'
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