import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import './CredentialsModal.css';

export default function CredentialsModal(props) {
  const { register, show, onCloseButton, onClickRegister, onSubmit } = props
  const [resgisterRes, setRegisterRes] = useState("empty")
  const [signupFlashMessage, setSignupFlashMessage] = useState('')
  const [loginFlashMessage, setLoginFlashMessage] = useState('')

  function onSubmitForm(event) {
    const jsonObj = {}
    event.preventDefault()
    // or directly e.target.inputEmail.value || e.target.elements.inputEmail.value
    // const data = new FormData(event.target)
    // data.forEach(function(value, key){
    //     jsonObj[key] = value;
    // });
    // console.log('onedata', data.get('confirm-password'))


    // for (var [key, value] of Object.entries(event.target.elements)) {
    //     if(value.value){
    //         jsonObj
    //         console.log(value.id, value.value)
    //     }else {
    //         console.log('null')
    //         //console.log(key, value?.value);
    //     }
    //    }
    console.log(typeof event.target.elements)
    fetch('/register', {
      method: 'POST',
      body: jsonObj,
    }).then(console.log('fetch Reached', jsonObj))


  }
  return (
    <Modal show={show} onHide={() => onCloseButton()} >
      <Modal.Header closeButton closeLabel='close'>
        <Modal.Title>{!register ? 'Sign In' : 'Register'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* LOGIN BODY */}

        {!register ? <Formik
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
                } else {
                  setLoginFlashMessage("")
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
              <div style={{ color: 'red' }}>{loginFlashMessage}</div>
              <br />
              <div class="form-group">
                <label for="inputEmail">Email address</label>
                <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter username" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
              </div>
              <br />
              <button type="submit" class="btn btn-primary">Login</button>
              <h6>Don't have an account <button className='btn btn-link float-right' onClick={() => onClickRegister()}>Register</button></h6>
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
                  } else {
                    setSignupFlashMessage("")
                  }
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
                <div class="form-group">
                  <div style={{ color: 'red' }}>{errors.username && touched.username && errors.username}</div>
                  <label for="username">Username</label>
                  <input type="text" class="form-control" placeholder="Enter username" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                </div>
                <div class="form-group">
                  <div style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</div>
                  <label for="inputEmail">Email address</label>
                  <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" placeholder="Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                </div>
                <div class="form-group">
                  <div style={{ color: 'red' }}>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</div>
                  <label for="confirm-password">Confirm Password</label>
                  <input type="password" class="form-control" placeholder="" name="confirmPassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                </div>
                <div class="form-group">
                  <label for="corporation">Corporation</label>
                  <input type="text" class="form-control" placeholder="optional" name="corporation" onChange={handleChange} onBlur={handleBlur} value={values.corporation} />
                </div>
                <br />
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" name="terms" onChange={handleChange} onBlur={handleBlur} value={values.terms} />
                  <label class="form-check-label" for="exampleCheck1">I agree to the and terms or service</label>
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Register</button>
              </form>
            )}
          </Formik>
        }
      </Modal.Body>
    </Modal>
  )
}
