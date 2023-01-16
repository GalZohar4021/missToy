
import { Outlet } from "react-router"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { NavLink } from "react-router-dom"


export function About() {

    return <section className="about-page">
        <h1 className="welcome-about">About Us</h1>
        <nav className="about-nav flex-row">
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/about/dashboard">Toys Labels Dashboard</NavLink>
            <NavLink to="/about/shops">Shops</NavLink>
        </nav>
        <div className="about-content">
            <Outlet />
        </div>
    </section>
}