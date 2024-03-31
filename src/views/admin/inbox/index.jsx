// React imports 
import React, { useState, useEffect } from "react";

// Axios import 
import axios from "axios";

// Chakra imports
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

// assets imports
import { FaSearch, FaFilter } from 'react-icons/fa';
import InputField from 'components/fields/InputField';
import pencil from 'assets/icons/edit-pencil-white.svg'
import Card from 'components/card/Card'

// Base url
import BASE_URL from "config";

export default function Inbox()
{
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [emails, setEmails] = useState([]);
  const [project,setProject] = useState();
  const [messages, setMessages] = useState([]);
  const [isFetchingChat, setIsFetchingChat] = useState(false);
  const [chatError, setChatError] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatContractorMessages, setChatContractorMessages] = useState([]);
  const [value, setValue] = useState('1');

  useEffect(() => {
      setIsFetching(true);
      fetchEmails();
      setIsFetching(true);
      fetchMessages();
  }, []);

  async function fetchMessages() {
    axios
        .get("http://34.217.79.31/Inbox/GetMessages")
        .then((response) => {
            setMessages(response.data);
            setIsFetching(false);
            setError(false);
            //setEmailMsgs([...emailMsgs, { id: '', content: emailMsg }]);
        })
        .catch((err) => {
            console.log(err); setError(true); setIsFetching(false);
        });
  }
  async function fetchEmails() {
      axios
          .post("http://ec2-34-217-79-31.us-west-2.compute.amazonaws.com/Inbox/ReceiveEmail")
          .then((response) => {
              setEmails(response.data);
              setIsFetching(false);
              setError(false);
              //setEmailMsgs([...emailMsgs, { id: '', content: emailMsg }]);
          })
          .catch((err) => {
              console.log(err); setError(true); setIsFetching(false);
          });
  }
  async function fetchContractorEmails(contractor) {
      setIsFetchingChat(true);
      axios
          .post("http://34.217.79.31/Inbox/RetrieveContractorMessages", { contractorEmail: contractor }, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              }
          })
          .then((response) => {
              setChatContractorMessages(response.data);
              setIsFetchingChat(false);
              setChatError(false);
              fetchProjectDetails(response.data[0].projectId);
              //setEmailMsgs([...emailMsgs, { id: '', content: emailMsg }]);
          })
          .catch((err) => {
              console.log(err); setChatError(true); setIsFetchingChat(false);
          });
  }
  async function fetchProjectDetails(projectguid) {
      //setIsFetchingChat(true);
      if (projectguid != undefined) {
          axios
              .get("http://34.217.79.31/Query/GetQueryDetails/" + projectguid)
              .then((response) => {
                  setProject(response.data);
                  //setEmailMsgs([...emailMsgs, { id: '', content: emailMsg }]);
              })
              .catch((err) => {
                  console.log(err); setChatError(true); setIsFetchingChat(false);
              });
      }
  }
  async function fetchClientEmails(client) {
    setIsFetchingChat(true);
    axios
        .post("http://34.217.79.31/Inbox/RetrieveClientEmails", { emailFrom: client }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((response) => {
            setChatMessages(response.data.result);
            setIsFetchingChat(false);
            setChatError(false);
            if (response.data.result[0].projectGuid) 
            fetchProjectDetails(response.data.result[0].projectGuid);
            //setEmailMsgs([...emailMsgs, { id: '', content: emailMsg }]);
        })
        .catch((err) => {
            console.log(err); setChatError(true); setIsFetchingChat(false);
        });
  }
  const handleEmailClick = (emailFrom) => {
      fetchClientEmails(emailFrom);
  }
  const handleMessageClick = (emailFrom) => {
      fetchContractorEmails(emailFrom);
      //fetchClientEmails(emailFrom);
  }
  const handleRefreshMail = () => {
      fetchEmails();
  }
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
        <Box maxWidth={'250px'} overflowX={'hidden'}>

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
          <VStack align="start" mt="4" gap={0} width={'100%'}>

            {/* Example list item */}
            {/* <ListItem
              username="Username"
              timestamp="30 mins ago"
              title="Estimate Inquiry"
              message="I agree with this estimate. Please proceed."
              avatarName="User Avatar"
            /> */}
            {emails && emails.length > 0 ? (
              emails.map((email, index) => (
                <ListItem
                  key={index}
                  username={email.fromAddresses && email.fromAddresses.length > 0 ? email.fromAddresses[0].name : ''}
                  timestamp={email.time}
                  title={email.subject}
                  message={email.content}
                  avatarName={email.fromAddresses && email.fromAddresses.length > 0 ? email.fromAddresses[0].name : ''}
                />
              ))
            ) : (
              <Text>No emails found</Text>
            )}

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
            <InputField name="service_type" label="Service Type" placeholder="Translation" type="text" readOnly value="Translation" bgColor='gray.200' form={false} />
            <InputField name="translation_type" label="Translation Type" placeholder="Document Translation" type="text" bgColor='gray.200' form={false}/>
            <InputField name="original_language" label="Original Language" placeholder="English" type="text" bgColor='gray.200' form={false}/>
            <InputField name="requesting_language" label="Requesting Language" placeholder="Spanish" type="text" bgColor='gray.200' form={false}/>
            <InputField name="request_date" label="Requested Date" placeholder="Requested Date" type="datetime-local" bgColor='gray.200' form={false}/>
            <InputField name="deadline" label="Deadline" placeholder="Deadline" type="datetime-local" bgColor='gray.200' form={false} />
            <InputField name="company_name" label="Company / Agency Name" placeholder="Agency Name" type="text" bgColor='gray.200' form={false} />
            <InputField name="attachments" label="Attachments" placeholder="Attachments" type="text" bgColor='gray.200' form={false}/>
          </Flex>
        </Box>

        </Flex>
      </Card>
    </Box>
  );
};

const ListItem = ({ username, timestamp, title, message, avatarName }) => {

  function calculateTimeElapsed(dateString) {
    const providedDate = new Date(dateString);

    // Check if the provided date is valid
    if (isNaN(providedDate)) {
        return "Invalid Date";
    }

    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - providedDate;

    // Calculate the elapsed time in seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Determine the appropriate unit and value for display
    if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
  }
  return (
    <Flex w='100%' flexDir={'row'} py={3} px={2} borderBottom={'1px solid gray'} _hover={{bgColor:'gray.200'}}>

      <Flex alignItems={'center'}>
        <Avatar size="md" name={avatarName} mr="2"/>
      </Flex>
      
      <Flex flexDir='column' align="start" spacing="1">

        {/* User Avatar & name */}
        <Flex justifyContent={'space-between'} w={'100%'}>
          <Text fontSize={14} color={'gray'}>{username}</Text>
          <Text color="gray.500" fontSize={12}>{calculateTimeElapsed(timestamp)}</Text>
        </Flex>

        {/* Time, Estimate Inquiry, and Preview of Last Message */}
        <Flex flexDir={'column'} w={'100%'} >
          <Text fontWeight="bold">{title}</Text>
          <Text fontSize={14} noOfLines={2} >{message}</Text>
        </Flex>

      </Flex>
        
    </Flex>
  );
};
