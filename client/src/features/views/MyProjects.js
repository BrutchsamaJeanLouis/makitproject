import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Projectcard from '../projectcard/Projectcard'
import { useDispatch } from 'react-redux'

export default function MyProjects (props) {
  const [projects, setProjects] = useState()

  // const userState = useSelector((rootState) => {
  //   return rootState.session.user
  // })
  const dispatch = useDispatch()

  useEffect(() => {
    axios({
      method: 'get',
      url: '/projects/get'
    })
      .then((response) => {
        console.log('projects fetched', response)
        if (response.data?.projects && response.data.projects.length !== 0) {
          setProjects(response.data.projects)
        }
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
    console.log('projectView Mounted the DOM > projectState:', projects)
  }, [dispatch])

  return (

    <div>
      {!projects
        ? <div>You haven't posted any projects yet</div>
        : projects.map((value, indexKey) => {
          return (
            <Projectcard project={value} key={indexKey} />
          )
        })}
    </div>
  )
}
