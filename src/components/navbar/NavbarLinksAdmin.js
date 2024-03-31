// React imports
import React, { useEffect, useState, useContext } from "react";
// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import { FaChevronDown } from "react-icons/fa";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// Assets
import routes from "routes.js";
import { MdNotificationsNone } from "react-icons/md";
import { ThemeEditor } from "./ThemeEditor";
// Context import
import { UserContext } from "context/user-context";
import axios from "axios";
import BASE_URL from "config";

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { UserName, UserId } = useContext(UserContext);
  const [notifications, setNotifications] = useState();
  useEffect(() => {
    if (UserId !== undefined) fetchUserNotifications();
  }, []);
  const fetchUserNotifications = () => {
    axios
      .get(
        `${BASE_URL}/Account/GetUserNotifications`,

        {
          params: { userId: UserId },
        }
      )
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Chakra Color Mode
  const navbarIcon = "white";
  const textColor = "black";
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
    >
      <SidebarResponsive routes={routes} />

      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          p="20px"
          borderRadius="20px"
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Flex jusitfy="space-between" w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              ms="auto"
              cursor="pointer"
            >
              Mark all read
            </Text>
          </Flex>
          <Flex flexDirection="column">
            {notifications != undefined && notifications.length != 0
              ? notifications.map((notification) => (
                  <MenuItem
                    _hover={{ bg: "none" }}
                    _focus={{ bg: "none" }}
                    px="0"
                    borderRadius="8px"
                    mb="10px"
                  >
                    <ItemContent info={notification.message} aName="Alicia" />
                  </MenuItem>
                ))
              : "There are no notifications"}
          </Flex>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton px="10px">
          <Avatar
            src="https://bit.ly/dan-abramov"
            _hover={{ cursor: "pointer" }}
            color="white"
            name={UserName}
            // bg="#0145c1"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
      </Menu>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FaChevronDown />}
          bgColor="primaryGradient"
          color="white"
          p="0px"
          _hover={{ bgColor: "primaryGradient" }}
          _active={{ bgColor: "primaryGradient" }}
        >
          <Text fontSize="sm" fontWeight="700">
            {UserName}.
          </Text>
        </MenuButton>
        <MenuList p="0px" mt="10px" borderRadius="20px" border="none">
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {UserName}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius="8px"
              px="14px"
            >
              <NavLink to="/signin">
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  cursor="pointer"
                >
                  Logout
                </Text>
              </NavLink>
            </MenuItem>
            {/* <MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px">
							<NavLink to='/signin'><Text fontSize="sm">Log out</Text></NavLink>
						</MenuItem> */}
          </Flex>
        </MenuList>
      </Menu>
      {/* <ThemeEditor navbarIcon={navbarIcon} /> */}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
