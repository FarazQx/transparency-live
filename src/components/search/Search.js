import {
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { SearchIcon } from '@chakra-ui/icons'

  export default function Search({tableInstance, setGlobalFilter}) 
  {

    // Chakra Color Mode
    const searchIconColor = useColorModeValue('gray.700', 'white')
    const inputBg = useColorModeValue('white')
    const inputText = useColorModeValue('gray.700', 'gray.100')
    return (
      <InputGroup w={{ base: '100%', md: '200px' }}>
  
        <Input
          variant='search'
          fontSize='sm'
          bg={inputBg}
          color={inputText}
          fontWeight='500'
          _placeholder={{ color: 'gray.400', fontSize: '14px' }}
          borderRadius={'8px'}
          placeholder={'Search...'}
          onChange={(e) => {
            setGlobalFilter(e.target.value || undefined);
            tableInstance.gotoPage(0); // Reset pagination to page 1 when searching
          }}
        />
        <InputRightElement>
          <IconButton
              aria-label='search'
              bg='inherit'
              borderRadius='inherit'
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent'
              }}
              _focus={{
                boxShadow: 'none'
              }}
              icon={<SearchIcon color={searchIconColor} w='15px' h='15px' />}
            />
        </InputRightElement>
      </InputGroup>
    )
  }
  
  