import { Button, Text, Flex, useColorModeValue } from '@chakra-ui/react';

export default function Pagination({ tableInstance }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  return (
    <Flex justify="space-between" align="center" mt="20px" mx="auto" gap={4}>
      <Button
        onClick={() => tableInstance.previousPage()}
        isDisabled={!tableInstance.canPreviousPage}
      >
        Prev
      </Button>
      <Text color={textColor} fontSize="14px" fontWeight="700">
        Page {tableInstance.state.pageIndex + 1} of {tableInstance.pageCount}
      </Text>
      <Button
        onClick={() => tableInstance.nextPage()}
        isDisabled={!tableInstance.canNextPage}
      >
        Next
      </Button>
    </Flex>
  );
}
