import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import './CredentialsModal.css';
import { useSelector, useDispatch } from 'react-redux'
import { setUserID, setUsername, setCredentialsModalShow, setCredentialsModalView } from './credentialsModalSlice'

export default function CredentialsModal(props) {
  const [signupFlashMessage, setSignupFlashMessage] = useState('')
  const [loginFlashMessage, setLoginFlashMessage] = useState('')
  const dispatch = useDispatch()
  const credentialsModalShow = useSelector(rootstate => rootstate.session.credentialsModalShow)
  const credentialsModalView = useSelector(rootstate => rootstate.session.credentialsModalView)

  /*==================================================================
  |                    React DOM
  *==================================================================*/
  return (
    <Modal show={credentialsModalShow} onHide={() => dispatch(setCredentialsModalShow(false))} >
      <Modal.Header closeButton closeLabel='close'>
        <Modal.Title>{credentialsModalView === 1 ? 'Sign In' : 'Register'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* SIGNIN BODY */}

        {credentialsModalView === 1 ? <Formik
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            await axios({
              method: 'post',
              url: '/login',
              data: values
            })
              .then((loginResponse) => {
                if (loginResponse.data?.message) {
                  setLoginFlashMessage(loginResponse?.data?.message[0])
                  setTimeout(() => setLoginFlashMessage(""), 1600);
                }
                if (loginResponse.data.user?.username){
                  dispatch(setUsername(loginResponse.data.user.username))
                  dispatch(setUserID(loginResponse.data.user.id))
                  dispatch(setCredentialsModalShow(false))
                }
                setSubmitting(false)
                // setRegisterRes(response.data)
                console.log('responce', loginResponse)
              })
              .catch((error) => {
                // handle error
                console.log(error);
              })

          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* check Docs for more Methods */
          }) => (
            <form method='POST' onSubmit={handleSubmit}>
              {loginFlashMessage !== "" ? <div className='error-signup' style={{ color: 'red', minHeight: '1.5em', textAlign: 'center' }}><i style={{ fontSize: '10px'}}class="bi bi-x-circle-fill"></i>{loginFlashMessage}</div>
                : <div style={{ color: 'red', minHeight: '1.5em', textAlign: 'center' }}></div>
              
              }
              <br />
              <div className="form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter username" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Login</button>
              <h6>Don't have an account <button className='btn btn-link float-right' onClick={() => {dispatch(setCredentialsModalView(2)); setSignupFlashMessage(''); setLoginFlashMessage('');}}>Register</button></h6>
            </form>
          )}
        </Formik>
          :
          //-------------------------------------
          // Register Body
          // -----------------------------------
          <Formik
            initialValues={{ email: '', username: '', password: '', confirmPassword: '', corporation: '', terms: 'true' }}
            // async submit
            // onSubmit={async (values) => {
            //   await sleep(500);
            //   alert(JSON.stringify(values, null, 2));
            // }}
            onSubmit={async (values, { setSubmitting }) => {
              await axios({
                method: 'post',
                url: '/signup',
                data: values
              })
                .then((registerResponse) => {
                  if (registerResponse.data?.message) {
                    setSignupFlashMessage(registerResponse?.data?.message[0])
                  } 
                  // else {
                  //   setSignupFlashMessage("")
                  // }

                //   {
                //     "id": 1,
                //     "username": "sam",
                //     "email": "sam@mail.com",
                //     "company": null,
                //     "password": "$2b$10$bKn6ni4HgmLXQ4gLMS.yqexHzps3jFqO4t.YRkbMOA0i7z94V9RTC",
                //     "salt": "10",
                //     "createdAt": "2021-09-30T15:04:53.040Z",
                //     "updatedAt": "2021-09-30T15:04:53.040Z"
                // }
                  dispatch(setUsername(registerResponse.data.user.username))
                  dispatch(setUserID(registerResponse.data.user.id))
                  setSubmitting(false)
                  // setRegisterRes(response.data)
                  console.log('responce', registerResponse)
                })
                .catch((error) => {
                  // handle error
                  console.log(error);
                })
              // fetch('/signup', {
              //   method: 'POST',
              //   body: values,
              // }).then(response => console.log(response))

            }}
            validate={values => {
              const errors = {};
              // // username validation
              // if(!values.username){
              //   errors.username = 'Username Required'
              // }
              // //email validation
              // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              //   errors.email = 'Invalid email address';
              // }
              // // password validation
              // if(values.password !== values.confirmPassword){
              //   errors.confirmPassword = 'Paswords must Match';
              // }
              return errors
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* check Docs for more Methods */
            }) => (
              <form method='POST' onSubmit={handleSubmit}>
                <div style={{ color: 'red' }}>{signupFlashMessage}</div>
                <br />
                <div className="form-group">
                  <div style={{ color: 'red' }}>{errors.username && touched.username && errors.username}</div>
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" placeholder="Enter username" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                </div>
                <div className="form-group">
                  <div style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</div>
                  <label htmlFor="inputEmail">Email address</label>
                  <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                </div>
                <div className="form-group">
                  <div style={{ color: 'red' }}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</div>
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="" name="confirmPassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                </div>
                <div className="form-group">
                  <label htmlFor="corporation">Corporation</label>
                  <input type="text" className="form-control" placeholder="optional" name="corporation" onChange={handleChange} onBlur={handleBlur} value={values.corporation} />
                </div>
                <br />
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} onBlur={handleBlur} value={values.terms} />
                  <label className="form-check-label" htmlFor="exampleCheck1">I agree to the and terms or service</label>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
            )}
          </Formik>
        }
      </Modal.Body>
    </Modal>
  )
}
