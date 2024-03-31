import React, { useState } from "react";

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
  Radio,
  RadioGroup
} from "@chakra-ui/react";

// Assets
import SelectField from "components/fields/SelectField";
import TextArea from "components/fields/TextArea";
import InputField from "components/fields/InputField";
import DocumentField from 'components/fields/DocumentField';

function AssignModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const options = [
    { value: '1', text: 'English' },
    { value: '2', text: 'Spanish' },
  ];
  const optionsLangto = [
    { value: '1', text: 'Spanish' },
    { value: '2', text: 'French' },
  ];
  const optionsContractor = [
    { value: '1', text: 'Williams' },
    { value: '2', text: 'John' },
  ];
  return (
    <>
      <MenuItem onClick={onOpen}>Assign</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={'primaryGradient'} color={'white'}>Assign Contractor</ModalHeader>
          <ModalCloseButton color={'white'} _focus={'none'} />
          <ModalBody>
          <Box w="60%" mt={8}>
          <SelectField name="Name" label="Document Original Language" placeholder="Document Original Language"  extra={'*'} options={options} />
          <SelectField name="Name" label="Requesting Written Language" placeholder="Requesting Written Language"  extra={'*'} options={optionsLangto} />
          <SelectField name="Name" label="Contractor" placeholder="Contractor" options={optionsContractor} />
          <TextArea name="Name" label="Notes" placeholder="Out of state from Jan 1 - Jan 30 2024" type="text" />
          <InputField name="date" label="Requested Date" placeholder="Requested Date" type="datetime-local" />
          <InputField name="time" label="Deadline" placeholder="Deadline" type="datetime-local" />
          <DocumentField name="Name" label="Attachments" />
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
		        variant='solid'>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function StatusModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [statusValue, setStatusValue] = useState(null);
  const toast = useToast()
  const options = [
    { value: "0", label: "Pending" },
    { value: "1", label: "Estimate Sent" },
    { value: "2", label: "Estimate Approved" },
    { value: "3", label: "Completed" },
  ];

  const submitHandler = () => {
    // updateStatus(rowData.id, parseInt(statusValue));
    onClose();
    toast({
      title: 'Status changed.',
      description: "Status has been changed.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Change Status</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ModalHeader bg={'primaryGradient'} color={'white'}>Change Status</ModalHeader>
          <ModalCloseButton color={'white'} _focus={'none'} />
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
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function TableMenu(props) {
  const { icon, ...rest } = props;
  const toast = useToast()

  const assignmentHandler = () => {
    toast({
      title: 'Assignment sent.',
      description: "Assignment has been sent.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton {...rest} onClick={onOpen1}>
        {icon}
      </MenuButton>
      <MenuList color={'black'}>
        
        <MenuItem onClick={assignmentHandler}>Send Assignment Form</MenuItem>
        <MenuItem color={'gray.400'}>Assign</MenuItem>
        <StatusModal />
        
      </MenuList>
    </Menu>
  );
}
