import './Navbar.css'
import weblogo from './img/weblogo.png'
import menuHamburger from './img/menu-hamburger.png'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUsername, setCredentialsModalShow, setCredentialsModalView } from '../credentialsModal/credentialsModalSlice'

export default function Navbar (props) {
  const logOutUser = () => {
    axios.get('/logout')
      .then((responce) => {
        dispatch(setUsername(null))
      })
  }

  const userState = useSelector(rootstate => rootstate.session.user)

  const dispatch = useDispatch()

  return (
    <div className='back-menu'>
      <div className='back-menu-center'>
        <div className='logo'>
          <a className='logo-link' href='/'><img src={weblogo} alt='YourLogo' /></a>
          <a className='logo-link' href='/'>Makit</a>
        </div>
        <div style={{ width: '78%', position: 'relative' }}>
          <div className='menu-items'>
            <ul>
              <li className='menu-item-1'><a href='/'>Home</a></li>
              <li className='menu-item-2'><a href='/projects'>My Projects</a></li>
              <li className='menu-item-3'><a href='/'>Inbox</a></li>
              <li className='menu-item-4'><a href='/'>Contact us</a></li>
            </ul>
          </div>
          <div className='menu-register'>
            {!userState
              ? <>
                <button className='register btn btn-link' onClick={(e) => { dispatch(setCredentialsModalShow(true)); dispatch(setCredentialsModalView(2)) }}>Register</button>
                <span style={{ color: '#fff', fontWeight: '900' }}>|</span>
                <button className='register btn btn-link' onClick={(e) => { dispatch(setCredentialsModalShow(true)); dispatch(setCredentialsModalView(1)) }}>login</button>
                </>
              : <button className='register btn btn-link' onClick={(e) => logOutUser()}>Logout</button>}
          </div>
        </div>
        {userState &&
          <div className='user-circle'><p>{userState?.charAt(0).toUpperCase()}</p></div>}
      </div>

      {/* Mobile / Tablets */}
      <div className='toggle-menu'>
        <label htmlFor='toggle-btn'>
          <i className='fas fa-bars toggle-icon'> <img alt='menu-hamb' src={menuHamburger} style={{ width: '30px', height: 'auto' }} /> </i>
        </label>

        <input id='toggle-btn' type='checkbox' />
        <ul className='toggle-items'>
          <li className='toggle-item-1'><button className='btn btn-link btn-nav-mobile'><i className='bi bi-house' style={{ marginRight: '5px' }} />Home</button></li>
          <li className='toggle-item-2'><a className='btn btn-link btn-nav-mobile' href='/projects'><i className='bi bi-lightbulb' style={{ marginRight: '5px' }} />My Projects</a></li>
          <li className='toggle-item-3'><button className='btn btn-link btn-nav-mobile'><i className='bi bi-envelope' style={{ marginRight: '5px' }} />Inbox</button></li>
          {userState && <li className='toggle-item-4'><button className='btn btn-link btn-nav-mobile'><i className='bi bi-gear' style={{ marginRight: '5px' }} />{userState?.slice(0, 19)}</button></li>}
          <li className='toggle-item-4'><button className='btn btn-link btn-nav-mobile'><i className='bi bi-telephone' style={{ marginRight: '5px' }} />Contact us</button></li>
          {!userState
            ? <li className='toggle-item-5'><button className='btn btn-link' onClick={(e) => { dispatch(setCredentialsModalShow(true)); dispatch(setCredentialsModalView(1)) }}>Register|login</button></li>
            : <li className='toggle-item-5'> <button className='btn btn-link' onClick={(e) => logOutUser()}>Sign out </button></li>}
        </ul>

        <div className='wrap'>
          <div className='search' style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <input type='text' className='searchTerm' placeholder='What are you looking for?' />
            <button type='submit' className='searchButton'>
              <i className='fa fa-search text-white' />
            </button>
          </div>
        </div>
        {/* <input type="search" placeholder="search projects" style={{ borderRadius: '20px', height: '2em', width: '70%', marginLeft: '20px'}} /><button></button> */}

      </div>
    </div>
  )
}
