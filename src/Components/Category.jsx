import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal,Button,Form, Row, Col } from 'react-bootstrap';
import { addCategory, deleteCategories, getAllCategory, getAVideo, updateCategories } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';

function Category() {
  const [categoryName,setCategoryName] = useState("")
  const [show, setShow] = useState(false);
  const [allCategories,setAllCategories] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleAddCategory=async ()=>{
    if(categoryName){
      let body={
        categoryName,allVideos:[]
      }
      // make api call
      const response = await addCategory(body)
      console.log(response)
      if(response.status>=200 && response.status<300){
        // hide modal
        handleClose()
        // reset state
        setCategoryName("")
      }else{
        toast.error("Operation failed!!! Please try later")
      }
    }else
    {
      toast.warning("Please give a category name!!!..")
    }
  }
  const getCategories = async ()=>{
    // api call to get
    const {data} = await getAllCategory()
    setAllCategories(data);
  }
  console.log(allCategories);
  useEffect(()=>{
    getCategories()
  },[])
  
  const handleDelete =async (id)=>{
    await deleteCategories(id)
    getCategories()
  }

  // draggable portion 
  const dragOver = (e)=>{
    console.log("Video drag over category");
    e.preventDefault()
  }
  // accessing dragged data
  const videoDrop = async (e,categoryId)=>{
    console.log("Video Dropped inside category Id :"+categoryId);
    const videoId = e.dataTransfer.getData("videoId")
    console.log("video Card Id :",videoId);
    // api call to get the specific video detail
    const {data}= await getAVideo(videoId)
    // get category details
    const selectedCategory=allCategories?.find(item=>item.id===categoryId)
    selectedCategory.allVideos.push(data)
    console.log(selectedCategory);
    
    // api call to update category
    await updateCategories(categoryId,selectedCategory)
    getCategories()
  }
  return (
    <>
    <div className='d-grid ms-3'>
      <button className='btn btn-info' onClick={handleShow}>Add new Category</button>
    </div>
      {
        allCategories.length?allCategories?.map(item=>(
          <div className="m-5 border rounded p-3" droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
            <div className="d-flex justify-content-between align-items-center">
              <h6>{item?.categoryName}</h6>
              <button className='btn' onClick={()=>handleDelete(item?.id)}><i className="fa-solid fa-trash text-danger"></i></button>
              </div>
              <Row>
                {
                  item?.allVideos && item?.allVideos.map(card=>(
                    <Col sm={12}>
                      <VideoCard displayData={{card}} insideCategory={true}/>
                    </Col>
                  ))
                }
              </Row>
          </div>
        )):
        <p className='fw-bolder fs-5 text-danger'>No categories to display</p>
      }
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Category
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form className='border border-secondary rounded p-3'>
      <Form.Group className="mb-3" controlId="formVideoUpload">
        <Form.Label>Enter Category Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Catogory Name" onChange={(e)=>setCategoryName(e.target.value)}/>
      </Form.Group>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='btn btn-info' onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Category