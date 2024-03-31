// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  Text,
  Select
} from "@chakra-ui/react";
// Formik imports
import { Field, ErrorMessage } from "formik";
// Custom components
import React from "react";

export default function Default(props) {
  const { id, label, fieldName, extra, placeholder, form=true, mb, options, ...rest } = props;

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
      {form ? (
        <Field as={Select} borderRadius={'none'} name={fieldName} placeholder={placeholder}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </Field>
      ) : (
        <Select borderRadius={'none'} name={fieldName} placeholder={placeholder}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </Select>
      )}
      {fieldName && <Text fontSize='sm' fontWeight='400' color='red'><ErrorMessage name={fieldName} /></Text>}
    </Flex>
  );
}
      