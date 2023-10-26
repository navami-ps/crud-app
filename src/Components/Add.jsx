import React from 'react'
import { useState } from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import { addVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoServerResponse}) 
{
  const [video,setVideo]=useState({
    id:"",caption:"",url:"",embedLink:""
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getEmbedLink=(e)=>{
    const{value}=e.target
    if(value){
      const link =`https://www.youtube.com/embed/${value.slice(-11)}`
    setVideo({...video,embedLink:link})
  }else{
    setVideo({...video,embedLink:""})
  }
  }
  const handleUpload=async ()=>{
    const {id,caption,url,embedLink}=video
    if(!id || !caption ||!url ||!embedLink){
      toast.warning("Please complete the form !!!")
    }else{
      // make api call uploadVideo
      const response =await addVideo(video)
      console.log(response);
      if(response.status>=200 && response.status<300){
        // server Response setting
        setUploadVideoServerResponse(response.data)
        // reset video
        setVideo({
          id:"",caption:"",url:"",embedLink:""
        })
        // console response
        toast.success(`${response.data.caption} video uploaded successfully!!!`)
        // hide modal
        handleClose()
      }else{
        toast.error("cannot perform the upload operation")
      }
    }
  }
  return (
    <>
      <div className='d-flex align-items-center'>
        <h5>Upload a new video</h5>
        <button className='btn'onClick={handleShow}><i class="fa-solid fa-circle-plus fs-5"></i></button>
      </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload A Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>
           Please fill the following details !!!
         </p>
         <Form className='border border-secondary rounded p-3'>
          <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Video Id" onChange={(e)=>setVideo({...video,id:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Video Caption" onChange={(e)=>setVideo({...video,caption:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Video Image Url" onChange={(e)=>setVideo({...video,url:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter YouTube Link" onChange={getEmbedLink}/>
      </Form.Group>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='btn btn-info' onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2500} />
    </>
  )
}

export default Add