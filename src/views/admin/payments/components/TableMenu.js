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
  Flex,
  Radio,
  RadioGroup
} from "@chakra-ui/react";
import RadioField from "components/fields/RadioField";
import InvoiceField from "components/fields/InvoiceField";

// Assets
function InvoiceModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen}>Send Invoices</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"primaryGradient"} color={"white"}>
            Send Invoices
          </ModalHeader>
          <ModalCloseButton color={"white"} _focus={"none"} />
          <ModalBody>
            <Box w="60%" mt={8}>
              <InvoiceField name="Invoice" label="Requestor Invoice" />
              <InvoiceField name="Invoice" label="Contractor Invoice" />
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
            >
              Save
            </Button>
          </ModalFooter>
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
    { value: "1", label: "Invoices Sent" },
    { value: "2", label: "Completed" },
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

export default function TableMenu(props) {
  const { icon, rowData, updateStatus, ...rest } = props;
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
      <MenuList color={"black"}>
        <InvoiceModal />
        <StatusModal rowData={rowData} updateStatus={updateStatus} />
      </MenuList>
    </Menu>
  );
}
