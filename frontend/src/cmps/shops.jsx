
import { Outlet } from "react-router"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { NavLink } from "react-router-dom"
import { GoogleMap } from './google-map'

export function Shops() {

    return <section className="shops">
            <GoogleMap />
    </section>
}