/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// React imports
import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

// Axios import
import axios from "axios";

// Context import
import { UserContext } from "context/user-context";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Formik imports
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import { HiEye, HiEyeOff } from "react-icons/hi";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setShow(!show);

  const { updateInformation } = useContext(UserContext);
  // const navigate = useNavigate();
  const navigate = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = (loginPayload) => {
    //  Show loading spinner when submitting form
    setIsLoading(true);

    // Send login request
    axios
      .post(
        "http://ec2-34-217-79-31.us-west-2.compute.amazonaws.com/login",
        loginPayload
      )
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.authorizationToken;
          localStorage.setItem("token", token);

          if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          }

          updateInformation(
            response.data.name,
            response.data.userRole,
            response.data.userId
          );

          // Navigate based on role
          if (response.data.userRole === "Admin") {
            navigate.push("/admin/dashboard");
          } else if (response.data.userRole === "Contractor") {
            navigate.push("/contractor/dashboard");
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsInvalidCredentials(true);
      });
  };

  // const handleSubmit = (values) => {
  //   // Mock authentication logic (replace with actual authentication logic)
  //   if (values.email === 'admin@gmail.com' && values.password === 'admin123') {
  //     // Successful login
  //     console.log('Login successful');
  //     setIsInvalidCredentials(false);
  //     navigate.push("/admin/dashboard");
  //   } else {
  //     // Invalid credentials
  //     console.log('Invalid credentials');
  //     setIsInvalidCredentials(true);
  //   }
  // };

  return (
    <DefaultAuth>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        // h='70%'
        py={8}
        bgColor={"white"}
        alignItems="center"
        justifyContent="center"
        boxShadow={"xl"}
        borderRadius={"md"}
        px={{ base: "25px", md: "28px" }}
        flexDirection="column"
      >
        <Box>
          <Heading
            color={textColor}
            fontSize="36px"
            mb="10px"
            fontFamily={"Open Sans"}
          >
            Log In
          </Heading>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "0px" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl mt={"25px"}>
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    fontFamily="Open Sans"
                    color="var(--neutral-light-n-200, #6B778C)"
                    mb="8px"
                  >
                    Email
                  </FormLabel>
                  <Field
                    as={Input}
                    isRequired={true}
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="text"
                    placeholder="Enter your email"
                    fontWeight="500"
                    size="lg"
                    fontFamily="Open Sans"
                    border="1px solid #ABABAB"
                    borderRadius="3px"
                    _hover={{
                      borderColor: "#C4C4C4",
                      boxShadow: "0 0 0 1px #C4C4C4",
                    }}
                    name="email"
                    id="email"
                  />
                  {touched.email && errors.email && (
                    <Text fontSize="sm" fontWeight="400" color="red">
                      <ErrorMessage name={"email"} />
                    </Text>
                  )}
                  <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    fontFamily="Open Sans"
                    color="var(--neutral-light-n-200, #6B778C)"
                    display="flex"
                    mt="24px"
                  >
                    Password
                  </FormLabel>
                  <InputGroup size="md">
                    <Field
                      as={Input}
                      isRequired={true}
                      fontSize="sm"
                      placeholder="Enter your password"
                      size="lg"
                      fontFamily="Open Sans"
                      border="1px solid #ABABAB"
                      borderRadius="3px"
                      _hover={{
                        borderColor: "#C4C4C4",
                        boxShadow: "0 0 0 1px #C4C4C4",
                      }}
                      type={show ? "text" : "password"}
                      name="password"
                      id="password"
                    />
                    <InputRightElement
                      display="flex"
                      alignItems="center"
                      mt="4px"
                    >
                      <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: "pointer" }}
                        as={show ? HiEyeOff : HiEye}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {touched.password && errors.password && (
                    <Text fontSize="sm" fontWeight="400" color="red">
                      <ErrorMessage name={"password"} />
                    </Text>
                  )}
                  <Button
                    fontSize="sm"
                    fontWeight="500"
                    mt="24px"
                    w="100%"
                    h="50"
                    borderRadius={"8px"}
                    bg="#007905"
                    color="#FFF"
                    _hover={{ bg: "btnHover" }}
                    _active={{ bg: "btnActive" }}
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Log In"
                  >
                    Log In
                  </Button>
                  {isInvalidCredentials && (
                    <Text fontSize="sm" fontWeight="400" color="red" mt="12px">
                      Invalid credentials. Please try again.
                    </Text>
                  )}
                  <Flex justifyContent="space-between" align="center" mt="12px">
                    <NavLink to="/auth/forgot-password">
                      <Text
                        color={textColorBrand}
                        fontSize="sm"
                        w="124px"
                        fontWeight="500"
                      >
                        Forgot password?
                      </Text>
                    </NavLink>
                  </Flex>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
