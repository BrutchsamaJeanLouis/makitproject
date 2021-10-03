// import 'popper.js'
// import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
// import 'bootstrap/dist/js/bootstrap.min.js'
import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css'
import axios from 'axios'
import Navbar from './features/navbar/Navbar'
import CredentialsModal from './features/credentialsModal/CredentialsModal';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { setUserID, setUsername } from './features/credentialsModal/credentialsModalSlice';




function App() {

  // const userState = useSelector((rootState) => {
  //   return rootState.session.user
  // })

  const dispatch = useDispatch()

  useEffect(() => {
    // fetch api whenever App attached to the DOM
    axios({
      method: 'get',
      url: '/app'
    })
      .then((response) => {
        // setRegisterRes(response.data)
        if (!response.data.user?.username){
          console.log('no user')
        }else{
          dispatch(setUsername(response.data.user.username))
          dispatch(setUserID(response.data.user.id))
        }
        console.log('App Attached to DOM fetch', response)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      // attach dispatch to sideeffect to rerender with ever any action is called
  }, [dispatch])

  // useselctor to get state
  // usedispatch to dispatch an actions


  return (
    <div className="App" style={{ width: '100%', height: '100%' }}>
      <Navbar />
      <CredentialsModal/>

<div className='container-fluid' style={{ marginTop: '115px'}}>
      <div className='row' style={{ display: 'flex', justifyContent: 'center'}}>

        {/* card */}
        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        {/* card  */}
        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>

        <div className='col-md-3' style={{ margin: '10px' }}>
          <div className="card mb-3">
            <h5 className="card-header">h* with .card-header</h5>
            <div className="card-body">
              <h5 className="card-title">Text header</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button href="#" className="btn btn-secondary">Learn more</button>
            </div>
          </div>
        </div>


        
      </div>
      </div>
    </div>
  )
}

export default App;
