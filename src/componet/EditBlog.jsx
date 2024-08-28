import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebase';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';

const EditBlog = ({ blog }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editorContent, setEditorContent] = useState(blog?.content || '');
  const [coverImgBase64, setCoverImgBase64] = useState(blog?.cover_img || '');
  const toast = useToast();
  const navigate = useNavigate()

  // Set initial form values if `blog` prop is provided
  useEffect(() => {
    if (blog) {
      setValue('title', blog.title);
      setValue('description', blog.description);
      setEditorContent(blog.content);
      setCoverImgBase64(blog.cover_img);
    }
  }, [blog, setValue]);

  // Convert image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImgBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (blog) {
        // Update the existing blog post
        const docRef = doc(firestore, 'blogs', blog.id);
        await updateDoc(docRef, {
          ...data,
          cover_img: coverImgBase64,
          content: editorContent,
          updated: new Date(),
        });

        toast({
          title: 'Post updated.',
          description: 'Your blog post has been successfully updated!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Create a new blog post
        await addDoc(collection(firestore, 'blogs'), {
          ...data,
          cover_img: coverImgBase64,
          content: editorContent,
          posted: new Date(),
        });

        toast({
          title: 'Post created.',
          description: 'Your blog post has been successfully created!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

      // Reset form fields
      // reset();
      // setEditorContent('');
      // setCoverImgBase64('');
      navigate('/')
      
    } catch (error) {
      console.error('Error submitting post: ', error);
      toast({
        title: 'Error',
        description: `There was an error ${blog ? 'updating' : 'creating'} your post.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired mb="4">
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            placeholder="Enter the blog title"
            {...register('title', { required: true })}
          />
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Short Description</FormLabel>
          <Input
            type="text"
            placeholder="Enter the blog short description"
            {...register('description', { required: true })}
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Cover Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {coverImgBase64 && (
            <Box mt="4">
              <img src={coverImgBase64} alt="Cover" width="100%" />
            </Box>
          )}
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Content</FormLabel>
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
            }}
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" size="lg" mt="4">
          {blog ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </Box>
  );
};

export default EditBlog;
