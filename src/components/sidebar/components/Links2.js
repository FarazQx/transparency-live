import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, HStack, Flex, Text } from "@chakra-ui/react";

export function SidebarLinks(props) {
  const location = useLocation();
  const activeColor = "green";
  const textColor = "white";

  const { routes } = props;

  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryToggle = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {

      return routes.map((route, index) => {
      if (route.name == 'Jobs' && route.items) {
        return (
          <Accordion allowMultiple key={index}>
            <AccordionItem border={'none'}>
              <AccordionButton onClick={() => handleCategoryToggle(route.name)} px={0} py={2} _hover={{bgColor:'none'}}>
              {route.icon && (
                    <Box w='100%'>
                    <HStack
                        py="5px"
                        ps="10px"
                    >
                        <Flex w="100%" alignItems="center" justifyContent="center">
                        <Box
                            me="18px"
                        >
                            {route.icon}
                        </Box>
                        <Text
                            me="auto"
                            // color={
                            // activeRoute(route.path.toLowerCase()) ? activeColor : textColor
                            // }
                            // fontWeight={
                            // activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                            // }
                            color={textColor}
                            fontWeight={'normal'}
                        >
                            {route.name}
                        </Text>
                        </Flex>
                        <AccordionIcon color={'white'} />
                    </HStack>
                    </Box>
                )}
              </AccordionButton>
              <AccordionPanel py={0} pl={8}>
                {createLinks(route.items)}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } 
      else if (route.layout === "/admin" || route.layout === "/contractor") {
        return <CustomLink key={index} route={route} activeRoute={activeRoute} textColor={textColor} activeColor={activeColor} />;
      }
    });
  };

  return createLinks(routes);
}

function CustomLink({ route, activeRoute, textColor, activeColor }) {
  return (
    <NavLink to={route.layout + route.path}>
      {route.icon ? (
        <Box bgColor={activeRoute(route.path.toLowerCase()) ? 'white' : 'transparent'} borderRadius={'lg'} transition="background-color 0.1s linear">
          <HStack
            spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
            py="5px"
            ps="10px"
          >
            <Flex w="100%" alignItems="center" justifyContent="center" h='36px'>
              <Box
                me="18px"
              >
                {activeRoute(route.path.toLowerCase()) ? route.iconActive : route.icon}
              </Box>
              <Text
                me="auto"
                color={
                  activeRoute(route.path.toLowerCase()) ? activeColor : textColor
                }
                // fontWeight={
                //   activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                // }
              >
                {route.name}
              </Text>
            </Flex>
            {/* <Box
              h="36px"
              w="4px"
              bg={
                activeRoute(route.path.toLowerCase())
                  ? activeColor
                  : "transparent"
              }
              borderRadius="5px"
            /> */}
          </HStack>
        </Box>
      ) : (
        <Box bgColor={activeRoute(route.path.toLowerCase()) ? 'white' : 'transparent'} borderRadius={'lg'} transition="background-color 0.3s linear">
          <HStack
            spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
            py="5px"
            ps="10px"
          >
            <Flex w="100%" alignItems="center" justifyContent="center" h='36px'>
              <Text
                me="auto"
                color={
                  activeRoute(route.path.toLowerCase()) ? activeColor : textColor
                }
              >
                {route.name}
              </Text>
            </Flex>
          </HStack>
        </Box>
      )}
    </NavLink>
  );
}

export default SidebarLinks;
