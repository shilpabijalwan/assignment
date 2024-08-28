import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NavBar from './NavBar';

const CreateBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const [editorContent, setEditorContent] = useState('');
  const [coverImgBase64, setCoverImgBase64] = useState('');
  const toast = useToast();

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
      await addDoc(collection(firestore, 'blogs'), {
        ...data,
        cover_img: coverImgBase64,
        // description: description,
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

      // Reset form fields
      reset();
      setEditorContent('');
      setCoverImgBase64('');
    } catch (error) {
      console.error('Error creating post: ', error);
      toast({
        title: 'Error',
        description: 'There was an error creating your post.',
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
            placeholder="Enter the blog shor description"
            {...register('description', { required: true })}
          />
        </FormControl>

        <FormControl isRequired mb="4">
          <FormLabel>Cover Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
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
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default CreateBlog;
