import React, { useState } from "react";
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
import { Api_Link, cssStyles, succesAlert } from "../Components/Reusable";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import ButtonMain from "../Components/ButtonMain";
import axios from "axios";
import { setUser } from "../Redux/authSlice";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";


import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const initial = { email: "", password: "" };
  const [userData, setUserData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async (token) => {

//this function is used to decode the token on frontend and take id from that 
//and then call the api for the user data and store is redux on succesfull login
    const decoded = jwtDecode(token);
    let { data } = await axios.get(`${Api_Link}/user/${decoded.id}`);
    dispatch(setUser(data.user));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
   
    try {
      setLoading(true);
      let { data } = await axios.post(`${Api_Link}/user/login`, userData);
    
      succesAlert(data.msg);
      if (data.token) {

        //if token is there only set token in localStorage and call user data 

        localStorage.setItem("userTokenBuyCars", data.token);
        getUserData(data.token);
        setUserData(initial);
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
      <Heading fontSize={cssStyles.medium} mb={3} mt={5}>
        Welcome Back !
      </Heading>
      <form onSubmit={handleLogin} action="">
        <SimpleGrid gap={4} m="auto">
          <Input
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            placeholder="Enter Your Email"
          />
          <InputGroup>
            <Input
              required
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
            required
            color="blue"
            fontWeight={500}
            textDecoration={"underline"}
            onClick={() => nav("/signup")}
          >
            Dont Have an account ? Create Now
          </Text>

          <ButtonMain
            loading={loading}
            type={"submit"}
            width={"fullwidth"}
            title={"Login Now"}
          />
        </SimpleGrid>
      </form>
    </Box>
  );
};

export default Login;
