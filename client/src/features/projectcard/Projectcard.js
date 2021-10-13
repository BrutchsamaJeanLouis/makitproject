import React from 'react'
import './Projectcard.css'

export default function Projectcard (props) {
  const project = props.project
  const { Likes, Location, Media, Funds } = project

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
  return (
    <div className='col-md-3' style={{ margin: '10px', minWidth: '300px' }}>
      <div className='card mb-3'>
        <h5 className='card-header'>
          <div className='user-circle-post'>.</div>
          <div className='post-user' style={{ display: 'inline-block' }}>
            My Username
            <p style={{ fontSize: '0.7em' }}>{project.createdAt}</p>
          </div>
        </h5>
        <div className='card-body' style={{ borderTopRightRadius: '50px' }}>
          <h5 className='card-title'>Product to make electricity infinite</h5>
          <p className='card-text'>With supporting text below as a natural lead-in to additional content.</p>
          <button href='#' className='btn btn-secondary'>Learn more</button>
        </div>
        <div className='card-footer'>
          <div className='float-end'>
            <i className='bi bi-chat-left-dots' style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }} />
            <i className='bi bi-hand-thumbs-up' style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }} />
            <i className='bi bi-hand-thumbs-down' style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }} />
          </div>
        </div>
        <div className='card-footer'>
          {/* <span style={{whiteSpace: 'nowrap'}}>
              <input className='form-control form-control-lg' placeholder='comment' style={{ display: 'inline' }}/>
              <button className='btn btn-primary' style={{display: 'inline' }}>Post</button>
            </span> */}

          <div className='input-group mb-3'>
            <input type='text' placeholder='comment' className='form-control form-control-lg' />
            <div className='input-group-prepend' style={{ alignItems: 'center', display: 'flex' }}>
              <button className='btn btn-primary' type='button' style={{ marginLeft: '10px' }}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
