import React, { useEffect } from 'react'
import axios from 'axios'
import Projectcard from '../projectcard/Projectcard'
import { useDispatch, useSelector, connect } from 'react-redux'
import { setProjects } from './myProjectsSlice'

function MyProjects (props) {
  const projects = props.myProjects || []

  console.log('props FROM PROJECT VIEW ', props)

  // const userState = useSelector((rootState) => {
  //   return rootState.session.user
  // })
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: '/api/project/get'
  //   })
  //     .then((response) => {
  //       console.log('projects fetched responce', response)
  //       if (response.data?.projects && response.data.projects.length !== 0) {
  //         dispatch(setProjects(response.data.projects))
  //       }
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error)
  //     })
  //   console.log('projectView Mounted the DOM > projectState:', projects)
  // }, [dispatch])

  return (

    <div>
      {projects?.length === 0
        ? <div className='text-center py-5'>You haven't posted any projects yet <a href='/projects/create'>create</a></div>
        : projects.map((value, indexKey) => {
          return (
            <Projectcard project={value} key={indexKey} editable />
          )
        })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  myProjects: state.myProjects.projects
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects)
