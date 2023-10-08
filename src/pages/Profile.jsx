import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../images/profile.png";
import { LOGOUTUSERCALL } from "../redux/login_reducer/actions.login";

export default function Profile() {
  const { user } = useSelector((store) => store.loginManager);
  const dispatch = useDispatch();
  return (
    <Box>
      <Heading marginBottom={["50px"]} as="h2" textAlign={["center"]}>
        {user.name}'s profile
      </Heading>
      <Flex
        width={["60%"]}
        margin={["auto"]}
        justifyContent={["space-evenly"]}
        alignItems={["center"]}
      >
        <Box>
          <Image
            src={profile}
            alt={user.name}
            width={["100%"]}
            height={["140px"]}
            padding={["5px"]}
            objectFit={["contain"]}
            bg="#F4EEE0"
            borderRadius={["50%"]}
          />
        </Box>
        <Flex
          height={["150px"]}
          flexDirection={["column"]}
          justifyContent={["space-evenly"]}
        >
          <Text fontWeight={["500"]} as="p">
            <b>Name</b>: - {user.name}
          </Text>
          <Text fontWeight={["500"]} as="p">
            <b>Email</b>: - {user.email}
          </Text>
          <Button onClick={() => LOGOUTUSERCALL(dispatch)}>Logout</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
