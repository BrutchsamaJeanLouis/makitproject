import React, { useState } from 'react'
import { Button, Overlay, OverlayTrigger, Popover } from 'react-bootstrap'
import './Projectcard.css'

const optionsPopover = (props) => {
  return (
    <Popover key={2049539} className='pop' id='popover-basic'>
      <Popover.Header as='h3'>Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  )
}

export default function Projectcard (props) {
  const [showOptions, setShowOptions] = useState(false)
  const { project, editable } = props
  const { Rating, Location, Media, Funds, User, Comments } = project

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
          <div className='user-circle-post' style={{ color: 'white' }}>{User.username.charAt(0).toUpperCase()}</div>
          <div className='post-user' style={{ display: 'inline-block' }}>
            {User.username}
            <p style={{ fontSize: '0.7em' }}>{project.createdAt}</p>
          </div>
          {editable &&
            <div className='float-end' style={{ cursor: 'pointer' }}>
              <i class='bi bi-three-dots-vertical' />
            </div>}
        </h5>
        <div className='card-body' style={{ borderTopRightRadius: '50px' }}>
          <h5 className='card-title'>{project.name}</h5>
          <p className='card-text'>{project.description}</p>
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
