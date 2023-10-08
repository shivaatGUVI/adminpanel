import {
  Box,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Icon,
  Flex,
} from "@chakra-ui/react";
// import { SlUser } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUTUSERCALL } from "../redux/login_reducer/actions.login";

export default function Navbar() {
  const { token } = useSelector((store) => store.loginManager);
  const dispatch = useDispatch();
  return (
    <Box
      padding={["15px 20px", "15px 30px", "25px 50px"]}
      position="sticky"
      top="0"
      width="100%"
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      zIndex="1000000"
      bg="#393646"
      color="#F4EEE0"
      marginBottom={["50px", "60px", "70px"]}
    >
      <Box>
        <Link to="/dashboard">
          <Heading
            as="h1"
            fontSize={["12px", "20px", "25px", "30px"]}
            letterSpacing={["1px"]}
          >
            ADMIN PANEL
          </Heading>
        </Link>
      </Box>
      <Box display={token ? "block" : "none"}>
        <Link to="/analytics">
          <Text
            fontSize={["10px", "15px", "20px"]}
            color="#887ab4"
            transition="0.35s"
            _hover={{
              color: "#F4EEE0",
              fontWeight: "450",
              // textDecoration: "underline",
              // textUnderlineOffset: "6px"
            }}
          >
            User Analytics
          </Text>
        </Link>
      </Box>
      <Box display={token ? "block" : "none"}>
        <Link to="/dashboard">
          <Text
            fontSize={["10px", "15px", "20px"]}
            color="#887ab4"
            transition="0.35s"
            _hover={{
              color: "#F4EEE0",
              fontWeight: "450",
              // textDecoration: "underline",
              // textUnderlineOffset: "6px"
            }}
          >
            Main Website
          </Text>
        </Link>
      </Box>
      <Box display={token ? "block" : "none"}>
        <Menu>
          <MenuButton
            cursor="pointer"
            as={Text}
            fontSize={["10px", "15px", "20px"]}
            color="#F4EEE0"
            transition="0.35s"
            // _hover={{
            //   color: "#F4EEE0",
            //   fontWeight: "450",
            // }}
          >
            <Icon color="#F4EEE0" marginRight="10px" />
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup color="#6D5D6E" title="Profile">
              <Link to="/profile">
                <MenuItem
                  color="#887ab4"
                  _hover={{
                    color: "black",
                  }}
                >
                  My Account
                </MenuItem>
              </Link>
              <MenuItem
                color="#887ab4"
                _hover={{
                  color: "black",
                }}
                onClick={() => LOGOUTUSERCALL(dispatch)}
              >
                Logout{" "}
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      <Flex
        width={["30%"]}
        display={token ? "none" : "flex"}
        flexDirection={["row"]}
        justifyContent={["space-between"]}
      >
        <Text as="p" fontSize={["10px", "12px", "14px"]}>
          <b>Email</b> :- shiva@gmail.com
        </Text>
        <Text as="p" fontSize={["10px", "12px", "14"]}>
          <b>Password</b> :- shivasunchu
        </Text>
      </Flex>
    </Box>
  );
}
