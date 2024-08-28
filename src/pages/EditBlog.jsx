import React from 'react'
import NavBar from '../componet/NavBar'
import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditBlog from '../componet/EditBlog'

function EditBlogPage() {
    let { id } = useParams()
    let blog = useSelector(data=>{
        return data.blogs.blogs.find(blog => blog.id === id)
    })
  return (
    <> 

    <NavBar/>
    <EditBlog blog={blog}/>
    </>
  )
}

export default EditBlogPage