import './Navbar.css'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUsername } from '../credentialsModal/credentialsModalSlice'

export default function Navbar(props) {
  const logOutUser = () => {
    axios.get('/logout')
    .then((responce) => {
      dispatch(setUsername(null))
    })
  }

  const userState = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  return (
    <div className="back-menu">
      <div className="back-menu-center">
        <div className="logo">
          <a className="logo-link" href="#"><img src="./weblogo.png" alt="YourLogo" /></a>
          <a className="logo-link" href="#">Makit</a>
        </div>
        <div style={{ width: '78%', position: 'relative' }}>
          <div className="menu-items">
            <ul>
              <li className="menu-item-1"><a href="#">Home</a></li>
              <li className="menu-item-2"><a href="#">My Projects</a></li>
              <li className="menu-item-3"><a href="#">Inbox</a></li>
              <li className="menu-item-4"><a href="#">Contact us</a></li>
            </ul>
          </div>
          <div className="menu-register">
            {!userState ?
              <>
              <button className="register btn btn-link" onClick={(e) => props.onClickRegister()}>Register</button>
              <span style={{ color: '#fff', fontWeight: '900'}}>|</span>
              <button className="register btn btn-link" onClick={(e) => props.onClickRegister()}>login</button>
              </>
              :
              <button className="register btn btn-link" onClick={(e) => logOutUser()}>Logout</button>
            }
          </div>
        </div>
      </div>
      <div className="toggle-menu">



        <label htmlFor="toggle-btn">
          <i className="fas fa-bars toggle-icon"> <img src='menu-hamburger.png' style={{ width: '30px', height: 'auto' }}/> </i>
        </label>

        
        
        <input id="toggle-btn" type="checkbox"/>
          <ul className="toggle-items">
            <li className="toggle-item-1"><a href="#">Home</a></li>
            <li className="toggle-item-2"><a href="#">My Projects</a></li>
            <li className="toggle-item-3"><a href="#"> Inbox</a></li>
            <li className="toggle-item-4"><a href="#">Contact us</a></li>
            {!userState ?
              <li className="toggle-item-5"><button className='btn btn-link' onClick={(e) => props.onClickRegister()}>Register|login</button></li>
              : <li className="toggle-item-5"> <button className='btn btn-link' onClick={(e) => logOutUser()}>Sign out </button></li>
            }
          </ul>

          <div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?"/>
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
     </button>
   </div>
</div>
          {/* <input type="search" placeholder="search projects" style={{ borderRadius: '20px', height: '2em', width: '70%', marginLeft: '20px'}} /><button></button> */}

      </div>
    </div>


      )
      }
