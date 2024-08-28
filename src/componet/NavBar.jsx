import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getAuth } from "firebase/auth";
const Links = [
  {
    title: "Home",
    link: "/",
  },
  
  {
    title: "Signup",
    link: "/signup",
  },
  {
    title: "Login",
    link: "/login",
  },
];

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user,setUser] = useState(null)

  const fetchUser = async () =>{
    let user = localStorage.getItem('user')
    // console.log(JSON.parse(user))
    user && setUser(JSON.parse(user))
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} w={"100%"}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          // border={"1px solid green"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack
            as={"nav"}
            w={"80%"}
            justifyContent={"space-around"}
            fontSize={"md"}
            fontWeight={"bold"}
            spacing={6}
            display={{ base: "none", md: "flex" }}
            // border={"1px solid green"}
            m={"auto"}
            textColor={"#BE5A38"}
          >
            {Links.map((link) => (
              <ChakraLink as={ReactRouterLink} to={link.link} key={link.link}>
                {link.title}
              </ChakraLink>
            ))}
            <Text>Email : {user?.email}</Text>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <ChakraLink as={ReactRouterLink} key={link.link} to={link.link}>
                  {link.title}
                </ChakraLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
