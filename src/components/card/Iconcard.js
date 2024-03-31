import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import IconBox from "components/icons/IconBox";

export default function IconBoxCard({ item }) {
  return (
    <Flex
      maxW="sm"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      flexDir={'column'}
      justifyContent={'space-between'}
    >
      
        <Box
          p={2}
          textAlign="center"
        >
          <Image src={item.icon} />
        </Box>

        <Box p={4}>
            <Text fontSize="sm" color="gray.500" mb={2} noOfLines={2}>
              {item.description}
            </Text>
      
            <Heading fontSize="4xl" fontWeight="bold" mb={2} color="gray.700" >
              {item.title}
            </Heading>
        </Box>
    </Flex>
  );
}
