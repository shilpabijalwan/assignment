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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Loading } from '../redux/slices/AuthSlice'

// const auth = getAuth(app);

function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const initialRef = useRef();
  const toast = useToast();

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

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      dispatch(Loading(true));
      await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res, "login");
          let {_tokenResponse} = res
          localStorage.set('_token',_tokenResponse.idToken)
          reset();
          toast({
            title: "user login Successfuly",
            status: "success",
            isClosable: true,
            duration: 1000,
          });
          dispatch(Loading(false));
          navigate("/");
        })
        .catch((err) => {
          toast({
            title: err.code,
            status: "error",
            isClosable: true,
            duration: 1000,
          });
        });
    } catch (error) {
      console.log(error)
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
          Login your Account
        </Text>
        <form onSubmit={handleSubmit(handleLogin)}>
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
              Login
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

export default Login;
