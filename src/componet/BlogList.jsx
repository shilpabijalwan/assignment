import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image, 
  Heading,
  VStack,
  Spinner,
  Center,
  Stack,
  Button,
} from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { setBlogs } from "../redux/slices/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const BlogList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const blogs = useSelector((data) => {
    return data.blogs;
  });
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "blogs"));
      const blogsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        //   posted: doc.posted.toDate()
      }));
      dispatch(setBlogs(blogsData));

      console.log(blogsData);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (e, id) => {
    e.preventDefault();
    navigate(`/edit/${id}`);
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const res = await deleteDoc(doc(firestore, "blogs", id));
      console.log("Blog post deleted successfully");
      if (res) {
        toast({
          title: "Blog post deleted successfully",
          status: "success",
          isClosable: true,
          duration: 1000,
        });
        fetchBlogs();
      }
    } catch (error) {
      toast({
        title: error?.code,
        status: "error",
        isClosable: true,
        duration: 1000,
      });
      console.error("Error deleting blog post:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Stack spacing={8} mt={10} maxW={"100%"} display={"flex"}>
    
      {blogs.blogs?.length === 0 ? (
        <Text>No blogs available.</Text>
      ) : (
        blogs.blogs?.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <Box
              key={blog.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              w="100%"
              maxW="600px"
              m={"auto"}
            >
              <Box display={"flex"} w={"100%"} justifyContent={"space-between"}>
                {blog.cover_img && (
                  <Image
                    src={blog.cover_img}
                    alt={blog.title}
                    mb={4}
                    borderRadius="lg"
                    w={"170px"}
                  />
                )}
                <Button
                  colorScheme="teal"
                  ml={10}
                  onClick={(e) => handleEdit(e, blog.id)}
                >
                  <EditIcon />
                </Button>
                <Button
                  colorScheme="red"
                  ml={10}
                  onClick={(e) => handleDelete(e, blog.id)}
                >
                  <DeleteIcon />
                </Button>
              </Box>
              <Heading fontSize="xl" mb={4}>
                {blog.title}
              </Heading>

              {/* <Text mb={4} fontWeight="bold">{`By ${blog.author}`}</Text> */}
              <Text noOfLines={2} mb={4}>
                {blog.description}
              </Text>
              {/* <Text as="div" dangerouslySetInnerHTML={{ __html: blog.content }}></Text> */}
            </Box>
          </Link>
        ))
      )}
       
    </Stack>
  );
};

export default BlogList;
