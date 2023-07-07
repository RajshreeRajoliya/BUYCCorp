import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  Input,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Link, succesAlert } from "./Reusable";
import ButtonMain from "./ButtonMain";
export const EditModal = ({
  editModalOpen,
  setEditModalOpen,
  id,
  callData,
}) => {
  const [loading, setLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState({});

  const getData = async () => {
  
  
    try {
      let { data } = await axios.get(`${Api_Link}/inventory/${id}`);
     
      setInventoryData(data.deals);
      
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, [id]);
  
  //this is edit modal open component  which is opened when when we click on parent edit modal open button with
  // and used to show input form to update the required values we want

  const handleUpdate = async (e) => {
    //this function is used to update the details of the post updated by user
    e.preventDefault();
    setLoading(true);
    try {
      let { data } = await axios.patch(
        `${Api_Link}/inventory/${id}`,
        inventoryData
      );
      succesAlert(data.msg);
      setLoading(false);
      callData();
      setEditModalOpen(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <ModalOverlay backdropFilter={"blur(10px)"} />
        <ModalContent>
          <ModalHeader>Update Deal </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdate}>
              <FormLabel>Title</FormLabel>
              <Input
                value={inventoryData.title}
                type="text"
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    title: e.target.value,
                  })
                }
                placeholder="Update Title"
              />

              <FormLabel>Update Kms on Odometer</FormLabel>
              <Input
                value={inventoryData.km}
                type="number"
                onChange={(e) =>
                  setInventoryData({ ...inventoryData, km: e.target.value })
                }
                placeholder="Update KMs on Odometer"
              />

              <FormLabel>Update Major Scrathes</FormLabel>
              <Select
                value={inventoryData.majorScratches}
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    majorScratches: e.target.value,
                  })
                }
                placeholder="Update Major Scratches"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>

              <FormLabel>Update Price</FormLabel>
              <Input
                value={inventoryData.price}
                type="number"
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    price: e.target.value,
                  })
                }
                placeholder="Update Price"
              />

              <FormLabel>Update Original Paint</FormLabel>
              <Input
                value={inventoryData.orginalPaint}
                type="text"
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    orginalPaint: e.target.value,
                  })
                }
                placeholder="Update Original Paint"
              />

              <FormLabel>Update No of Accidents</FormLabel>
              <Input
                value={inventoryData.accidents}
                type="number"
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    accidents: e.target.value,
                  })
                }
                placeholder="Number of accidents reported"
              />

              <FormLabel>Update Number of Previos Buyers</FormLabel>
              <Input
                value={inventoryData.prevBuyers}
                type="number"
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    prevBuyers: e.target.value,
                  })
                }
                placeholder="Update Number of previous buyers"
              />

              <FormLabel>Update Registration Place</FormLabel>
              <Input
                value={inventoryData.registrationPlace}
                type="text"
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    registrationPlace: e.target.value,
                  })
                }
                mb={5}
                placeholder="Update Registration Place"
              />
              <FormLabel>Update Image Url</FormLabel>
              <Input
                value={inventoryData.img}
                type="text"
                onChange={(e) =>
                  setInventoryData({
                    ...inventoryData,
                    registrationPlace: e.target.value,
                  })
                }
                mb={5}
                placeholder="Update Registration Place"
              />
              <ButtonMain
               width={"full"}
                loading={loading}
                type={"submit"}
                title={"Update Deal"}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
