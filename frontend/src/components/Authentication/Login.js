
import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, InputGroup, InputRightElement,VStack } from '@chakra-ui/react';
import React, {useState} from 'react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  
  const [show, setShow]=useState(false);
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [loading, setLoading] =useState(false);
  const toast=useToast();
  const history =useHistory();
  const { setUser } = ChatState();
  const handleClick= ()=>setShow(!show);

    const submitHandler =async() =>{
      setLoading(true);
      if(!email||!password){
        toast({
          title: "Please Fill All the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

      try{
        const config={
          headers:{
            "Content-type": "application/json",
          },
        };
        const {data}= await axios.post(
          "/api/user/login",
          {email,password},
          config
        );

        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setUser(data);
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
      }catch(error){
        console.error("Login error:", error.response.data); // Added error logging

        toast({
          title: "Error Occurred! ",
         description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };


  return (<VStack spacing={"5px"} color={"Black"}>
  
  <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      

       <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=>{
            setEmail("guest@example.com");
            setPassword("123456");
        }}
        
      >
       Get Guest Users Credentials
      </Button>
  </VStack>
  );
}

export default Login;
