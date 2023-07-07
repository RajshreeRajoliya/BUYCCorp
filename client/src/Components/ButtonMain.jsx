import { Button } from "@chakra-ui/react";
import React from "react";
import {BeatLoader} from "react-spinners"
const ButtonMain = ({ title, onClick, width, loading,type }) => {

  //this is button component as for ui should be consistent through out the whole project and to make best out
  //of the react reuseablity of component a button copoment is made to use everywehere with required props
  return (
    <Button
    type={type}
    spinner={<BeatLoader size={"10px"} color="white"/>}
      width={width}
      isLoading={loading}
      colorScheme="blue"
      onClick={onClick}
      padding={"0 30px"}
    >
      {title}
    </Button>
  );
};

export default ButtonMain;
