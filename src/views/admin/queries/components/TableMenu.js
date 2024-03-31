// React imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "config";

// Chakra imports
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useToast,
  Flex,
  Text, 
  Table,
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  Checkbox, 
  Radio, 
  RadioGroup
} from "@chakra-ui/react";

// Assets
import RadioField from "components/fields/RadioField";
import SelectField from "components/fields/SelectField";
import TextArea from "components/fields/TextArea";
import InputField from "components/fields/InputField";
import DocumentField from 'components/fields/DocumentField';
// import 'assets/css/translationquote.css'
import { PDFViewer } from '@react-pdf/renderer';
import AssignmentForm from "./AssignmentForm";

// Formik imports
import { Formik, Form } from "formik";

function AssignModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contratorList, setContractorList] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchContractorList();
    }
  }, [isOpen]);
  // const toast = useToast();
  // const rowData = props.rowData;
  // //console.log(rowData);
  const fetchContractorList = (languages) => {
    axios
      .get(
        `${BASE_URL}/account/GetContractors`
      )
      .then((res) => {
        console.log(res.data);
        setContractorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const initialValues = {
    OriginalLanguage: "",
    LanguageTo: "",
    AdditionalNotes: "",
    Gender: "",
    Contractor: "",
    Notes: "",
    RequestedDate: "",
    Deadline: "",
    Attachments: "",
  };
  // const options = [
  //   { value: "1", text: "English" },
  //   { value: "2", text: "Spanish" },
  // ];
  // const optionsLangto = [
  //   { value: "1", text: "Spanish" },
  //   { value: "2", text: "French" },
  // ];
  // const optionsContractor =
  //   contratorList && Array.isArray(contratorList)
  //     ? contratorList.map((contractor) => ({
  //         value: contractor.Id,
  //         text: contractor.firstName,
  //       }))
  //     : [];
  // optionsContractor.push({ value: "none", text: "none" });
  const optionsGender = [
    { value: "0", text: "Male" },
    { value: "1", text: "Female" },
    { value: "2", text: "Other" },
  ];
  // const handleContractor = (value) => {
  //   //setSelectedContractor(contractor);
  // };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <MenuItem onClick={onOpen}>Assign</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              onClose();
              toast({
                title: "Contractor assigned.",
                description: "A contractor has been assigned.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <ModalHeader bg={"primaryGradient"} color={"white"}>
                  Assign Contractor
                </ModalHeader>
                <ModalCloseButton color={"white"} _focus={"none"} />
                <ModalBody>
                  <Box w="60%" mt={8}>
                  <InputField placeholder="Original Language" fieldName="OriginalLanguage" label="Document Original Language" extra={"*"} />
                    <InputField placeholder="Conversion Language" fieldName="LanguageTo" label="Requesting Written Language" extra={"*"} />
                    <TextArea fieldName="AdditionalNotes" label="Additional Note (if any)" placeholder="Additional Notes" type="text" />
                    <SelectField fieldName="Gender" label="Gender" options={optionsGender} />
                    <SelectField fieldName="Contractor" label="Contractor" options={contratorList} defaultValue="No contractor selected" />
                    <TextArea fieldName="Notes" label="Notes" type="text" />
                    <InputField fieldName="RequestedDate" label="Requested Date" placeholder="Requested Date" type="datetime-local" />
                    <InputField fieldName="Deadline" label="Deadline" placeholder="Deadline" type="datetime-local" />
                    <DocumentField fieldName="Attachments" label="Attachments" />
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    mr={3}
                    borderRadius={"8px"}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"primaryBtn"}
                    color={"white"}
                    _hover={"btnHover"}
                    _
                    active={"btnActive"}
                    borderRadius="8px"
                    variant="solid"
                    type="submit"
                  >
                    Save
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

function StatusModal({ rowData, updateStatus }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statusValue, setStatusValue] = useState(null);
  const options = [
    { value: "0", label: "Pending" },
    { value: "1", label: "Estimate Sent" },
    { value: "2", label: "Estimate Approved" },
    { value: "3", label: "Completed" },
  ];

  const submitHandler = () => {
    updateStatus(rowData.id, parseInt(statusValue));
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Change Status</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ModalHeader bg={"primaryGradient"} color={"white"}>
            Change Status
          </ModalHeader>
          <ModalCloseButton color={"white"} _focus={"none"} />
          <ModalBody>
          <Box mt={4}>
            <Flex direction='column' mb={"30px"}>
              <Flex
                display='flex'
                fontSize='sm'
                color={"gray"}
                _hover={{ cursor: "pointer" }}>
                Select current status for your project:
              </Flex>
              <RadioGroup onChange={setStatusValue} value={statusValue}>
                <Flex flexDir={'column'} gap={2}>
                  {options.map((option) => (
                  <Radio key={option.value} value={option.value} colorScheme='green'>{option.label}</Radio>
                  ))}
                </Flex>
              </RadioGroup>
            </Flex>
          </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              variant="outline"
              mr={3}
              borderRadius={"8px"}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bg={"primaryBtn"}
              color={"white"}
              _hover={"btnHover"}
              _
              active={"btnActive"}
              borderRadius="8px"
              variant="solid"
              onClick={submitHandler}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function BroadcastModal({contractorList}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const submitHandler = () => {
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Start Broadcasting</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ModalHeader bg={'primaryGradient'} color={'white'}>Broadcasting Contractors</ModalHeader>
          <ModalCloseButton color={'white'} _focus={'none'} />
          <ModalBody>
          <Box py={8} gap={8}>
            <Text fontWeight={'bold'}>Relevant Contractors</Text>

            <Table variant="simple" mb="24px" px={0} my={4}>
              <Thead borderBottomWidth={"2px"}>
                <Tr>
                  <Th paddingInline={1}></Th>
                  <Th paddingInline={0}>Name</Th>
                  <Th paddingInline={0}>Languages</Th>
                  <Th paddingInline={0}>Rate</Th>
                  <Th paddingInline={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {contractorList.map((contractor, index) => (
                  <Tr key={index} borderBottomWidth={"1px"}>
                    <Td paddingInline={1}>
                      <Checkbox
                        isChecked={selectedRows.includes(contractor.id)}
                        onChange={() => toggleRowSelection(contractor.id)}
                        colorScheme='green'
                      />
                    </Td>
                    <Td paddingInline={0}>{contractor.firstName} {contractor.lastName}</Td>
                    <Td paddingInline={0}>{contractor.originalLanguage} - {contractor.languageTo}</Td>
                    <Td paddingInline={0}>${contractor.rates_Per_Hour}</Td>
                    <Td paddingInline={0} color={'primary'}>Details</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' variant='outline' mr={3} borderRadius={'8px'} onClick={onClose}>
              Cancel
            </Button>
            <Button bg={'primaryBtn'}
		        color={'white'}
            _hover={'btnHover'}
            _ active={'btnActive'}
            borderRadius='8px'
		        variant='solid'
            onClick={submitHandler}>
              Broadcast
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function EstimateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const submitHandler = () => {
    toast({
      title: "Estimate sent.",
      description: "An estimate has been sent.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Send Estimate</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'} height={'100%'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ModalHeader bg={'primaryGradient'} color={'white'}>Estimate</ModalHeader>
          <ModalCloseButton color={'white'} _focus={'none'} />
          <ModalBody>
          
            <PDFViewer style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
              <AssignmentForm />
            </PDFViewer>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' variant='outline' mr={3} borderRadius={'8px'} onClick={onClose}>
              Cancel
            </Button>
            <Button bg={'primaryBtn'}
		        color={'white'}
            _hover={'btnHover'}
            _ active={'btnActive'}
            borderRadius='8px'
		        variant='solid'
            onClick={submitHandler}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function TableMenu(props) {
  const { icon, rowData, updateStatus, contractorList, ...rest } = props;

  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const toast = useToast();

  const duplicateHandler = () => {
    toast({
      title: 'Query duplicated.',
      description: "A duplicate of this query is made.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton {...rest} onClick={onOpen1}>
        {icon}
      </MenuButton>
      <MenuList color={'black'}>
        
        {/* <MenuItem onClick={estimateHandler}>Send Estimate</MenuItem> */}
        <EstimateModal />
        <BroadcastModal contractorList={contractorList} />
        <AssignModal />
        <StatusModal rowData={rowData} updateStatus={updateStatus} />
        <MenuItem onClick={duplicateHandler}>Duplicate</MenuItem>
        
      </MenuList>
    </Menu>
  );
}
