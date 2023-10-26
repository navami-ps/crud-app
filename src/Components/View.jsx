import React from 'react'
import VideoCard from './VideoCard'
import { Col, Row } from 'react-bootstrap'
import { getAllVideo } from '../services/allAPI';
import { useEffect } from 'react';
import { useState } from 'react';

function View({uploadVideoServerResponse}){
  const [removeVideoCard,setRemoveVideoCard] =useState(false)
  const [allVideos,setAllVideos]=useState([])
  const getAllUploadedVideos = async ()=>{
    // make api call
    const {data} = await getAllVideo()
    setAllVideos(data)
  }

  useEffect(()=>{
    getAllUploadedVideos()
    setRemoveVideoCard(false)

  },[uploadVideoServerResponse,removeVideoCard])
  console.log(allVideos)
  return (
    <p>
      <Row>
       {
        allVideos.length>0?
        allVideos.map(video=>(
        <Col sm={12} md={6} lg={4} xl={3}>
          <VideoCard displayData={video} setRemoveVideoCard={setRemoveVideoCard}/>
        </Col>)) :
        <p className='fw-bolder fs-5 text-danger'>Nothing to display</p>}
      </Row>
    </p>
   
  )
}

export default View