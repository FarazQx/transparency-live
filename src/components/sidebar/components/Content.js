// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import Links2 from "components/sidebar/components/Links2";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt={4} px="16px" borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt={8}>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          {/* <Links routes={routes} /> */}
          <Links2 routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
