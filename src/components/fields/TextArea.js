// Chakra imports
import {
    Flex,
    FormLabel,
    Input,
    Text,
    Textarea,
  } from "@chakra-ui/react";
  // Formik imports
import { Field, ErrorMessage } from "formik";
  // Custom components
  import React from "react";
  
  export default function Default(props) {
    const { id, label, fieldName, extra, placeholder, mb, ...rest } = props;
  
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
        <Field
          as={Textarea}
          {...rest}
          border={'1px solid'}
          borderColor={'secondaryGray.100'}
          id={id}
          name={fieldName}
          fontWeight='500'
          variant='main'
          placeholder={placeholder}
          _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
          h='44px'
          maxh='44px'
          borderRadius={'none'}
        />
        {fieldName && <Text fontSize='sm' fontWeight='400' color='red'><ErrorMessage name={fieldName} /></Text>}
      </Flex>
    );
  }
  