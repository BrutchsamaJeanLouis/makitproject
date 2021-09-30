// import 'popper.js'
// import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import React, { useState, useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css'
import axios from 'axios'
import Navbar from './features/navbar/Navbar'
import CredentialsModal from './features/credentialsModal/CredentialsModal';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { setUserID, setUsername } from './features/credentialsModal/credentialsModalSlice';




function App() {
  const [iniState, setIniState] = useState()
  const [register, setRegister] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [view , setView] = useState('home')

  const userState = useSelector((rootState) => {
    return rootState.session.user
  })

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

  useEffect(() => {
    console.log('signinModalState', showSignInModal)
    console.log('RegistrationState', register)
  }, [showSignInModal, register])

  const onClickRegisterLink = () => {
    setShowSignInModal(!showSignInModal, () => { console.log("state Changed") })
    console.log('onclickRegisterLink', showSignInModal)
  }

  const accountModal = () => {
    return (
      <CredentialsModal
        show={showSignInModal}
        register={register}
        onCloseButton={() => { setShowSignInModal(!showSignInModal); setRegister(false) }}
        onClickRegister={() => setRegister(true)}
      // onSubmitForm={console.log('submitted registration Form')}
      />




    )
  }

  const getUserData = () => {
    axios.get('/users')
      .then(function (response) {
        // handle success
        setIniState(response.data.username)
        console.log('server responce Data', response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div className="App" style={{ width: '100%', height: '100%' }}>
      <Navbar onClickRegister={onClickRegisterLink} />
      {accountModal()}
      <div className='row' style={{ marginTop: '115px', justifyContent: 'center' }}>
      {userState}
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>


          <div class="card mb-3">
            <h5 class="card-header">h* with .card-header</h5>
            <div class="card-body">
              <h5 class="card-title">Text header</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-secondary">Learn more</a>
            </div>
          </div>



        </div>
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>2</div>
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>3</div>
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>4</div>
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>5</div>
      </div>
    </div>
  )
}

export default App;
