import React, {useState}  from 'react'
import { Link } from 'react-router-dom'
import Add from '../Components/Add'
import View from '../Components/View'
import Category from '../Components/Category'

function Home() {
  const [uploadVideoServerResponse,setUploadVideoServerResponse]=useState({})
  return (
    <>
    <div className="container mt-5 mb-5 d-flex justify-content-between align-items-center">
      <div className="add-videos">
        <Add setUploadVideoServerResponse={setUploadVideoServerResponse} />
      </div>
      <Link to={'/watch-historys'} className='text-decoration-none text-white'>Watch History</Link>
    </div>

    <div className="container-fluid mt-5 mb-5 d-flex justify-content-between">
      <div className="all-videos col-lg-9 col-xl-9">
        <h3>All Videos</h3>
        <View />
      </div>
      <div className="category col-lg-3 col-xl-3">
        <Category uploadVideoServerResponse={uploadVideoServerResponse}/>
      </div>
    </div>
    </>
  )
}

export default Home