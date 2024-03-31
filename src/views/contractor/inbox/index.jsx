import React from 'react';
import {
  Box,
  Flex,
  Button,
  Spacer,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Avatar,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import InputField from 'components/fields/InputField';
import pencil from 'assets/icons/edit-pencil-white.svg'
import Card from 'components/card/Card'

export default function Inbox()
{
  return (
    <Box pt={4} overflowX={'auto'}>

      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Box>
          <Text
            color={'black'}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            All Emails
          </Text>
        </Box>
      </Flex>
      
      <Card bg='white' p={0}>
        <Flex>

        {/* Section 1 (Left) */}
        <Box maxWidth={'250px'}>

          {/* Header  */}
          <Flex align="center" justifyContent={'space-between'} p={3} my={4}>
            {/* New Email button */}
            <Button bg={'primaryBtn'} color={'white'} borderRadius={'md'} size={'sm'} _hover={{ bg: "#009A0A" }}>
              <img src={pencil} alt="Pencil Icon" />
              New Email
            </Button>
            
            <Flex>
              {/* Search icon */}
              <IconButton aria-label="Search" icon={<FaSearch />} />
              {/* Filter icon */}
              <IconButton aria-label="Filter" icon={<FaFilter />} />
            </Flex>
          </Flex>

          {/* Recent emails list */}
          <VStack align="start" mt="4" gap={0}>

            {/* Example list item */}
            <ListItem
              username="Username"
              timestamp="30 mins ago"
              title="Estimate Inquiry"
              message="I agree with this estimate. Please proceed."
              avatarName="User Avatar"
            />
            <ListItem
              username="Username"
              timestamp="30 mins ago"
              title="Estimate Inquiry"
              message="I agree with this estimate. Please proceed."
              avatarName="User Avatar"
            />
            <ListItem
              username="Username"
              timestamp="30 mins ago"
              title="Estimate Inquiry"
              message="I agree with this estimate. Please proceed."
              avatarName="User Avatar"
            />

          </VStack>

        </Box>


        {/* Section 2 (Middle) */}
        <Box minWidth="600px" borderRight={'2px solid'} borderLeft={'2px solid'}  borderColor={'gray.300'} px={4}>

          {/* Top section with user avatar, name, and email */}
          <Flex align="center" p={3} my={4}>
            <Avatar size="md" name="Selected User Avatar" mr="4" boxSize="40px" />
            <VStack align="start" spacing="0" >
              <Text fontWeight="bold">Selected User</Text>
              <Text color="gray.500" fontSize={14}>user@example.com</Text>
            </VStack>
          </Flex>

          <Card bg="gray.200">
            {/* Chat messages section */}
            <VStack gap={4}>
              {/* My Message (Green background, no avatar) */}
              <Box bg="green.600" color="white" p="3" borderRadius="md" alignSelf="flex-end">
                <Text>My message content goes here.</Text>
              </Box>

              {/* Other User's Message (White background with avatar) */}
              <Flex align="flex-start" alignSelf="flex-start">
                <Avatar size="md" name="Other User Avatar" boxSize="40px" mr="4" /> {/* Move avatar to left of messages */}
                <Box bg="white" p="3" borderRadius="md">
                  <Text>Other user's message content goes here.</Text>
                </Box>
              </Flex>
              {/* My Message (Green background, no avatar) */}
              <Box bg="green.600" color="white" p="3" borderRadius="md" alignSelf="flex-end">
                <Text>My message content goes here.</Text>
              </Box>

              {/* Other User's Message (White background with avatar) */}
              <Flex align="flex-start" alignSelf="flex-start">
                <Avatar size="md" name="Other User Avatar" boxSize="40px" mr="4" /> {/* Move avatar to left of messages */}
                <Box bg="white" p="3" borderRadius="md">
                  <Text>Other user's message content goes here.</Text>
                  <Text fontSize="sm" color="gray.500" bg="transparent"> {/* Set background to transparent */}
                    33 minutes ago
                  </Text>
                </Box>
              </Flex>

              {/* ... (Add more messages as needed) */}
            </VStack>

            {/* Text area for typing new messages */}
            <Flex mt={16} alignItems={'flex-end'}>
              <Box flex="1">
                {/* Text area for typing new messages */}
                <Textarea bg={'white'} placeholder='Write your message here'/>
              </Box>
              <Box ml="2">
                {/* Emoji and Attachment icons */}
                {/* ... (Add icons as needed) */}
              </Box>
              <Box ml="2">
                {/* Send Now button */}
                <Button bg={'primaryBtn'} color={'white'} borderRadius={'md'} _hover={{ bg: "btnHover" }}>
                  Send Now
                </Button>
              </Box>
            </Flex>

          </Card>
        </Box>

        {/* Section 3 (Right) */}
        <Box minWidth="300px" bg="white" p="4" >
          <Flex align="center" flexDir={'column'}>
            <Avatar name="User" src="user-avatar.jpg" size={'lg'} />
            <Text fontWeight="bold" mt={2}>User</Text>
          </Flex>

          {/* Project details */}
          <Flex w={'100%'} flexDir={'column'} mt={4}>
            <Text fontWeight="bold" mt="4" mb="2">
              Project Details
            </Text>
            <InputField name="service_type" label="Service Type" placeholder="Translation" type="text" readOnly value="Translation" bgColor='gray.200' />
            <InputField name="translation_type" label="Translation Type" placeholder="Document Translation" type="text" bgColor='gray.200'/>
            <InputField name="original_language" label="Original Language" placeholder="English" type="text" bgColor='gray.200'/>
            <InputField name="requesting_language" label="Requesting Language" placeholder="Spanish" type="text" bgColor='gray.200'/>
            <InputField name="request_date" label="Requested Date" placeholder="Requested Date" type="datetime-local" bgColor='gray.200'/>
            <InputField name="deadline" label="Deadline" placeholder="Deadline" type="datetime-local" bgColor='gray.200' />
            <InputField name="company_name" label="Company / Agency Name" placeholder="Agency Name" type="text" bgColor='gray.200' />
            <InputField name="attachments" label="Attachments" placeholder="Attachments" type="text" bgColor='gray.200'/>
          </Flex>
        </Box>

        </Flex>
      </Card>
    </Box>
  );
};

const ListItem = ({ username, timestamp, title, message, avatarName }) => {
  return (
    <Flex w='100%' flexDir={'row'} p={3} borderBottom={'1px solid gray'} _hover={{bgColor:'gray.200'}}>

      <Avatar size="md" name={avatarName} mr="2" boxSize="40px"/>
      <VStack align="start" spacing="1" w='100%'>

        {/* User Avatar & name */}
        <Flex justifyContent={'space-between'} w={'100%'}>
          <Text fontSize={14} color={'gray'}>{username}</Text>
          <Text color="gray.500" fontSize={12}>{timestamp}</Text>
        </Flex>

        {/* Time, Estimate Inquiry, and Preview of Last Message */}
        <Text fontWeight="bold">{title}</Text>
        <Text fontSize={14}>{message}</Text>

      </VStack>
        
    </Flex>
  );
};
