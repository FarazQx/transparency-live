import React, { useState, useEffect } from 'react';
import { Select, Text, useColorModeValue, Flex } from '@chakra-ui/react';

export default function PageSize({ tableInstance }) {

  //This retrieves preference on browser storage
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    // Try to get itemsPerPage from local storage
    const storedItemsPerPage = localStorage.getItem('itemsPerPage');
    return storedItemsPerPage ? parseInt(storedItemsPerPage, 10) : 10; // Default to 10 items per page
  });

  //This stores the preference on browser storage
  useEffect(() => {
    // Update local storage when itemsPerPage changes
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  // Chakra Color Mode
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');

  return (
    <Flex mt="20px" flexDir={'row'} gap={2} alignItems={'center'}>
      <Select
        value={tableInstance.state.pageSize}
        size="sm"
        w={'fit-content'}
        bg={inputBg}
        _active={{
          bg: 'inherit',
          transform: 'none',
          borderColor: 'transparent',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        color={inputText}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          tableInstance.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize} style={{ background: inputBg }}>
            {pageSize}
          </option>
        ))}
      </Select>
      <Text color={'black'}>Rows per page</Text>
    </Flex>
  );
}
