import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Projectcard from '../projectcard/Projectcard'

export default function MyProjects (props) {
  const [projects, setProjects] = useState()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
