import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
const Sidebar = ({sidebarvisible}) => {
    return (
        <div className={`border-end bg-white ${sidebarvisible?'':'d-none'}`} id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light">
                <img src={logo} height={60} width={70}/>
            </div>
            <div className="list-group list-group-flush">
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add">
                <i class="bi bi-plus-square-fill me-2"></i> Add Dish</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list">
                <i class="bi bi-list me-2"></i> Dishes</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orders">
                <i class="bi bi-cart-fill me-2"></i> Orders</Link>

            </div>
        </div>
    )
}

export default Sidebar