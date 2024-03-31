/* eslint-disable */
import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  Flex,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  useToast
} from '@chakra-ui/react';

import { HiEye, HiEyeOff } from 'react-icons/hi'

// Custom components
import Card from "components/card/Card.js";

// Formik imports
import { Formik, Form } from "formik";
import * as Yup from 'yup';

const initialValues = {
  Name: '',
  Email: '',
  PhoneNumber: '',
  OldPassword: '',
  NewPassword: '',
}

export default function settings() {
  const textColorSecondary = "gray.400";

  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);
  
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
  const handleClick3 = () => setShow3(!show3);

  const toast = useToast()

  // Inside your component function
  const [avatarSrc, setAvatarSrc] = useState('https://bit.ly/dan-abramov'); // State to hold the avatar image

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a file reader object

    reader.onload = () => {
      // Set the avatar source to the data URL of the selected image
      setAvatarSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  const submitHandler = (values) => {
    toast({
      title: 'Settings saved.',
      description: "Settings have been updated.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Box pt={4}>

      {/* <Card py='15px' bg="white"> */}

        <Box w={{ base: '100%', md:'60%'}} pl={8} pt={4}>

          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={values => {
              submitHandler(values);
            }}
          >
          {({ errors, touched }) => (
            <Form>

              {/* Avatar and Change Photo */}
              <Flex align="center" mb={12}>
                <Avatar
                  src={avatarSrc}
                  _hover={{ cursor: 'pointer' }}
                  color="white"
                  name="Profile Photo"
                  size="lg"
                />
                <label htmlFor="avatar-input"> {/* Label to trigger the file input */}
                  <Text ml={4} fontWeight={'bold'}
                  color='#023D26' fontFamily={'Open Sans'}
                  _hover={{
                    color: '#2E8540', 
                    transition: 'color 0.3s ease-in-out', 
                    cursor: 'pointer', 
                  }}
                  >
                    Change Photo
                  </Text>
                  <Input
                    id="avatar-input"
                    type="file"
                    accept="image/*" // Accept only image files
                    style={{ display: 'none' }}
                    onChange={handleFileChange} // Call handleFileChange when a file is selected
                  />
                </label>
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
                bg={'primaryBtn'}
                color={'white'}
                borderRadius='8px'
                variant='solid'
                _hover={{ bg: 'btnHover' }}
                _active={{bg: 'btnActive' }}
                onClick={submitHandler}
                >
                  Save settings
                </Button>
              </Flex>
            </Form>
          )}
          </Formik>
        </Box>

      {/* </Card> */}
    </Box>

  );
}
