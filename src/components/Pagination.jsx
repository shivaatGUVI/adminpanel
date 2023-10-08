import { Flex, Button, Text } from "@chakra-ui/react";

export default function Pagination({ max, state, setState }) {
  return (
    <Flex
      width={["30%"]}
      margin={["auto"]}
      marginBottom={["80px"]}
      justifyContent={["space-evenly"]}
      alignItems={["center"]}
    >
      <Button isDisabled={state === 1} onClick={() => setState(state - 1)}>
        Previous
      </Button>
      <Text as="b">{state}</Text>
      <Button isDisabled={state === max} onClick={() => setState(state + 1)}>
        Next
      </Button>
    </Flex>
  );
}
