// Chakra imports
import {
  Flex,
  FormLabel,
  Text,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

// Formik imports
import { Field, ErrorMessage } from "formik";

export default function RadioField(props) {
  const { id, label, fieldName, extra, options, mb, onChange = () => {}, ...rest } = props;

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
      <RadioGroup>
        <Flex flexDir={'column'} gap={2}>
          {options.map((option) => (
          <Field as={Radio} key={option.value} value={option.value} colorScheme='green' name={fieldName}>{option.label}</Field>
          ))}
        </Flex>
      </RadioGroup>
      {/* {form ? (
        <Field
          {...rest}
          as={Input}
          type={type}
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
      ) : (
        <Input
          {...rest}
          type={type}
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
      )} */}
    </Flex>
  );
}
