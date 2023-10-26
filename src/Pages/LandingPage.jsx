import React from 'react'
import { Row, Col,Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDetail } from '../apiCalls/allAPI';
import Details from './Details';

function LandingPage() {
  const [uploadDetailServerResponse,setUploadDetailServerResponse]=useState({})
  const navigateUrl = useNavigate()
  const [details,setDetails]=useState({
    rno:"",name:"",address:"",number:"",url:""
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpload=async ()=>{
    const {rno,name,address,number,url,}=details
    if(!rno || !name ||!url ||!address ||!number){
      toast.warning("Please complete the form !!!")
    }else{
      // make api call uploadDetails
      const response =await addDetail(details)
      console.log(response);
      if(response.status>=200 && response.status<300){
        // server Response setting
        setUploadDetailServerResponse(response.data)
        // reset video
        setDetails({
          rno:"",name:"",url:"",address:"",number:""
        })
        // console response
        toast.success(`${response.data.lname}'s Details uploaded successfully!!!`)
        // hide modal
        handleClose()
      }else{
        toast.error("cannot perform the upload operation")
      }
    }
  }
  return (
    <>
     <Details/>
      <div className='d-flex justify-content-center align-items-center'>
        <h1>Add new Student</h1>
        <button className='btn'onClick={handleShow}><i class="fa-solid fa-circle-plus fs-5"></i></button>
      </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Student details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>
           Please fill the following details !!!
         </p>
         <Form className='border border-secondary rounded p-3'>
          <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Register no" onChange={(e)=>setDetails({...details,rno:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Student Name" onChange={(e)=>setDetails({...details,name:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Address" onChange={(e)=>setDetails({...details,address:e.target.value})}/>
      </Form.Group>
            <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Contact number" onChange={(e)=>setDetails({...details,number:e.target.value})}/>
      </Form.Group>
            <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Control type="text" placeholder="Enter Profile Image Url" onChange={(e)=>setDetails({...details,url:e.target.value})}/>
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

export default LandingPage