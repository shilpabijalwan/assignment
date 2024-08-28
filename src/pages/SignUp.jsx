import { BeatLoader } from "react-spinners";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  useToast,
  Toast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
import {  useNavigate } from "react-router-dom";
import { Loading } from "../redux/slices/AuthSlice";

const auth = getAuth(app);

function SignUp() {
    const navigate = useNavigate();
  const initialRef = useRef();
  const toast = useToast();
  const dispatch=useDispatch()

    const isLoading = useSelector((data) => {
      return data.auth.isLoading;
    });


  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {

    const { email, password } = data;
  
    try {
        dispatch(Loading(true));
      await createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          if (res) {
            reset()
            toast({
              title:"account created successfuly",
              status: "success",
              isClosable: true,
              duration: 1000,
            });
            dispatch(Loading(false));
            navigate('/');
          }
        })
        .catch((err) => {
          console.log("err", err.code);
        
          toast({
            title: err?.code,
            status: "error",
            isClosable: true,
            duration: 1000,
          });
          dispatch(Loading(false));
        });
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box width={{ base: "100%", md: "50%", lg: "45%" }} mx="auto">
       
      <Box
        m={"auto"}
        mt={18}
        className="SignUpBox"
        p={10}
        width={{ base: "70%", md: "100%", lg: "100%" }}
      >
        <Text
          fontSize={"26px"}
          textAlign={"center"}
          mb={6}
          color={"#FF6663"}
          fontWeight={"bold"}
        >
          Sign up your Account
        </Text>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <FormControl isInvalid={errors.email} mb={4}>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              focusBorderColor="gray.100"
              id="email"
              type="email"
              {...register("email", { required: "email is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mb={4}>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              focusBorderColor="gray.100"
              id="password"
              type={show ? "text" : "password"}
              {...register("password", { required: "password is required" })}
            />
            <p onClick={() => setShow((pre) => !pre)}>
              {show ? "hide" : "show"}
            </p>

            <FormErrorMessage color={"red"}>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {!isLoading ? (
            <Button
              type="submit"
              width="full"
              style={{ backgroundColor: "#FF6663" }}
              color={"white"}
            >
              Sign up
            </Button>
          ) : (
            <Button
              isLoading
              width="full"
              color={"white"}
              colorScheme="teal"
              spinner={<BeatLoader size={8} color="white" />}
            >
              Click me
            </Button>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
