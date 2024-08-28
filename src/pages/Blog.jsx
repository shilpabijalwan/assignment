import { Box, Container, Heading, Text, Stack, Button, Divider, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../componet/NavBar';

const BlogPage = () => {
  let {id} = useParams()
  
  let blog = useSelector((data)=>{
    return data.blogs.blogs.find(blog=>blog.id===id)
  })
  // console.log(blog)
  if(!id || !blog)
    {
      return <div>Blog not found</div>
    }
  return (
    <> 
    <NavBar/>
    <Container Container maxW="container.md" py={8}>
      {/* Cover Image */}
      <Box mb={6} borderRadius="md" overflow="hidden">
        <Image src={blog.cover_img} alt={blog.title} objectFit="cover" width="100%" height="300px" />
      </Box>

      {/* Blog Content */}
      <Stack spacing={4}>
        <Heading as="h1" size="xl">{blog.title}</Heading>
        {/* <Text fontSize="lg" color="gray.600">By {blog.author} | {new Date(blog.posted).toLocaleDateString()}</Text> */}
        <Divider my={4} />
        <Text as="div" dangerouslySetInnerHTML={{ __html: blog.content }}></Text>
      </Stack>

      {/* Back to Blog List Button */}
      <Button mt={8} colorScheme="teal" onClick={() => window.history.back()}>
        Back to Blog List
      </Button>
    </Container>
    </>

  );
};

export default BlogPage;
