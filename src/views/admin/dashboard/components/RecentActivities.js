// React imports
import { useState } from 'react';

// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
  Avatar,
  VStack,
  Button,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import IconBox from "components/icons/IconBox";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import React from "react";

export default function RecentActivities(props) {
  const { data, ...rest } = props;
  const [showAll, setShowAll] = useState(false);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest} boxShadow="md">
      <Flex alignItems="center" w="100%" mb="30px">
        <Text color={textColor} fontSize="lg" fontWeight="700">
          Recent Activities
        </Text>
        {/* <Menu ms='auto' /> */}
      </Flex>
      <Box>
        
        <VStack align="start" pb={2} gap={4}>
            {/* <Flex direction="row" w="100%">
                <Avatar size="sm" name="Naveed" src="path/to/avatar.jpg" mr={2} />
                <Flex direction="column">
                    <Text fontSize="sm" color="gray.500" textAlign="left">
                    Dec 05, 2023
                    </Text>
                    <Text fontSize="sm" textAlign="left">
                    Naveed assigned job #13335 to Peter.
                    </Text>
                </Flex>
            </Flex> */}

            {/* Data coming from API  */}
            {data != null && data.slice(0, showAll ? data.length : 3).map((activity, index) => (
            <Flex direction="row" w="100%" key={index}>
                <Avatar size="sm" name="Admin" src="path/to/avatar.jpg" mr={2} />
                <Flex direction="column">
                    <Text fontSize="sm" color="gray.500" textAlign="left">
                    Dec 05, 2023
                    </Text>
                    <Text fontSize="sm" textAlign="left">
                    {activity.description}
                    </Text>
                </Flex>
            </Flex>
            ))}
        </VStack>
        <Button
          mt={4}
          bg={'btnBg'}
          borderRadius={"8px"}
          size="md"
          alignSelf="center"
          onClick={() => setShowAll(!showAll)}
        >
          {!showAll ? 'View' : 'Hide'} All
        </Button>
      </Box>
    </Card>
  );
}
