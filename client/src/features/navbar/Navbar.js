import './Navbar.css'
import React, {useState} from 'react'

export default function Navbar(props) {
  const [menu, setMenu] = useState(false)

  const show = (menu) ? "show" : ""

  const toggleMenu = () => {
    setMenu(!menu)
  }

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
              <li className="menu-item-2"><a href="#">Blog</a></li>
              <li className="menu-item-3"><a href="#">About us</a></li>
              <li className="menu-item-4"><a href="#">Contact us</a></li>
            </ul>
          </div>
          <div className="menu-register">
            <button className="register btn btn-link" onClick={(e) => props.onClickRegister()}>Register</button>
            <span style={{ color: '#fff', fontWeight: '900'}}>|</span>
            <a className="register" href="#">login</a>
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
            <li className="toggle-item-2"><a href="#">Blog</a></li>
            <li className="toggle-item-3"><a href="#">About us</a></li>
            <li className="toggle-item-4"><a href="#">Contact us</a></li>
            <li className="toggle-item-5"><button className='btn btn-link' onClick={(e) => props.onClickRegister()}>Register | login</button></li>
          </ul>
      </div>
    </div>


      )
      }
