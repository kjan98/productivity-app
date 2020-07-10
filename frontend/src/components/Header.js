import React from "react";
import {Link, withRouter, Prompt} from "react-router-dom"
import "../styles/Header.css"
import Logo from "../images/logo.png"

function Header(props) {
    // console.log(props);
    return (
        <header className='d-flex justify-content-end' >
            <Link to='/' className='flex-grow-1 row'><img src={Logo} alt='website logo' className='img-fluid'/></Link>
            <nav className=' d-flex justify-content-end align-items-center row flex-row'>
                <Link className={` mx-3 ${props.location.pathname === '/' ? "active" : ""}`} to='/'>Home</Link>
                {/*<Prompt message='foo1'/>*/}
                <Link className={` mx-3 ${props.location.pathname === '/time-trends' ? "active" : ""}`} to='/time-trends'>Time Trends</Link>
                {/*<Prompt message='foo2'/>*/}
                <Link className={`mx-3 ${props.location.pathname === '/projects' ? "active" : ""}`} to='/projects'>Projects</Link>
            </nav>
        </header>

    )
}

export default withRouter(Header);