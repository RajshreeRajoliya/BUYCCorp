import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonMain from "./ButtonMain";
import { useNavigate } from "react-router-dom";
import {  FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice";

import { SearchDrawer } from "./SearchDrawer";
const Navbar = () => {
  const { auth, user } = useSelector((store) => store.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("deals");
  const [serachDrawerOpen, setSearchDrawerOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("userTokenBuyCars");
    dispatch(logoutUser());
  };
  return (
    <>
      <SimpleGrid
        bg="#6497b1"
        p={2}
        zIndex={5}
        width={"100%"}
        pos="fixed"
        columns={3}
        
      >
         <SearchDrawer 
         justifyContent={"space-between"}
         nav={true}
       sendSelected={(e)=>null}
        serachDrawerOpen={serachDrawerOpen}
        setSearchDrawerOpen={(e) => setSearchDrawerOpen(e)}
      />
        <Image
        onClick={()=>nav("/")}
          borderRadius={5}
          width={"70px"}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwev8kptV3CjV012q2BfQyL2xjWa9dOemYSQ&usqp=CAU"
        />
        
        <Flex gap={"2"}  alignItems={"center"} justifyContent={"flex-end"}  >
          <Button
              colorScheme="#d0e1f9"
              onClick={() => setSearchDrawerOpen(true)}
            ><p>Click To Search</p>
              <FaSearch />
            </Button>
            <Text
            style={
              current === "addnewdeal"
                ? { backgroundColor: " #283655", color: "white" }
                : null
            }
            p={2}
            textAlign={"center"}
            borderRadius={5}
            backgroundColor={" #ffcc5c"}
            fontWeight={"bolder"}
            _hover={{ bg: "orange", color: "white" }}
            onClick={() => [nav("/addnewdeal"),setCurrent("addnewdeal")]}
          >
           Add New Deal
          </Text>
          <Text
            style={
              current === "deals"
                ? { backgroundColor: "#ffcc5c", color: "black" }
                : null
            }
            p={2}
            textAlign={"center"}
            borderRadius={5}
            _hover={{ bg: "#ffcc5c", color: "black" }}
            onClick={() =>[ nav("/deals"),setCurrent("deals")]}
          >
            All Deals
          </Text>
           
        </Flex>
<Flex margin={"0 85%" }>
{!auth ? (
            <ButtonMain   onClick={() => nav("/login")} title={"Login"} />
          ) : (
            <>
              <Menu>
                <MenuButton as={"button"} >
                  <Avatar size="md" name={user.name} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleLogout()} >
                    <Text color="blue" colorScheme="red" >
                      Logout
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
</Flex>

      </SimpleGrid>
    </>
  );
};

export default Navbar;
