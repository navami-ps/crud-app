import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

// api call for adding video
export const addVideo = async (reqBody)=>{
    // make POST http request to http://localhost:4000/videos to add video in json server and return response to Add component
    return await commonAPI("POST",`${serverURL}/videos`,reqBody)
}

// get all videos from json server
export const getAllVideo = async ()=>{
    // make GET http request to http://localhost:4000/videos to get all video in json server and return response to View component
    return await commonAPI("GET",`${serverURL}/videos`,"")
}

// get a single videos from json server
export const getAVideo = async (id)=>{
    // make GET http request to http://localhost:4000/videos/id to get a single video in json server and return response to videoCard component
    return await commonAPI("GET",`${serverURL}/videos/${id}`,"")
}

// delete a single videos from json server
export const deleteAVideo = async (id)=>{
    // make DELETE http request to http://localhost:4000/videos/id to remove a single video in json server and return response to videoCard component
    return await commonAPI("DELETE",`${serverURL}/videos/${id}`,{})//object type aanu delete cheyyumbo return cheyya
}

// api call for Storing watch video-history video
export const addToHistory = async (videoDetails)=>{
    // make POST http request to http://localhost:4000/history to add video history in json server and return response to Videocard component
    return await commonAPI("POST",`${serverURL}/history`,videoDetails)
}

// get all videos from json server
export const getAllHistory = async ()=>{
    // make GET http request to http://localhost:4000/history to get video history in json server and return response to watch-history component
    return await commonAPI("GET",`${serverURL}/history`,"")
}

// api call for add category in json server
export const addCategory = async (reqBody)=>{
    // make POST http request to http://localhost:4000/categories to add video categories in json server and return response to Catogory component
    return await commonAPI("POST",`${serverURL}/categories`,reqBody)
}

// get all categories from json server
export const getAllCategory = async ()=>{
    // make GET http request to http://localhost:4000/categories to get all categories in json server and return response to category component
    return await commonAPI("GET",`${serverURL}/categories`,"")
}

// delete a single videos from json server
export const deleteCategories = async (id)=>{
    // make DELETE http request to http://localhost:4000/categories/id to remove a single category in json server and return response to category component
    return await commonAPI("DELETE",`${serverURL}/categories/${id}`,{})//object type aanu delete cheyyumbo return cheyya
}

// update a category from json server
export const updateCategories = async (id,body)=>{
    // make put http request to http://localhost:4000/categories/id to update a particular category in json server and return response to category component
    return await commonAPI("PUT",`${serverURL}/categories/${id}`,body)//object type aanu delete cheyyumbo return cheyya
}


// delete watch history from json server
export const deleteHistory = async (id)=>{
    // make DELETE http request to http://localhost:4000/categories/id to remove a single category in json server and return response to category component
    return await commonAPI("DELETE",`${serverURL}/history/${id}`,{})//object type aanu delete cheyyumbo return cheyya
}