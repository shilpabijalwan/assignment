import React from 'react'
import NavBar from '../componet/NavBar'
import BlogList from '../componet/BlogList'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'


import { Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
        <NavBar/>
        <Link to={"/create_blog"}>
        <Box ml={16} mt={18}>  <Button position={'absolute'} right={10} bottom={0} height={50} w={50} borderRadius={"50%"} colorScheme='teal'><AddIcon boxSize={6} /></Button></Box>
        </Link>
        <BlogList/>
        </div>
  )
}

export default HomePage