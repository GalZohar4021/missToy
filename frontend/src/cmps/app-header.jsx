import { Link, NavLink } from 'react-router-dom'
import { Login } from './user-login'

export function AppHeader() {    
    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    return <header className="app-header full main-layout flex-row">
        <div className="main-screen" onClick={() => toggleMenu()}></div>
        <div className="header-box flex-row">
            <div><h1 className="app-logo">missToy</h1></div>
            <Login />
            <button className="menu-toggle-btn" onClick={() => toggleMenu()}>☰</button>
            <nav onClick={() => toggleMenu()} className="app-nav flex-row">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About us</NavLink>
            </nav>
        </div>
    </header>
}