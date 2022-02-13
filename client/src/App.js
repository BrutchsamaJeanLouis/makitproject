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
import { setProjects } from './features/views/myProjectsSlice'
import MyProjects from './features/views/MyProjects'
import CreateProject from './features/createProject/CreateProject'
import { Feed } from './features/views/Feed'

function App (props) {
  axios.defaults.withCredentials = true
  const { myProjects, userID, username } = props
  const dispatch = useDispatch()

  // TODO fetch projects here to be passed down as props
  const fetchProjects = async () => {
    await axios({
      method: 'get',
      url: '/api/project/get'
    })
      .then((response) => {
        console.log('projects fetched responce', response)
        if (response.data?.projects && response.data.projects.length !== 0) {
          dispatch(setProjects(response.data.projects))
        }
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }

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

    axios({
      method: 'get',
      url: '/api/project/get'
    })
      .then((response) => {
        console.log('projects fetched responce', response)
        if (response.data?.projects && response.data.projects.length !== 0) {
          dispatch(setProjects(response.data.projects))
        }
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
      <Navbar />
      <CredentialsModal />
      <Router forceRefresh>
        <div className='container-fluid' style={{ marginTop: '115px' }}>
          <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
            {/* ============== Router Switch List ==================== */}
            <Switch>
              <Route path='/projects'>
                {/* Multiple nested Require exact path matching for root path */}
                <Route exact path='/projects'><MyProjects /></Route>
                <Route path='/projects/create'><CreateProject /></Route>
              </Route>
              {/* <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. / (index route) Needs to be last or it will not render  */}
              <Route path='/'>
                <Feed />
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
  username: state.session.user,
  myProjects: state.myProjects.projects
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
