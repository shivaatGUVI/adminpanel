import { Box } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <Box
      marginTop={["40px", "60px", "80px"]}
      marginBottom={["60px", "80px", "80px"]}
    >
      <RegisterForm />
    </Box>
  );
}
