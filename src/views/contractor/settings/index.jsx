/* eslint-disable */
import React from 'react';
import {
  Box,
  Avatar,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  Flex,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Icon,
  Button
} from '@chakra-ui/react';

import { HiEye, HiEyeOff } from 'react-icons/hi'

// Custom components
import Card from "components/card/Card.js";

export default function settings() {
  const textColorSecondary = "gray.400";

  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);
  
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
  const handleClick3 = () => setShow3(!show3);

  return (
    <Box pt={4}>

      {/* <Card py='15px' bg="white"> */}

        <Box w={{ base: '100%', md:'60%'}} pl={8} pt={4}>

            {/* Avatar and Change Photo */}
            <Flex align="center" mb={12}>
              <Avatar
                src='https://bit.ly/dan-abramov'
                _hover={{ cursor: 'pointer' }}
                color="white"
                name="Guest User"
                size="lg"
              />
              <Text ml={4} fontWeight={'bold'}
              color='#023D26' fontFamily={'Open Sans'}
              _hover={{
                color: '#2E8540', // Change to the desired hover color
                transition: 'color 0.3s ease-in-out', // Add a smooth transition effect
                cursor: 'pointer', // Change cursor on hover
              }}
              >Change Photo</Text>
            </Flex>

            {/* Personal Details Heading */}
            <Heading as="h3" size="md" mb={8}  color='#152334'  fontFamily={'Open Sans'}>
              Personal Details
            </Heading>

            {/* First Name and Last Name Inputs */}
            <Flex mb={4} flexDir={{ base: 'column', md: 'row'}}>
              <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                <FormLabel fontFamily='Open Sans'
                color='var(--neutral-light-n-200, #6B778C)'>First Name</FormLabel>
                <Input type="text" variant="outline" placeholder="Enter your first name" 
                 fontFamily='Open Sans'
                 border='1px solid #ABABAB'
                 borderRadius='3px'
                />
              </FormControl>
              <FormControl flex="1" pt={{ base: 4, md: 0 }}>
                <FormLabel  fontFamily='Open Sans'
                color='var(--neutral-light-n-200, #6B778C)'>Last Name</FormLabel>
                <Input type="text" variant="outline" placeholder="Enter your last name" 
                 fontFamily='Open Sans'
                 border='1px solid #ABABAB'
                 borderRadius='3px'
                />
              </FormControl>
            </Flex>

            {/* Email and Number Inputs */}
            <Flex mb={12} flexDir={{ base: 'column', md: 'row'}}>
              <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                <FormLabel  fontFamily='Open Sans'
                color='var(--neutral-light-n-200, #6B778C)'>Email</FormLabel>
                <Input type="email" variant="outline" placeholder="Enter your email" 
                 fontFamily='Open Sans'
                 border='1px solid #ABABAB'
                 borderRadius='3px'
                />
              </FormControl>
              <FormControl flex="1" pt={{ base: 4, md: 0 }}>
                <FormLabel  fontFamily='Open Sans'
                color='var(--neutral-light-n-200, #6B778C)'>Number</FormLabel>
                <Input type="tel" variant="outline" placeholder="Enter your phone number" 
                 fontFamily='Open Sans'
                 border='1px solid #ABABAB'
                 borderRadius='3px'
                />
              </FormControl>
            </Flex>

            {/* Password Settings Heading */}
            <Heading as="h3" size="md" mb={8} color='#152334'  fontFamily={'Open Sans'}>
              Change Password
            </Heading>

            {/* Old Password, New Password, and Retype Password Inputs */}
            <Flex mb={4} w={{base: '100%', md:'50%'}}>
              <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                <FormLabel  fontFamily='Open Sans'
                color='var(--neutral-light-n-200, #6B778C)'>Old Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    isRequired={true}
                    type={show1 ? "text" : "password"}
                    variant="outline"
                    placeholder="Enter your old password"
                    fontFamily='Open Sans'
                    border='1px solid #ABABAB'
                    borderRadius='3px'
                  />
                  <InputRightElement display='flex' alignItems='center'>
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show1 ? HiEyeOff : HiEye}
                      onClick={handleClick1}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>
            
            {/* New Password Input */}
            <Flex mb={4} flexDir={{ base: 'column', md: 'row'}}>
            <FormControl flex="1" mr={{ base: 0, md: 4 }} pt={{ base: 4, md: 0 }}>
                <FormLabel  fontFamily='Open Sans'
                color='var(--neutral-light-n-200, #6B778C)'>New Password</FormLabel>
                {/* <Input type="password" variant="outline" placeholder="Enter your new password" /> */}
                <InputGroup size='md'>
                  <Input
                    isRequired={true}
                    type={show2 ? "text" : "password"}
                    variant="outline"
                    placeholder="Enter your new password"
                    fontFamily='Open Sans'
                    border='1px solid #ABABAB'
                    borderRadius='3px'
                  />
                  <InputRightElement display='flex' alignItems='center'>
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show2 ? HiEyeOff : HiEye}
                      onClick={handleClick2}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl flex="1" mr={{ base: 0, md: 4 }} pt={{ base: 4, md: 0 }}>
                <FormLabel  fontFamily='Open Sans'
                color='var(--neutral-light-n-200, #6B778C)'>Retype Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    isRequired={true}
                    type={show3 ? "text" : "password"}
                    variant="outline"
                    placeholder="Retype your password"
                    fontFamily='Open Sans'
                    border='1px solid #ABABAB'
                    borderRadius='3px'
                  />
                  <InputRightElement display='flex' alignItems='center'>
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show3 ? HiEyeOff : HiEye}
                      onClick={handleClick3}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>

            <Flex justifyContent={'flex-end'} mr={{ base: 0, md: 4 }} my={8}>
              <Button 
              // bg={'primaryBtn'}
              // color={'white'}
              // _hover={'btnHover'}
              // _ active={'btnActive'}
              borderRadius='8px'
              variant='solid'
              bg='#007905'
              color='#FFF'
              _hover={{ bg: "#009A0A" }}
              _active={{bg: "#004D03"}}
              >
                Save settings
              </Button>
            </Flex>
        </Box>

      {/* </Card> */}
    </Box>

  );
}
