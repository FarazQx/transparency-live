// Chakra imports
import { Flex,Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import loginBackgroundImage from "assets/icons/Login-Background-v2.svg";
import Logo from 'assets/logo/logo.png'

function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding={2}
      bg={'primaryGradient'}
      borderBottom="1px solid"
      borderColor="gray.200"
      position={'fixed'}
      w='100%'
    >
      {/* Logo on the left */}
      <Box w={'90%'} mx='auto'>
          <Image src={Logo} alt="Logo" h={70} />
      </Box>

    </Flex>
  );
}

function AuthIllustration(props) {
  const { children } = props;
  // Chakra color mode
  return (
    <>
      <Navbar />
      <Flex bg={'white'}>
        <Flex
          w='100%'
          h='100vh'
          justifyContent='center'
          alignItems={'center'}
          direction='column'
          backgroundImage={`url(${loginBackgroundImage})`}
          backgroundSize="100%"  
          backgroundPosition="bottom" 
          backgroundRepeat="no-repeat"
          >
          {children}
        </Flex>
      </Flex>
    </>
  );
}

export default AuthIllustration;
