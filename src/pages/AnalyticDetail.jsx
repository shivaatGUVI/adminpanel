import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Image,
  Text,
  Tr,
  Th,
  Td,
  TableContainer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEARDATAFUNCTION,
  DATACALLFUNCTION,
  DELETECALLFUNCTION,
  UPDATECALLFUNCTION,
} from "../redux/statistics_reducer/actions.statistics";
import Pagination from "../components/Pagination";

export default function AnalyticDetail() {
  const { statsArray, isLoading } = useSelector(
    (store) => store.statisticsManager
  );
  const [state, setState] = useState(1);
  const { user } = useSelector((store) => store.loginManager);
  const { type } = useParams();
  const [name, setName] = useState({});
  const [update, setUpdate] = useState({});
  const dispatch = useDispatch();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const {
    isOpen: updateIsOpen,
    onOpen: updateOnOpen,
    onClose: updateOnClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const cancelRef2 = useRef();

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdate({ ...update, [name]: value });
  };

  // console.log(update);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log({ id: update._id, data: update });
    UPDATECALLFUNCTION(dispatch, update._id, update);
  };

  const isDescription = update.description === "";
  const isBrand = update.brand === "";
  const isPrice = update.price === "";

  useEffect(() => {
    DATACALLFUNCTION(dispatch, user.id, type, state);
    console.log(statsArray);
    return () => {
      CLEARDATAFUNCTION(dispatch);
    };
  }, [state]);

  return (
    <>
      <Box
        width="80%"
        margin="auto"
        marginTop={["30px", "40px", "50px"]}
        marginBottom="50px"
      >
        {statsArray.array?.length === 0 && !isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={["20vh", "30vh", "40vh"]}
          >
            <WarningIcon
              color="red.300"
              fontSize={["18px", "20px", "25px", "30px"]}
              marginRight={["5px", "8px", "10px"]}
            />
            <Heading
              color="gray.300"
              as="h4"
              fontSize={["10px", "15px", "20px", "25px"]}
            >
              No items found in {type} section!
            </Heading>
          </Box>
        ) : (
          <TableContainer>
            <Table variant="simple" colorScheme="pink">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Update</Th>
                </Tr>
              </Thead>
              <Tbody>
                {statsArray.array?.map((el) => {
                  return (
                    <Tr key={el._id}>
                      <Td>
                        <Image
                          boxSize={["80px", "100px", "130px"]}
                          objectFit="contain"
                          src={el.image_url}
                          alt={el.brand}
                        />
                      </Td>
                      <Td>
                        <Heading
                          letterSpacing="0.8px"
                          fontSize={["12px", "14px", "20px"]}
                          marginBottom={["5px", "8px", "10px"]}
                        >
                          {el.description}
                        </Heading>
                        <Text
                          fontWeight={["500"]}
                          letterSpacing="0.6px"
                          fontSize={["10px", "12px", "14px"]}
                        >
                          <b>Brand</b>: - {el.brand}
                        </Text>
                        <Text
                          fontWeight={["500"]}
                          letterSpacing="0.6px"
                          fontSize={["10px", "12px", "14px"]}
                        >
                          <b>MRP</b>: - ₹ {el.price}
                        </Text>
                        <Text
                          fontWeight={["500"]}
                          letterSpacing="0.6px"
                          fontSize={["10px", "12px", "14px"]}
                        >
                          <b>Occurence</b>: - {el.occurence}
                        </Text>
                      </Td>
                      <Td>
                        <Button
                          fontSize={["12px", "12px", "14px", "16px"]}
                          padding={[
                            "5px 12px",
                            "5px 12px",
                            "10px 15px",
                            "15px",
                          ]}
                          onClick={() => {
                            updateOnOpen();
                            setUpdate(el);
                          }}
                        >
                          Update
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <AlertDialog
        isOpen={deleteIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteOnClose}
      >
        <AlertDialogOverlay zIndex="1000000">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              <b>{name.description}</b>, want to delete it?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteOnClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteOnClose();
                  DELETECALLFUNCTION(dispatch, name._id);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={updateIsOpen}
        leastDestructiveRef={cancelRef2}
        onClose={updateOnClose}
      >
        <AlertDialogOverlay zIndex="1000000">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Item
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
                  Product brand
                </FormLabel>
                <Input
                  name="brand"
                  onChange={(e) => inputHandler(e)}
                  value={update.brand}
                  variant="filled"
                  type="text"
                  placeholder="Add content"
                  fontSize={{ base: "14px", md: "16px", lg: "17px" }}
                />
                {isBrand ? (
                  <FormHelperText
                    color="red"
                    fontSize={{ base: "10px", md: "12px", lg: "14px" }}
                  >
                    Add Product name
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
                  Description
                </FormLabel>
                <Input
                  name="description"
                  onChange={(e) => inputHandler(e)}
                  value={update.description}
                  variant="filled"
                  type="text"
                  placeholder="Add content"
                  fontSize={{ base: "14px", md: "16px", lg: "17px" }}
                />
                {isDescription ? (
                  <FormHelperText
                    color="red"
                    fontSize={{ base: "10px", md: "12px", lg: "14px" }}
                  >
                    Add Product details
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
                  Maximum Retail Price
                </FormLabel>
                <Input
                  name="price"
                  onChange={(e) => inputHandler(e)}
                  value={update.price}
                  variant="filled"
                  type="number"
                  placeholder="Add content"
                  fontSize={{ base: "14px", md: "16px", lg: "17px" }}
                />
                {isPrice ? (
                  <FormHelperText
                    color="red"
                    fontSize={{ base: "10px", md: "12px", lg: "14px" }}
                  >
                    Add MRP
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <br />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef2} onClick={updateOnClose}>
                Cancel
              </Button>
              <Button
                bg="rgb(137, 0, 75)"
                color="white"
                onClick={(e) => {
                  updateOnClose();
                  submitHandler(e);
                }}
                ml={3}
              >
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Pagination
        max={statsArray.totalPages}
        state={state}
        setState={setState}
      />
    </>
  );
}
