
import CreateBlog from '../componet/CreateBlog'
import { Box } from '@chakra-ui/react'
import NavBar from '../componet/NavBar'

function CreateBlogPage() {
  return (
    <Box px={10}>
        <NavBar/>
        
        <CreateBlog/>
        </Box>
  )
}

export default CreateBlogPage