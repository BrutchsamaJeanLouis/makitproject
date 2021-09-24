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




function App() {
  const [iniState, setIniState] = useState()
  const [register, setRegister] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)

  useEffect(() => {
    console.log('signinModalState', showSignInModal)
    console.log('RegistrationState', register)
  }, [showSignInModal, register])

  const onClickRegisterLink = () => {
    setShowSignInModal(!showSignInModal, () => {console.log("state Changed")})
    console.log('onclickRegisterLink', showSignInModal)
  }

  const accountModal = () => {
    return (
      <CredentialsModal
        show={showSignInModal}
        register={register}
        onCloseButton={() => {setShowSignInModal(!showSignInModal); setRegister(false)}}
        onClickRegister={ () => setRegister(true)}
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
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>1</div>
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>2</div>
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>3</div>
        <div className='col-md-4' style={{ backgroundColor: 'grey', margin: '10px', width: '90%', height: '200px' }}>4</div>
      </div>
    </div>
  )
}

export default App;
