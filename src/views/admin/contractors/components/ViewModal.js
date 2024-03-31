import React, { useState } from "react";

// Chakra imports
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Image,
  Flex,
  Text, 
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,

} from "@chakra-ui/react";

// Custom Imports 
import InputField from "components/fields/InputField";

// Assets
import PdfIcon from 'assets/icons/pdf_icon.svg'

export default function ViewModal(props) {
  const rowData = props.rowData ?? {};

  return (
    <>
      <style scoped>
        {`
          #chakra-modal-view-modal {
            max-width: 55% !important;
          }
        `}
      </style>
      {/* <Image src={ViewIcon} h="18px" w="19px" cursor={'pointer'} onClick={onOpen} /> */}

      <Modal isOpen={props.isOpen} onClose={props.onClose} id="view-modal">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton _focus={'none'} />
          <ModalBody>
          <Flex py={8} gap={8}>

              {/* Right column with client details */}
              <Flex w={'30%'} bg={'secondary'} rounded={'xl'} flexDir={'column'} py={4}>
                <Avatar
                  src={'https://bit.ly/dan-abramov'}
                  _hover={{ cursor: 'pointer' }}
                  color="white"
                  name="Profile Photo"
                  size="lg"
                  alignSelf={'center'}
                />
                <Box pt={8} px={8}>
                  <Text display='flex' fontSize='sm' color={"gray"} >
                      Contractor Name
                  </Text>
                  <Text display='flex' fontSize='sm' color='black'>
                      {rowData.firstName + ' ' }
                  </Text>
                </Box>
                <Box pt={8} px={8}>
                  <Text display='flex' fontSize='sm' color={"gray"} >
                      Email
                  </Text>
                  <Text display='flex' fontSize='sm' color='black'>
                      {rowData.email}
                  </Text>
                </Box>
                <Box pt={8} px={8}>
                  <Text display='flex' fontSize='sm' color={"gray"} >
                      Phone Number
                  </Text>
                  <Text display='flex' fontSize='sm' color='black'>
                      {rowData.phoneNumber}
                  </Text>
                </Box>
                <Box pt={4} px={8}>
                  <Text display='flex' fontSize='sm' color={"gray"} >
                      Address
                  </Text>
                  <Text display='flex' fontSize='sm' >   
                    {rowData.address}
                  </Text>
                </Box>
              </Flex>
              
              {/* Right column with project details */}
              <Flex w={'70%'} flexDir={'column'}>

                <Text fontWeight={'bold'}>Work Details</Text>

                <Flex minW={'100%'} gap={4} flexDir={'row'} pt={4}>
                  <InputField fieldName="Name" label="Username" bg='secondary' mb={4} form={false} defaultValue={rowData.email} readOnly />
                  <InputField fieldName="Name" label="Contractor Type" bg='secondary' mb={4} form={false} defaultValue={rowData.type == 0 ? 'Translator' : 'Interpretor'} readOnly />
                </Flex>
                <Flex minW={'100%'} gap={4} flexDir={'row'}>
                  <InputField fieldName="Name" label="Original Language" bg='secondary' mb={4} form={false} defaultValue={rowData.originalLanguage} readOnly />
                  <InputField fieldName="Name" label="Translation Language" bg='secondary' mb={4} form={false} defaultValue={rowData.languageTo} readOnly />
                </Flex>
                <Flex minW={'100%'} gap={4} flexDir={'row'}>
                  <InputField fieldName="Name" label="Per Word Charges" bg='secondary' mb={4} form={false} defaultValue={rowData.chargesPerWord} readOnly/>
                </Flex> 


                <Text fontWeight={'bold'} pt={4}>Past Orders</Text>
                <Table variant="simple">
                  <Thead>
                    <Tr color={'gray'}>
                      <Th paddingInline={1}>Requested Date</Th>
                      <Th paddingInline={1}>Contractor</Th>
                      <Th paddingInline={1}>Service Type</Th>
                      <Th paddingInline={1}>Status</Th>
                      <Th paddingInline={1}>Invoices</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td paddingInline={1}>25 Dec 2023</Td>
                      <Td paddingInline={1}>Robert</Td>
                      <Td paddingInline={1}>Interpretation</Td>
                      <Td paddingInline={1}><Badge bg='#79F2C0' color='#006644' borderRadius={'6px'}>Completed</Badge></Td>
                      <Td paddingInline={1}>
                        <Flex border={'1px solid gray'} borderRadius={'md'} p={0.5} flexDir={'row'} width={'125px'} alignItems={'center'}>
                        <Image src={PdfIcon} h={'18px'} w={'18px'} />
                        <Text color={'black'} ml={1}>Invoice.pdf</Text>
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}