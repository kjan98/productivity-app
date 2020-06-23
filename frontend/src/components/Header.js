import React from "react";
import {Link, withRouter} from "react-router-dom"

function Header(props) {
    return (
        <nav className='navbar justify-content-center'>
            <ul className='navbar-nav d-flex flex-row'>
                <li className={`nav-item ${props.location.pathname === '/' ? "active" : ""}`}>
                    <Link class='nav-link mx-3' to='/'>Home</Link>
                </li>
                <li className={`nav-item ${props.location.pathname === '/Dummy' ? "active" : ""}`}>
                    <Link class='nav-link mx-3' to='/dummy'>Dummy</Link>
                </li>
            </ul>
        </nav>
    )
}

export default withRouter(Header);