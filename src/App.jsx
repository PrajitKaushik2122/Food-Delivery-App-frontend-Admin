import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Addfood from './pages/addfood/Addfood'
import Listfood from './pages/Listfood/Listfood'
import Orders from './pages/Orders/Orders'
import Sidebar from './components/Sidebar/Sidebar'
import Menubar from './components/Menubar/Menubar'
import { ToastContainer } from 'react-toastify'
const App = () => {


  const [sidebarvisible,setsidebarvisible] = useState(true);

  const togglesidebar = ()=>{
    setsidebarvisible(!sidebarvisible)
  }

  return (
    <div className="d-flex" id="wrapper">
      <Sidebar sidebarvisible={sidebarvisible}/>
      <div id="page-content-wrapper">
      <Menubar togglesidebar={togglesidebar}/>
      <ToastContainer/>
        <div className="container-fluid">
          <Routes>
            <Route path="/add" element={<Addfood />} />
            <Route path="/list" element={<Listfood />} />
            <Route path="/orders" element={<Orders />} />
            <Route path='/' element={<Listfood />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App