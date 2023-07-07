import jwtDecode from "jwt-decode";
import {
  Box,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import ButtonMain from "../Components/ButtonMain";
import { Api_Link, cssStyles, succesAlert } from "../Components/Reusable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/authSlice";

import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initial = { name: "", email: "", password: "" };
  const [userData, setUserData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const getUserData = async (token) => {
    
//this function is used to decode the token on frontend and take id from that 
//and then call the api for the user data and store is redux on succesfull signup

    const decoded = jwtDecode(token);
    let { data } = await axios.get(`${Api_Link}/user/${decoded.id}`);
    dispatch(setUser(data.user));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post(`${Api_Link}/user/register`, userData);

      setUserData(initial);
      succesAlert(data.msg);
      if (data.token) {
         
        //if token is there only set token in localStorage and call user data 
        localStorage.setItem("userTokenBuyCars", data.token);

        getUserData(data.token);
        nav("/deals");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box
      width={["330px", "400px"]}
      m="auto"
      p={5}
      borderRadius={5}
      boxShadow={cssStyles.boxShadow1}
    >
      <center>
        <Image src="https://attryb.com/assets/attrybNavLog.svg" />
      </center>
      <Heading mt={5} fontSize={cssStyles.medium} mb={3}>
        Signup Now
      </Heading>
      <form onSubmit={handleSignup} action="">
        <SimpleGrid gap={4} m="auto">
          <Input
            required
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            type="text"
            placeholder="Enter Your Name"
          />
          <Input
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            placeholder="Enter Your Email"
          />
          <InputGroup>
            <Input
              required
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
            />
            <InputRightElement onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </InputRightElement>
          </InputGroup>
          <Text
            cursor={"pointer"}
            color="blue"
            fontWeight={500}
            textDecoration={"underline"}
            onClick={() => nav("/login")}
          >
            Already Have an account ? Login Now
          </Text>
          <ButtonMain
            loading={loading}
            type={"submit"}
            width={"full"}
            title={"Signup Now"}
          />
        </SimpleGrid>
      </form>
    </Box>
  );
};

export default Signup;
