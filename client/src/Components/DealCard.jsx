import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Api_Link, cssStyles, succesAlert } from "./Reusable";

import { Accordian } from "./Accordian";
import { useSelector } from "react-redux";
import axios from "axios";
import { EditModal } from "./EditModal";

const DealCard = ({
  oemId,
  img,
  _id,
  accidents,
  km,
  des,
  price,
  prevBuyers,
  userId,
  orginalPaint,
  registrationPlace,
  majorScratches,
  title,
  calldata,
  currentFilter,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  //this is the deal card component which shows all the details of the particular deal

  const handlePostDelete = async (id) => {
    //this handlepostdelete function is used to delete the particular post

    try {
      setLoading(true);
      let { data } = await axios.delete(`${Api_Link}/inventory/${id}`);
      succesAlert(data.msg);
      setLoading(false);
      calldata();
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Box
      minW={"300px"}
      fontSize={"15px"}
      _hover={{ boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;` }}
      cursor={"pointer"}
      m="auto"
      textAlign={"center"}
      borderRadius={4}
      bg={"#ffcc5c"}
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
      <Text>Title {title}</Text>
      <Text>Name {oemId.nameOfModel}</Text>
      <Text>Year : {oemId.yearOfModel}</Text>
      {/* here conditional renderingis done to show the update ui accoding to updated filter with new styles */}
      <Text
        style={
          currentFilter === "price"
            ? {
                backgroundColor: "green",
                boxShadow: cssStyles.boxShadow1,
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                margin: "5px",
              }
            : null
        }
      >
        Price ₹ {price}
      </Text>
      {/* here all the colors have been map with there required colors value */}
      <SimpleGrid gap={2} columns={[2, 4]}>
        {oemId.colors.map((el) => (
          <Text
            key={Math.random() * 34343}
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
      <Text>Max Speed {oemId.maxSpeed} km/hr</Text>
      <Text
        style={
          currentFilter === "mileage"
            ? {
                backgroundColor: "green",
                boxShadow: cssStyles.boxShadow1,
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                margin: "5px",
              }
            : null
        }
      >
        Mielage {oemId.mileage} /ltr
      </Text>
      <Text>Power {oemId.power} HP</Text>

      {/* here we have take userId from redux and checking with deal userId if they both are same this means
      this particular deal post have been done by logined user and he can delete and update the same post */}

      {user._id && user._id === userId && userId ? (
        <Flex m={2} justifyContent={"space-around"}>
          <Button
            isLoading={loading}
            onClick={() => handlePostDelete(_id)}
            colorScheme="red"
          >
            Delete
          </Button>

          {/* this is edit modal button which on clicking make editmodalOpen with the help of manuplation
          using useState */}
          
          <Button onClick={() => setEditModalOpen(true)} colorScheme="green">
            Edit
          </Button>
        </Flex>
      ) : null}
      <Accordian
        title={title}
        majorScratches={majorScratches}
        accidents={accidents}
        des={des}
        price={price}
        originalPaint={orginalPaint}
        prevBuyers={prevBuyers}
        km={km}
      />

      <EditModal
        id={_id}
        callData={() => calldata()}
        editModalOpen={editModalOpen}
        setEditModalOpen={(e) => setEditModalOpen(e)}
      />
    </Box>
  );
};

export default DealCard;
