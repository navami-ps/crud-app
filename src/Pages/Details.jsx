import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteADetail, getAllDetail } from '../apiCalls/allAPI'

function Details() {
  const [details,setDetails]=useState([])
  const handleDetails = async()=>{
    // make api call
    const {data} = await getAllDetail()
    setDetails(data);
  }
  console.log(details)
  useEffect(()=>{
    handleDetails()
  },[])
  const handleDeleteDetail = async (id)=>{
    // make api call 
    await deleteADetail(id)
    // get remaining history
    handleDetails()
  }
  return (
    <>
      <div className="container mt-5 mb-5 d-flex justify-content-between">
        <h3>Student List</h3>
        <Link to={'/Home'} style={{textDecoration:'none',fontSize:'20px',color:'white'}}><i class="fa-solid fa-arrow-left"></i>Main page</Link>
      </div>
      <table className='table mt-5 mb-5 container'>
        <thead>
          <tr>
            <th>#</th>
            <th>Register number</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact number</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            details.length?details?.map((item,index)=>(
            <tr key={index}>
            <td className='pt-5'>{index+1}</td>
            <td className='pt-5'>{item?.rno}</td>
            <td className='pt-5'>{item?.name}</td>
            <td className='pt-5'>{item.address}</td>
            <td className='pt-5'>{item.number}</td>
            <td><img src={item.url} height={'150px'} width={'150px'} alt="" /></td>
            <td className='pt-5'><button className='btn' onClick={()=>handleDeleteDetail(item?.id)}><i className="fa-solid fa-trash text-danger"></i></button></td>
          </tr>
          )):<p className='fw-bolder fs-5 text-danger'>Nothing to display!!!</p>
          }
        </tbody>
      </table>
    </>
  )
}
export default Details