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
import InvoiceField from 'components/fields/InvoiceField';

// Assets
function InvoiceModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <MenuItem onClick={onOpen}>Send Invoices</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={'primaryGradient'} color={'white'}>Send Invoices</ModalHeader>
          <ModalCloseButton color={'white'} _focus={'none'} />
          <ModalBody>
          <Box w="60%" mt={8}>
            <InvoiceField name="Invoice" label="Requestor Invoice" />
            <InvoiceField name="Invoice" label="Contractor Invoice" />
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
