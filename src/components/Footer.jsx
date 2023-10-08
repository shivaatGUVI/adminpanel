import { Text, Box } from "@chakra-ui/react";
export default function Footer() {
  return (
    <Box position="fixed" bottom="0" width="100%" padding="10px" bg="white">
      <Text
        textAlign="center"
        fontSize={{ base: "10px", md: "12px", lg: "14px" }}
      >
        <Text as="b">Operations: </Text> Update and Delete operations happen
        locally, to retain the data in the Database.
      </Text>
    </Box>
  );
}
