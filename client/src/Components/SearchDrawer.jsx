import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Input,
  Text,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Link, cssStyles, succesAlert } from "./Reusable";

import SearchCard from "./SearchCard";
import Loader from "./Loader";
export const SearchDrawer = ({
  nav,
  serachDrawerOpen,
  setSearchDrawerOpen,
  sendSelected,
}) => {
  const [search, setSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const [loading,setLoading]=useState(false)
  const [data, setData] = useState([]);

  //in this component we have implemented debouncing for searching and used firstrender usestate 
  //so that we can prevent to call the api when component is firstly rendered

  const getSearchData = async () => {
    try {
      setLoading(true)
      let { data } = await axios.get(`${Api_Link}/oem/getspecs?search=${search}`);
     
      setData(data.specs);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };
  useEffect(() => {

    //in this useEffect we have created an id every time when serach text is changes which is setTimout timer id
    //if any search text changes any other timer is going on it will be cleared by clearTimout and new timeout will 
    //create afte times over we will search for data in this way we saves number of api calls

    if (firstRender) {
      let id = setTimeout(() => {
        getSearchData();
      }, 500);

      return () => clearTimeout(id);
    } else {
      setFirstRender(true);
    }
  }, [search]);

  return (
    <>
      <Drawer
        isOpen={serachDrawerOpen}
        placement="top"
        onClose={() => setSearchDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody maxH={"420px"}>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Models"
              type="search"
            />
            {data.length !== 0 ? (
              <Text
                pos={"sticky"}
                bg="red"
                color="white"
                boxShadow={cssStyles.boxShadow1}
                m="auto"
                mt={4}
                width={"330px"}
                borderRadius={10}
                p={2}
                textAlign={"center"}
              >
                Click On Car to Select
              </Text>
            ) : null}

            <SimpleGrid
              fonstSize="12px"
              fontWeight={300}
              mt={4}
              gap={3}
              columns={[1, 2, 3, 4]}
            >
              {data.length === 0||loading ? (
                <>
                  <Loader searchShow={true} /> <Loader searchShow={true} />{" "}
                  <Loader searchShow={true} /> <Loader searchShow={true} />
                </>
              ) : (
                data.map((el) => (
                  <Box
                    onClick={() => [
                      sendSelected({
                        id: el._id,
                        nameOfModel: el.nameOfModel,
                        yearOfModel: el.yearOfModel,
                      }),
                      setSearchDrawerOpen(false),
                      !nav? succesAlert("Car Model Selected Success"):null
                      
                    ]}
                    key={el._id}
                  >
                    <SearchCard {...el} />
                  </Box>
                ))
              )}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
