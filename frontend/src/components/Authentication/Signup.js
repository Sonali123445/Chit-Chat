import { Button } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, InputGroup, InputRightElement,VStack } from '@chakra-ui/react';
import React, {useState} from 'react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import {useHistory} from "react-router-dom";

const Signup = () => {
    const [show, setShow]=useState(false);
    const [name, setName]= useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmpassword, setConfirmpassword]=useState("");
    const [pic, setPic]=useState("");
    const [loading, setLoading] =useState(false);
    const toast = useToast();
    const history=useHistory();
    const handleClick= ()=>setShow(!show);

    const postDetails = (pics) => {
     
       setLoading(true);
       if(pics === undefined ){
          toast({
          title: 'Please select an image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
       }

       if(pics.type==="image/jpeg"||pics.type==="image/png"){
         const data=new FormData();
         data.append("file",pics);
         data.append("upload_preset","chat-app");
         data.append("cloud_name","dogpyhbt6" );
         console.log("Uploading to Cloudinary...");
         fetch("https://api.cloudinary.com/v1_1/dogpyhbt6/image/upload",{
           method: 'POST',
           body: data,
         })
         .then((res)=> res.json() )
         .then((data) => {
          console.log("Received response:", data);
           setPic(data.url.toString());
           console.log(data.url.toString());
           setLoading(false);
         })
         .catch((err)=>{
           console.log(err);
           setLoading(false);
         });

       }else{
         toast({
          title: 'Please select an image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
       } 
    };

    const submitHandler =async() =>{
      setLoading(true);
      if(!name||!email||!password||!confirmpassword){
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

      if (password !== confirmpassword) {
            toast({
             title: "Passwords do not match",
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
          "/api/user",
          {name,email,password,pic},
          config
        );
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
      }catch(error){
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


  return( <VStack spacing={"5px"} color={"Black"}>Signup
  <FormControl id="first-name" isRequired>
    <FormLabel>Name</FormLabel>
    <Input
       placeholder="Enter Your Name"
       onChange={(e)=>setName(e.target.value)}
    />
  </FormControl>
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
            value= {password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

       <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading ={loading}
      >
        Sign Up
      </Button>
      
  </VStack>
  );
};

export default Signup;
