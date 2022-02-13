import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CreateProject from '../createProject/CreateProject'
import Projectcard from '../projectcard/Projectcard'

export const Feed = (props) => {
  const [allProjects, setAllProjects] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/project/all')
      .then(res => setAllProjects(res?.data?.projects))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <CreateProject />
      {!loading && allProjects?.length > 0 &&
        allProjects.map((value, indexKey) => {
          return (
            <Projectcard project={value} key={indexKey} />
          )
        })}
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
