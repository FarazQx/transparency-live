// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  Text,
  Box,
  Image
} from "@chakra-ui/react";

import EditIcon from 'assets/icons/edit_square.svg'
import PdfIcon from 'assets/icons/pdf_icon.svg'

// Custom components
import React from "react";

export default function Default(props) {
  const { id, label, extra, fileName="Invoice.pdf", mb, ...rest } = props;
  
  return (
    <Flex direction="column" mb={mb ? mb : "30px"}>
      <Flex
        display="flex"
        fontSize="sm"
        color={"gray"}
        _hover={{ cursor: "pointer" }}
        // alignItems="center"
        flexDir={'column'}
      >
        <FormLabel htmlFor={id}>
          {label}{" "}
          {extra && (
            <Text fontSize="sm" fontWeight="400" ms="2px" color={"red"}>
              {extra}
            </Text>
          )}
        </FormLabel>
        <Flex alignItems="center" bgColor={'secondary'} p={4} w={'100%'} flexDir={'row'} justifyContent={'space-between'} borderRadius={'lg'}>
          <Flex alignItems={'center'}>
            <Image src={PdfIcon} />
            <Text fontSize="sm" ms="2" fontWeight="400" color={"black"}>
                {fileName}
            </Text>
          </Flex>
          <Image src={EditIcon} />
        </Flex>
      </Flex>
    </Flex>
  );
}