import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import AddDeal from "../Pages/AddDeal";
import DealsPage from "../Pages/DealsPage";
import PrivateRoute from "../Private/PrivateRoute";
import { Heading } from "@chakra-ui/react";

const AllRoutes = () => {
  //here with the help of react router dom all the routing has been done

  return (
    <Routes>
      {/* this is login route */}

      <Route element={<Login />} path="/login" />
      {/* this is signup route */}

      <Route element={<Signup />} path="/signup" />

      {/* this is private  route  whiich is higher order component as having child component
       becuase in add deal route will be only accesible to those people who are succesfully logined*/}
      <Route
        element={
          <PrivateRoute>
            <AddDeal />
          </PrivateRoute>
        }
        path="/addnewdeal"
      />
      <Route element={<DealsPage />} path="/" />

      {/* here all the deals are show on deals route */}
      <Route element={<DealsPage />} path="/deals" />
      <Route
        element={<Heading textAlign={"center"}>404 Not Found</Heading>}
        path="*"
      />
    </Routes>
  );
};

export default AllRoutes;
