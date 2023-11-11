import React from 'react'
import './navbar.css'
import logo from '../../assets/full_logo.png'
import {Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className='navbar'>
        <Link to ='/' className='sitetitle'>
            <img src={logo} alt='logo' className='logo'/>
            </Link>
        <ul>
            <CustomLink to ='/register' label='Register'>Register</CustomLink>
            <CustomLink to ='/about' label='About'>About</CustomLink>
            <CustomLink to ='/events' label='Events'>Events</CustomLink>
            <CustomLink to ='/map' label='Map'>Map</CustomLink>
            <CustomLink to ='/donate' label='Donate'>Donate</CustomLink>
            <CustomLink to ='/contribute' label='Contribute'>Contribute</CustomLink>
        </ul>


      </nav>
    </div>
  )
}

function CustomLink( {to , children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}
