import React, { useEffect, useState } from "react";

// Chakra imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Image,
  Flex,
  Avatar,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Badge,
} from "@chakra-ui/react";

// Chakra Imports
import InputField from "components/fields/InputField";
import InvoiceField from "components/fields/InvoiceField";

import axios from "axios";
import BASE_URL from "config";

// Assets
import PdfIcon from "assets/icons/pdf_icon.svg";
import { DownloadIcon } from "@chakra-ui/icons";

export default function ViewModal(props) {
  // const rowData = props.rowData.values;
  useEffect(() => {
    fetchPastOrders(props.rowData);
  }, []);
  const rowData = props.rowData ?? {};
  const type = rowData.serviceType;
  const status = rowData.queryStatus;
  const [pastOrders, setPastOrders] = useState();

  const fetchPastOrders = (data) => {
    axios
      .post(
        `${BASE_URL}/Query/GetPastOrders`,
        { email: data.bilingEmail },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPastOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <ModalCloseButton _focus={"none"} />
          <ModalBody>
            <Flex py={8} gap={8}>
              {/* Right column with client details */}
              <Flex
                w={"30%"}
                bg={"secondary"}
                rounded={"xl"}
                flexDir={"column"}
                py={4}
              >
                <Avatar
                  src={"https://bit.ly/dan-abramov"}
                  _hover={{ cursor: "pointer" }}
                  color="white"
                  name="Profile Photo"
                  size="lg"
                  alignSelf={"center"}
                />
                <Box pt={8} px={8}>
                  <Text display="flex" fontSize="sm" color={"gray"}>
                    Requestor Name
                  </Text>
                  <Text display="flex" fontSize="sm" color="black">
                    {rowData.companyName}
                  </Text>
                </Box>
                <Box pt={4} px={8}>
                  <Text display="flex" fontSize="sm" color={"gray"}>
                    Address
                  </Text>
                  <Text display="flex" fontSize="sm">
                    {rowData.address}
                  </Text>
                </Box>
                <Box pt={4} px={8}>
                  <Text display="flex" fontSize="sm" color={"gray"}>
                    Billing Address
                  </Text>
                  <Text display="flex" fontSize="sm">
                    {rowData.billingAddress}
                  </Text>
                </Box>
                <Box pt={4} px={8}>
                  <Text display="flex" fontSize="sm" color={"gray"}>
                    Phone
                  </Text>
                  <Text display="flex" fontSize="sm">
                    {rowData.phone}
                  </Text>
                </Box>
                <Box pt={4} px={8}>
                  <Text display="flex" fontSize="sm" color={"gray"}>
                    Email
                  </Text>
                  <Text display="flex" fontSize="sm">
                    {rowData.email}
                  </Text>
                </Box>
              </Flex>

              {/* Right column with project details */}
              <Flex w={"70%"} flexDir={"column"}>
                <Text fontWeight={"bold"}>Project Details</Text>

                <Flex minW={"100%"} gap={4} flexDir={"row"} pt={4}>
                  {type === 1 ? ( // Render only if the type is 'interpretation'
                    <>
                      <InputField
                        fieldName="Name"
                        label="Interpretation Type"
                        bg="secondary"
                        mb={4}
                        form={false}
                        defaultValue={
                          rowData.interpretationType == 1
                            ? "Consecutive"
                            : "normal"
                        }
                        readOnly
                      />
                      <InputField
                        fieldName="FirstName"
                        label="Interpretation Mode"
                        bg="secondary"
                        mb={4}
                        form={false}
                        defaultValue={
                          rowData.interpretationMode == 0
                            ? "Translation"
                            : "Interpretation"
                        }
                        readOnly
                      />
                    </>
                  ) : (
                    <>
                      <InputField
                        fieldName="Name"
                        label="Translation Mode"
                        bg="secondary"
                        mb={4}
                        form={false}
                        defaultValue={
                          rowData.interpretationMode == 1
                            ? "Consecutive"
                            : "normal"
                        }
                        readOnly
                      />
                      <Box></Box>
                    </>
                  )}
                </Flex>
                <Flex minW={"100%"} gap={4} flexDir={"row"}>
                  <InputField
                    fieldName="Name"
                    label="Document Original Language"
                    bg="secondary"
                    mb={4}
                    form={false}
                    defaultValue={rowData.originalLanguage}
                    readOnly
                  />
                  <InputField
                    fieldName="Requesting "
                    label="Requesting Language"
                    bg="secondary"
                    mb={4}
                    form={false}
                    defaultValue={rowData.requestingLanguage}
                    readOnly
                  />
                </Flex>
                {type === 1 ? (
                  <>
                    <Flex minW={"100%"} gap={4} flexDir={"row"}>
                      <InputField
                        fieldName="Name"
                        label="Appointment Date"
                        bg="secondary"
                        mb={4}
                        type="datetime-local"
                        form={false}
                        defaultValue={rowData.appointmentDate}
                        readOnly
                      />
                      <InputField
                        fieldName="request_date"
                        label="Appointment Time"
                        bg="secondary"
                        mb={4}
                        type="datetime-local"
                        form={false}
                        defaultValue={rowData.appointmentTime}
                        readOnly
                      />
                    </Flex>
                    <Flex minW={"100%"} gap={4} flexDir={"row"}>
                      <InputField
                        fieldName="Name"
                        label="Appointment Duration"
                        bg="secondary"
                        mb={4}
                        type="datetime-local"
                        form={false}
                        defaultValue={rowData.appointmentDuration}
                        readOnly
                      />
                      <InputField
                        fieldName="request_date"
                        label="Appointment Nature"
                        bg="secondary"
                        mb={4}
                        form={false}
                        defaultValue={rowData.appointmentNature}
                        readOnly
                      />
                    </Flex>
                    <Flex minW={"100%"} gap={4} flexDir={"row"}>
                      <InputField
                        fieldName="Name"
                        label="Appointment Address"
                        bg="secondary"
                        mb={4}
                        form={false}
                        defaultValue={rowData.appointmentAddress}
                        readOnly
                      />
                      <InputField
                        fieldName="request_date"
                        label="Appointment Location"
                        bg="secondary"
                        mb={4}
                        form={false}
                        defaultValue={rowData.appointmentNature}
                        readOnly
                      />
                    </Flex>
                  </>
                ) : (
                  <Flex minW={"100%"} gap={4} flexDir={"row"}>
                    <InputField
                      fieldName="Name"
                      label="Requested Date"
                      bg="secondary"
                      mb={4}
                      type="datetime-local"
                      form={false}
                      defaultValue={rowData.requestedTime}
                      readOnly
                    />
                    <InputField
                      fieldName="request_date"
                      label="Deadline"
                      bg="secondary"
                      mb={4}
                      type="datetime-local"
                      form={false}
                      defaultValue={rowData.deadline}
                      readOnly
                    />
                  </Flex>
                )}
                <Flex minW={"100%"} gap={4} flexDir={"row"}>
                  <Flex
                    display="flex"
                    fontSize="sm"
                    color={"gray"}
                    flexDir={"column"}
                  >
                    Status
                    {
                      // Check the status and render the appropriate badge
                      status === 0 ? (
                        <Badge
                          bg="rgba(91, 114, 130, 0.20)"
                          color="#384752"
                          borderRadius={"6px"}
                        >
                          Pending
                        </Badge>
                      ) : status === 1 ? (
                        <Badge
                          bg="rgba(232, 100, 39, 0.30)"
                          color="#DC4C09"
                          borderRadius={"6px"}
                        >
                          Estimate Sent
                        </Badge>
                      ) : status === 2 ? (
                        <Badge
                          bg="rgba(60, 125, 14, 0.30)"
                          color="#3C7D0E"
                          borderRadius={"6px"}
                        >
                          Estimate Approved
                        </Badge>
                      ) : status === 3 ? (
                        <Badge
                          bg="#B3D4FF"
                          color="#0747A6"
                          borderRadius={"6px"}
                        >
                          Assigned
                        </Badge>
                      ) : status === 4 ? (
                        <Badge
                          bg="#FFE380"
                          color="#72663E"
                          borderRadius={"6px"}
                        >
                          In Progress
                        </Badge>
                      ) : status === 5 ? (
                        <Badge
                          bg="rgba(143, 73, 222, 0.30)"
                          color="#5D2C94"
                          borderRadius={"6px"}
                        >
                          On Review
                        </Badge>
                      ) : status === 6 ? (
                        <Badge
                          bg="#79F2C0"
                          color="#006644"
                          borderRadius={"6px"}
                        >
                          Completed
                        </Badge>
                      ) : status === 7 ? (
                        <Badge
                          bg="#FFBDAD"
                          color="#843737"
                          borderRadius={"6px"}
                        >
                          Cancelled
                        </Badge>
                      ) : null
                    }
                  </Flex>
                </Flex>

                <Text fontWeight={"bold"} pt={4}>
                  Attachments
                </Text>
                <Flex w={"100%"} gap={4} flexDir={"row"} pt={4}>
                  <Flex
                    alignItems="center"
                    bgColor={"secondary"}
                    p={4}
                    h={"50px"}
                    gap={4}
                    flexDir={"row"}
                    justifyContent={"space-between"}
                    borderRadius={"lg"}
                  >
                    {type == 0 ? (
                      <Flex alignItems={"center"}>
                        <Image src={PdfIcon} />
                        <Text
                          fontSize="sm"
                          ms="2"
                          fontWeight="400"
                          color={"black"}
                        >
                          Translation.pdf
                        </Text>
                      </Flex>
                    ) : (
                      <Flex alignItems={"center"}>
                        <Image src={PdfIcon} />
                        <Text
                          fontSize="sm"
                          ms="2"
                          fontWeight="400"
                          color={"black"}
                        >
                          Assignment.pdf
                        </Text>
                      </Flex>
                    )}
                    <DownloadIcon />
                  </Flex>
                </Flex>

                <Text fontWeight={"bold"} pt={4}>
                  Contractor
                </Text>
                <Flex minW={"100%"} gap={4} flexDir={"row"} pt={4}>
                  <InputField
                    fieldName="Name"
                    label="Contractor"
                    bg="secondary"
                    mb={4}
                    form={false}
                    defaultValue={
                      rowData.contractor == null
                        ? "No contractor Assigned"
                        : rowData.contractor
                    }
                    readOnly
                  />
                </Flex>

                <Text fontWeight={"bold"} pt={4}>
                  Past Orders
                </Text>
                <Table variant="simple">
                  <Thead>
                    <Tr color={"gray"}>
                      <Th paddingInline={1}>Requested Date</Th>
                      <Th paddingInline={1}>Contractor</Th>
                      <Th paddingInline={1}>Service Type</Th>
                      <Th paddingInline={1}>Status</Th>
                      <Th paddingInline={1}>Invoices</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pastOrders != null
                      ? pastOrders.map((order) => {
                          <Tr>
                            <Td paddingInline={1}>25 Dec 2023</Td>
                            <Td paddingInline={1}>Robert</Td>
                            <Td paddingInline={1}>Interpretation</Td>
                            <Td paddingInline={1}>
                              <Badge
                                bg="#79F2C0"
                                color="#006644"
                                borderRadius={"6px"}
                              >
                                Completed
                              </Badge>
                            </Td>
                            <Td paddingInline={1}>
                              <Flex
                                border={"1px solid gray"}
                                borderRadius={"md"}
                                p={0.5}
                                flexDir={"row"}
                                width={"125px"}
                                alignItems={"center"}
                              >
                                <Image src={PdfIcon} h={"18px"} w={"18px"} />
                                <Text color={"black"} ml={1}>
                                  Invoice.pdf
                                </Text>
                              </Flex>
                            </Td>
                          </Tr>;
                        })
                      : "No past Orders"}
                  </Tbody>
                </Table>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}