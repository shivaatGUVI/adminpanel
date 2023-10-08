import { Box, Heading, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function AnalyticComponent() {
  const Data = [
    {
      count: "Orders",
      text: "successful",
      type: "order",
    },
    {
      count: "Items",
      text: "in liked section",
      type: "like",
    },
    {
      count: "Items",
      text: "in cart",
      type: "cart",
    },
  ];
  return (
    <Box marginBottom="60px">
      <Box textAlign="center" marginBottom="50px">
        <Text fontSize={["18px", "20px", "25px", "30px"]} fontWeight="450">
          YOUR listings Statistics
        </Text>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={["1fr", "repeat(2,1fr)", "repeat(3,1fr)"]}
        gap="15px"
      >
        {Data.map((el) => {
          return (
            <Link to={`/analytics/${el.type}`}>
              <Box
                border="1px solid rgb(210,210,210,0.6)"
                backgroundColor="#F4EEE0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textTransform="capitalize"
                cursor="pointer"
                height={["15vh", "20vh", "25vh", "30vh"]}
                transition="0.35s"
                _hover={{
                  border: "1px solid rgb(180,180,180,0.9)",
                }}
              >
                <Box textAlign="center">
                  <Heading
                    as="h3"
                    fontSize={["15px", "20px", "25px", "30px"]}
                    marginBottom={["6px", "10px"]}
                    color="#393646"
                  >
                    {el.count}
                  </Heading>
                  <Text fontSize={["10px", "15px", "17px", "19px"]}>
                    {el.text} <ExternalLinkIcon />
                  </Text>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
