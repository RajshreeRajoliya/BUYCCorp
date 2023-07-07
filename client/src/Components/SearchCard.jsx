import { Box, Button, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { cssStyles } from "./Reusable";


const SearchCard = ({
  img,
  nameOfModel,
  power,
  yearOfModel,
  newPriceOfVehicle,
  maxSpeed,

  mileage,
  colors,
}) => {

  //this is the search card used for each  when user searches and get the results  and show on frontendby mapping
  //these search cards
  
  return (
    <Box
  
    _hover={{boxShadow:`rgba(0, 0, 0, 0.35) 0px 5px 15px;`}}
      cursor={"pointer"}
      m="auto"
      textAlign={"center"}
      borderRadius={4}
      p={4}
      boxShadow={cssStyles.boxShadow1}
    >
       
      <center>
        <Image
          textAlign={"center"}
          height={150}
          borderRadius={5}
          src={img}
          width={200}
        />
      </center>
      <Text>Name {nameOfModel}</Text>
      <Text>Year : {yearOfModel}</Text>
      <Text>New Price ₹ {newPriceOfVehicle}</Text>
  
      <SimpleGrid gap={2} columns={[2, 4]}>
        {colors.map((el) => (
          <Text
            pr={2}
            pl={2}
            color="transparent"
            fontSize={cssStyles.small}
            textAlign={"center"}
            borderRadius={4}
            bg={`${el}`}
          >
            erere
          </Text>
        ))}
      </SimpleGrid>
      <Text>Max Speed {maxSpeed} km/hr</Text>
      <Text>Mielage {mileage} /ltr</Text>
      <Text>Power {power} HP</Text>
    </Box>
  );
};

export default SearchCard;
