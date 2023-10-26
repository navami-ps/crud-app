import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

// api call for adding video
export const addDetail = async (reqBody)=>{
    // make POST http request to http://localhost:4000/videos to add video in json server and return response to Add component
    return await commonAPI("POST",`${serverURL}details`,reqBody)
}

// get all videos from json server
export const getAllDetail = async ()=>{
    // make GET http request to http://localhost:4000/videos to get all video in json server and return response to View component
    return await commonAPI("GET",`${serverURL}details`,"")
}

// get a single videos from json server
export const getADetail = async (id)=>{
    // make GET http request to http://localhost:4000/videos/id to get a single video in json server and return response to videoCard component
    return await commonAPI("GET",`${serverURL}details/${id}`,"")
}

// delete a single videos from json server
export const deleteADetail = async (id)=>{
    // make DELETE http request to http://localhost:4000/videos/id to remove a single video in json server and return response to videoCard component
    return await commonAPI("DELETE",`${serverURL}details/${id}`,{})//object type aanu delete cheyyumbo return cheyya
}

// update a category from json server
export const updateDetail = async (id,body)=>{
    // make put http request to http://localhost:4000/categories/id to update a particular category in json server and return response to category component
    return await commonAPI("PUT",`${serverURL}details/${id}`,body)//object type aanu delete cheyyumbo return cheyya
}
