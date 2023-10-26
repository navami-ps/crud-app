import React from 'react'
import { Card } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { useState } from 'react';
import { addToHistory, deleteAVideo } from '../services/allAPI';
function VideoCard({displayData,setRemoveVideoCard,insideCategory}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow =async () => {
      setShow(true)
      // make api call to localhost:4000/history
      const {caption,embedLink}=displayData
      let today = new Date()
      const timeStamp =new Intl.DateTimeFormat('en-US',{year:'2-digit',month:'2-digit',day:'2-digit',hour:"2-digit",minute:'2-digit',second:'2-digit'}).format(today);
      let videoDetails = {
        caption,embedLink,timeStamp
      }
      await addToHistory (videoDetails)
    };

    // delete a video
    const removeVideo = async(id)=>{
      // make api call
      const response = await deleteAVideo(id)
      setRemoveVideoCard(true)
    }

    const dragStarted = (e,id)=>{
      console.log("Drag started ...video Id:"+id);
      e.dataTransfer.setData("videoId",id)
    }
  return (
    <>
      <Card className='d-flex m-3' draggable onDragStart={(e)=>dragStarted(e,displayData?.id)}>
      <Card.Img onClick={handleShow} variant="top" src={displayData?.url} height={'180px'} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
          <h6>{displayData?.caption}</h6>
          {insideCategory?"":<button className='btn' onClick={()=>removeVideo(displayData?.id)}><i className="fa-solid fa-trash text-danger"></i></button>}
        </Card.Title>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{displayData?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe width="100%" height="491" src={`${displayData?.embedLink}?autoplay=1`} title={displayData?.caption} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></Modal.Body>
      </Modal>
    </>
  )
}

export default VideoCard