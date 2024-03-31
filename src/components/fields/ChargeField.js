// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  InputLeftElement,
  Text,
  InputGroup,
  Icon
} from "@chakra-ui/react";
// Formik imports
import { Field, ErrorMessage } from "formik";
// Custom components
import React from "react";
import { FaDollarSign } from "react-icons/fa6";

export default function Default(props) {
  const { id, label, fieldName, extra, placeholder, type, mb, ...rest } = props;

  return (
    <Flex direction='column' mb={mb ? mb : "30px"}>
      <Flex
        display='flex'
        htmlFor={id}
        fontSize='sm'
        color={"gray"}
        _hover={{ cursor: "pointer" }}>
        {label}
        <Text fontSize='sm' fontWeight='400' ms='2px' color={'red'}>
          {extra}
        </Text>
      </Flex>

      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <FaDollarSign color='gray.300' />
        </InputLeftElement>
        <Field 
        {...rest}
        as={Input}
        type={type}
        id={id}
        name={fieldName}
        fontWeight='500'
        placeholder={placeholder}
        pl={8}
        _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
        borderRadius={'none'} />
      </InputGroup>
      {fieldName && <Text fontSize='sm' fontWeight='400' color='red'><ErrorMessage name={fieldName} /></Text>}
    </Flex>
  );
}
