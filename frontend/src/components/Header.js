import React from "react";
import {Link, withRouter} from "react-router-dom"
import "../styles/Header.css"
import Logo from "../images/logo.png"

function Header(props) {
    console.log(props);
    return (
        <header className='d-flex justify-content-end' >
            <Link to='/' className='flex-grow-1 row'><img src={Logo} alt='website logo' className='img-fluid'/></Link>
            <nav className='navbar-nav d-flex justify-content-end align-items-center row'>
                <Link className={`nav-item mx-3 ${props.location.pathname === '/' ? "active" : ""}`} to='/'>Home</Link>
                <Link className={`nav-item mx-3 ${props.location.pathname === '/time-trends' ? "active" : ""}`} to='/time-trends'>Time Trends</Link>
                <Link className={`nav-item mx-3 ${props.location.pathname === '/projects' ? "active" : ""}`} to='/projects'>Projects</Link>
            </nav>
        </header>

    )
}

export default withRouter(Header);