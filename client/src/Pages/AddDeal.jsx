import React, { useRef, useState } from "react";
import { SearchDrawer } from "../Components/SearchDrawer";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import ButtonMain from "../Components/ButtonMain";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Api_Link,
  cssStyles,
  errorAlert,
  infoAlert,
  succesAlert,
  uploadFilesFunction,
} from "../Components/Reusable";

const AddDeal = () => {
  const [serachDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [checkedOne, setCheckedOned] = useState("");
  let [des, setDes] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const initial = {
    km: "",
    majorScratches: "",
    price: "",
    orginalPaint: "",
    accidents: "",
    prevBuyers: "",
    registrationPlace: "",
    oemId: "",
    userId: "",
    img: "",
    title: "",
  };

  const { user } = useSelector((store) => store.auth);

  const [inventoryData, setInventoryData] = useState(initial);
  const inputRef = useRef(null);

  const handleDeal = async (e) => {
    e.preventDefault();

    inventoryData.des = des;
    inventoryData.userId = user._id;
    
    inventoryData.oemId = checkedOne.id;

    if (des.length === 0) {
      //this block is used to check if des is empty show alert that you need to add description
      errorAlert("Description Cant Be empty");
      return;
    }
    if (!inventoryData.oemId ) {
      //this block is use to that to populate data from the backend we need some refernece of oem model so if
      //that is not selected then errorAlert

      errorAlert("Please Select Some Original Equipment Manufacturers");
      return;
    }
    setLoading(true);

    //this upload file function will async so it wil wait and take time to get the image url and after that wil
    //return and used as inventory item image

    try {
      let { data } = await axios.post(`${Api_Link}/inventory/addinventory`, inventoryData);
      succesAlert(data.msg);

      setInventoryData(initial);

      setDes([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    //this will delete the description object from the des by filtering them on the base of i
    des = des.filter((el) => el.id !== id);
    setDes(des);
  };

  const addDes = () => {
    if (description.length === 0) {
      //if desscription lengt is small then error or if its empty
      infoAlert("Description is Too Short");
      return;
    }

    //here i have used spread operator which indicates when every new description obj is added
    // prv all des are used and spread in the new array along with the new one

    setDes([...des, { description, id: des.length + 1 }]);
    setDescription("");
  };

  return (
    <Box
      borderRadius={4}
      boxShadow={cssStyles.boxShadow1}
      p={4}
      m="auto"
      width={["330px", "500px"]}
    >
      <Heading>Add New Deal </Heading>

      <SearchDrawer
        sendSelected={(e) => setCheckedOned(e)}
        serachDrawerOpen={serachDrawerOpen}
        setSearchDrawerOpen={(e) => setSearchDrawerOpen(e)}
      />
      <form onSubmit={handleDeal}>
        <SimpleGrid gap={2}>
          <Input
            type="text"
            required
            value={inventoryData.title}
            onChange={(e) =>
              setInventoryData({ ...inventoryData, title: e.target.value })
            }
            placeholder="Enter Title"
          />
          <Input
            type="number"
            required
            value={inventoryData.km}
            onChange={(e) =>
              setInventoryData({ ...inventoryData, km: e.target.value })
            }
            placeholder=" KMs on Odometer"
          />
          <Flex
            flexDirection={["column", "row"]}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Text
              p={1}
              pl={2}
              pr={2}
              borderRadius={4}
              bg={!checkedOne.nameOfModel ? "red" : "green"}
              color="white"
            >
              {checkedOne.nameOfModel ||
                "No Original Equipement Manufacture Selected"}
            </Text>
            <Button
              colorScheme="green"
              onClick={() => setSearchDrawerOpen(true)}
            >
              <FaSearch />
            </Button>
          </Flex>

          <Box justifyContent={"space-between"}>
            <Input
              mb={3}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
            <ButtonMain onClick={() => addDes()} title="Add Description" />
            {des.map((el) => (
              <Flex
                m={2}
                borderRadius={4}
                alignItems={"center"}
                bg="pink"
                justifyContent={"space-around"}
              >
                <Text key={el.id}>{el.description}</Text>
                <CloseButton
                  _hover={{ bg: "transparent" }}
                  fontWeight={"bold"}
                  color="red"
                  onClick={() => handleDelete(el.id)}
                />
              </Flex>
            ))}
          </Box>

          <Input
            required
            placeholder={"Enter Car Image Url"}
            type="url"
            value={inventoryData.img}
            onChange={(e) =>
              setInventoryData({
                ...inventoryData,
                img: e.target.value,
              })
            }
          />

          <Select
            required
            value={inventoryData.majorScratches}
            onChange={(e) =>
              setInventoryData({
                ...inventoryData,
                majorScratches: e.target.value,
              })
            }
            placeholder="Major Scratches"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>

          <Input
            type="number"
            required
            value={inventoryData.price}
            onChange={(e) =>
              setInventoryData({ ...inventoryData, price: e.target.value })
            }
            placeholder="Enter Price"
          />

          <Input
            type="text"
            required
            value={inventoryData.orginalPaint}
            onChange={(e) =>
              setInventoryData({
                ...inventoryData,
                orginalPaint: e.target.value,
              })
            }
            placeholder="Original Paint"
          />
          <Input
            type="number"
            required
            value={inventoryData.accidents}
            onChange={(e) =>
              setInventoryData({ ...inventoryData, accidents: e.target.value })
            }
            placeholder="Number of accidents reported"
          />
          <Input
            type="number"
            required
            value={inventoryData.prevBuyers}
            onChange={(e) =>
              setInventoryData({ ...inventoryData, prevBuyers: e.target.value })
            }
            placeholder="Number of previous buyers"
          />

          <Input
            type="text"
            required
            value={inventoryData.registrationPlace}
            onChange={(e) =>
              setInventoryData({
                ...inventoryData,
                registrationPlace: e.target.value,
              })
            }
            placeholder="Registration Place"
          />
          <ButtonMain loading={loading} type={"submit"} title={"Add Deal"} />
        </SimpleGrid>
      </form>
    </Box>
  );
};

export default AddDeal;
