import React from "react";

// Chakra imports
import { Flex, Image } from "@chakra-ui/react";
import Logo from 'assets/logo/logo.png'

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = "white";

  return (
    <Flex align='center' direction='column'>
      <Image src={Logo} alt="Logo" h={70} mb={4} />
    </Flex>
  );
}

export default SidebarBrand;
