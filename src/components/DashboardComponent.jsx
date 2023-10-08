import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Text,
  CloseButton,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import "@fontsource/roboto";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WarningIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORYCALLFUNCTION,
  CATEGORYDELETEFUNCTION,
} from "../redux/login_reducer/actions.login";

export default function DashboardComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { user, categories } = useSelector((store) => store.loginManager);
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  const isName = name === "";

  useEffect(() => {
    CATEGORYCALLFUNCTION(dispatch, user.id);
  }, []);

  return (
    <>
      <Box
        width="80%"
        margin="auto"
        marginTop={["40px", "60px", "80px"]}
        marginBottom="80px"
      >
        <Box textAlign="center" marginBottom="50px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Text fontSize={["18px", "20px", "25px", "30px"]} fontWeight="450">
              YOUR listings
            </Text>
            {/* <Button
              fontSize={["12px", "12px", "14px", "16px"]}
              padding={["5px 12px", "5px 12px", "10px 15px", "15px"]}
              bg="#51487b"
              color="white"
              _hover={{ bg: "#6d6290" }}
              onClick={onOpen}
            >
              New
            </Button> */}
          </Box>
        </Box>
        {categories === null ? (
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
              No Categories found!
            </Heading>
          </Box>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns={["1fr", "repeat(2,1fr)", "repeat(3,1fr)"]}
            gap="15px"
          >
            {categories.map((el) => {
              return (
                <Box key={el._id}>
                  <Link to={`/dashboard/${el.title}`}>
                    <Box
                      bg="#4F4557"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textTransform="capitalize"
                      height={["15vh", "20vh", "25vh", "30vh"]}
                      borderRadius="10px"
                      cursor="pointer"
                      _hover={{
                        transition: "0.45s",
                        bg: "#6D5D6E",
                      }}
                    >
                      <Text
                        fontSize={["14px", "14px", "18px", "22px"]}
                        color="white"
                      >
                        {el.title}
                      </Text>
                    </Box>
                  </Link>
                  {/* <CloseButton
                    aria-label="Delete"
                    onClick={() => {
                      CATEGORYDELETEFUNCTION(dispatch, user.id, el._id);
                    }}
                  /> */}
                </Box>
              );
            })}
            {/* <Box
              bg="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={["15vh", "20vh", "25vh", "30vh"]}
              borderRadius="10px"
              cursor="pointer"
              onClick={() => {
                onOpen();
                setName("");
              }}
              _hover={{
                transition: "0.45s",
                bg: "gray.300",
              }}
            >
              <Heading
                as="h4"
                fontSize={["14px", "14px", "18px", "22px"]}
                color="black"
              >
                New+
              </Heading>
            </Box> */}
          </Box>
        )}
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay zIndex="1000000">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add Category
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
                  Product name
                </FormLabel>
                <Input
                  name="name"
                  onChange={(e) => inputHandler(e)}
                  value={name}
                  variant="filled"
                  type="text"
                  placeholder="Add content"
                  fontSize={{ base: "14px", md: "16px", lg: "17px" }}
                />
                {isName ? (
                  <FormHelperText
                    color="red"
                    fontSize={{ base: "10px", md: "12px", lg: "14px" }}
                  >
                    Add category name
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                bg="#51487b"
                isDisabled={isName ? true : false}
                color="white"
                _hover={{ bg: "#6d6290" }}
                onClick={() => {
                  categories.push(name);
                  //   ADDCATEGORIESCALL(dispatch, name);
                  navigate(`/category/${name}`);
                  setName("");
                  onClose();
                }}
                ml={3}
              >
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
