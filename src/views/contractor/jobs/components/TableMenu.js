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
} from "@chakra-ui/react";
import RadioField from 'components/fields/RadioField';
import SelectField from "components/fields/SelectField";
import TextArea from "components/fields/TextArea";
import InputField from "components/fields/InputField";
import DocumentField from 'components/fields/DocumentField';

// Assets
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
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
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

  const handleStatusChange = (value) => {
    setStatusValue(value);
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
              <RadioField
                mt={4}
                id="status"
                label="Select current status for your project:"
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "in progress", label: "In Progress" },
                  { value: "on review", label: "On Review" },
                ]}
                 onChange={handleStatusChange}
              />
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

export default function TableMenu(props) {
  const { icon, ...rest } = props;

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
        
        <MenuItem>Accept</MenuItem>
        <MenuItem>Cancel</MenuItem>
        
      </MenuList>
    </Menu>
  );
}
