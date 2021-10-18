// import 'popper.js'
// import 'jquery/dist/jquery.min.js'
import 'jquery/src/jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom'
// import { Counter } from './features/counter/Counter';
import './App.css'
import axios from 'axios'
import Navbar from './features/navbar/Navbar'
import CredentialsModal from './features/credentialsModal/CredentialsModal'
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Formik } from 'formik'
import { useDispatch, useSelector, connect } from 'react-redux'
import { setUserID, setUsername } from './features/credentialsModal/credentialsModalSlice'
import MyProjects from './features/views/MyProjects'

function App (props) {
  const dispatch = useDispatch()

  // TODO fetch projects here to be passed down as props

  useEffect(() => {
    // fetch api whenever App attached to the DOM
    axios({
      method: 'get',
      url: '/app'
    })
      .then((response) => {
        // setRegisterRes(response.data)
        if (!response.data.user?.username) {
          console.log('no user')
        } else {
          dispatch(setUsername(response.data.user.username))
          dispatch(setUserID(response.data.user.id))
        }
        console.log('App Successfully Loaded', response)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
      // attach dispatch to sideeffect to rerender with ever any action is called
  }, [dispatch])

  // useselctor to get state
  // usedispatch to dispatch an actions

  return (
    <div className='App' style={{ width: '100%', height: '100%' }}>
      <Router forceRefresh>
        <Navbar />
        <CredentialsModal />

        <div className='container-fluid' style={{ marginTop: '115px' }}>
          <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
            {/* ============== Router Switch List ==================== */}
            <Switch>
              <Route path='/projects'>
                <MyProjects />
              </Route>
              {/* <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. Needs to be last or it will  */}
              <Route path='/'>
                Home
              </Route>
            </Switch>

          </div>
        </div>
      </Router>
    </div>
  )
}
const mapStateToProps = (state) => ({
  userID: state.session.userID,
  username: state.session.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
