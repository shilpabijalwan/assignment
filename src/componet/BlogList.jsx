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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  limit,
  startAfter,
  endBefore,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { setBlogs } from "../redux/slices/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";

const BlogList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);

  const blogs = useSelector((data) => data.blogs);
  const blogsPerPage = 2; // Set the number of blogs per page

  const fetchBlogs = async (direction = 'next') => {
    setLoading(true);
    try {
      let blogsQuery;
      const blogCollection = collection(firestore, "blogs");

      if (direction === 'next') {
        if (lastVisible) {
          blogsQuery = query(
            blogCollection,
            orderBy('posted', 'desc'),
            startAfter(lastVisible),
            limit(blogsPerPage)
          );
        } else {
          blogsQuery = query(blogCollection, orderBy('posted', 'desc'), limit(blogsPerPage));
        }
      } else if (direction === 'prev') {
        blogsQuery = query(
          blogCollection,
          orderBy('posted', 'desc'),
          endBefore(firstVisible),
          limit(blogsPerPage)
        );
      }

      const querySnapshot = await getDocs(blogsQuery);
      const total = await getDocs(blogCollection);
      setTotal(total.docs.length)

      if (querySnapshot.docs.length > 0) {
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setBlogs(blogsData));

        setFirstVisible(querySnapshot.docs[0]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        setIsPrevDisabled(direction === 'next' && querySnapshot.docs.length < blogsPerPage);
        setIsNextDisabled(querySnapshot.docs.length < blogsPerPage);
      }
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
      await deleteDoc(doc(firestore, "blogs", id));
      console.log("Blog post deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handleNextPage = () => {
    fetchBlogs('next');
  };

  const handlePrevPage = () => {
    fetchBlogs('prev');
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
    <>
      <Text fontWeight={"bold"} fontSize={20}>
        Total blogs: {total}
      </Text>
      <Stack spacing={8} mt={10} maxW={"100%"} display={"flex"} mb={6}>
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
                <Text noOfLines={2} mb={4}>
                  {blog.description}
                </Text>
              </Box>
            </Link>
          ))
        )}
      </Stack>
      <Box display="flex" justifyContent="space-between" mt="8" w={"60%"} m={"auto"} mb={8} >
        <Button onClick={handlePrevPage} disabled={isPrevDisabled}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={isNextDisabled}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default BlogList;
