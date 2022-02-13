import axios from 'axios'
import React, { useState } from 'react'
import './CreateProject.css'

export default function CreateProject (props) {
  // const project = props.project
  // const { Rating, Location, Media, Funds } = project
  const [projectName, setProjectName] = useState()
  const [projectDescription, setProjectDescription] = useState()

  const exampleProjectData = {
    id: 1,
    name: 'project1',
    description: ' this is the 1 created project',
    userID: 1,
    createdAt: '2021-10-13T10:10:26.555Z',
    updatedAt: '2021-10-13T10:10:26.555Z',
    Likes: [
      {
        id: 1,
        userID: 2,
        projectID: 1,
        createdAt: '2021-10-13T10:10:26.555Z',
        updatedAt: '2021-10-13T10:10:26.555Z',
        ProjectId: 1
      }
    ],
    Location: {
      id: 1,
      projectID: 1,
      address: '71 Street',
      city: 'Manchester',
      postcode: 'M1 6WH',
      country: 'United Kingdom',
      createdAt: '2021-10-13T10:10:26.556Z',
      updatedAt: '2021-10-13T10:10:26.556Z',
      ProjectId: 1
    },
    Media: [
      {
        id: 1,
        projectID: 1,
        mediaType: 'image',
        mediaUrl: 'https://picsum.photos/200/300',
        createdAt: '2021-10-13T10:10:26.556Z',
        updatedAt: '2021-10-13T10:10:26.556Z',
        ProjectId: 1
      }
    ],
    Funds: [
      {
        id: 1,
        amount: 20000,
        userID: 1,
        projectID: 1,
        createdAt: '2021-10-13T10:10:26.556Z',
        updatedAt: '2021-10-13T10:10:26.556Z',
        ProjectId: 1
      }
    ]
  }

  const postProject = () => {
    axios.post('/api/project/create', { name: projectName, description: projectDescription })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='col-md-12' style={{ margin: '10px', minWidth: '300px', paddingBottom: '40px' }}>
      <div className='card mb-3'>
        <span className='text-center'><h5>Create New Post</h5></span>
        <div class='input-group input-group-lg'>
          <span class='input-group-text' id='inputGroup-sizing-lg'>Title</span>
          <input type='text' class='form-control' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </div>
        <div className='card-body' style={{ borderTopRightRadius: '50px' }}>
          <textarea class='form-control' id='exampleFormControlTextarea1' rows='3' value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        </div>
        <div className='card-footer'>
          <div className='float-end'>
            <button type='button' class='btn btn-secondary'>
              <i class='bi bi-paperclip' />
              Add attachment
            </button>
          </div>
        </div>
        <div className='card-footer'>
          {/* <span style={{whiteSpace: 'nowrap'}}>
              <input className='form-control form-control-lg' placeholder='comment' style={{ display: 'inline' }}/>
              <button className='btn btn-primary' style={{display: 'inline' }}>Post</button>
            </span> */}

          <div className='input-group mb-3'>
            <div className='input-group-prepend' style={{ alignItems: 'center', display: 'flex' }}>
              <button className='btn btn-primary' type='button' style={{ marginLeft: '10px' }} onClick={() => postProject()}>Publish</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}
