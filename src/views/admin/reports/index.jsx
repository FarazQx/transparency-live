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
import React, { useState, useEffect } from "react";

// Axios import 
import axios from "axios";

// Chakra imports
import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  Button
} from "@chakra-ui/react";
// Assets
import { MdOutlineCalendarToday } from "react-icons/md";
// Custom components
import IconBoxCard from "components/card/Iconcard";
import TotalSpent from "views/admin/reports/components/TotalSpent";
import MonthlyRevenue from "views/admin/reports/components/MonthlyRevenue";
import totalOrdersIcon from "../../../assets/icons/list_alt.svg";
import totalRevenueIcon from "../../../assets/icons/monetization_on.svg";
import totalQueriesIcon from "../../../assets/icons/person_raised_hand2.svg";
import totalContractorsIcon from "../../../assets/icons/badge.svg";
import totalClientsIcon from "../../../assets/icons/account_circle.svg";
import totalCancelledIcon from "../../../assets/icons/person_cancel.svg";

export default function Reports() {
  
  const [isFetching, setIsFetching] = useState(false);
  const [dashboardData, setDashboardData] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
      setIsFetching(true);
      fetchReportComponents();
  }, []);

  async function fetchReportComponents() {
    axios
      .get("http://34.217.79.31/Report/GetReportDashboard")
      .then((response) => {
          setIsFetching(false);
          setError(false);
          setDashboardData(response.data);
      })
      .catch((err) => {
          console.log(err); setError(true); setIsFetching(false);
      });
  }
  const items = [
    {title: dashboardData.totalOrders, description: 'Total Orders', icon: totalOrdersIcon},
    {title: dashboardData.totalRevenue, description: 'Total Revenue', icon:totalRevenueIcon},
    {title: dashboardData.totalQueries, description: 'Total Queries', icon:totalQueriesIcon},
    {title: dashboardData.totalContractors, description: 'Total Contractors', icon: totalContractorsIcon},
    {title: dashboardData.totalClients, description: 'Total Clients', icon: totalClientsIcon},
    {title: dashboardData.totalCancelled, description: 'Total Cancelled', icon: totalCancelledIcon}
  ];

  // Chakra Color Mode
  const boxBg = 'btnBg';
  const textColor = 'useColorModeValue("secondaryGray.900", "white")';
  const textColorSecondary = 'black';

  return (
    <Box pt={4}>
      <Flex gap='20px' mb='20px'>

        <Flex w="55%" flexDir="column" gap='20px'>
            <Flex align='center' w='100%' py='10px'>
              <Text
                me='auto'
                color={textColor}
                fontSize='xl'
                fontWeight='700'
                lineHeight='100%'>
                  Stats Overview
              </Text>
              <Button
                  bg={boxBg}
                  fontSize='sm'
                  fontWeight='500'
                  // color={textColorSecondary}
                  borderRadius='7px'>
                  <Icon
                    as={MdOutlineCalendarToday}
                    color={textColorSecondary}
                    me='4px'
                  />
                  Monthly
              </Button>
            </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}
            gap='20px'
            >
              {items.map((item, index) => (
                <IconBoxCard key={index} item={item} />
              ))}
          </SimpleGrid>
        </Flex>

        <Flex w="45%" flexDir="column" gap='20px'>
          <Flex align='center' w='100%' px='15px' py='10px'>
            <Text
              me='auto'
              color={textColor}
              fontSize='xl'
              fontWeight='700'
              lineHeight='100%'>
                Revenue
            </Text>
            <Button
                bg={boxBg}
                fontSize='sm'
                fontWeight='500'
                // color={textColorSecondary}
                borderRadius='7px'>
                <Icon
                  as={MdOutlineCalendarToday}
                  color={textColorSecondary}
                  me='4px'
                />
                6 months
            </Button>
          </Flex>
          
          <MonthlyRevenue data={dashboardData.barRevenueChart} />
        </Flex>
      </Flex>

      <Flex w="100%" flexDir="column" gap='20px'>
        <Flex align='center' w='100%' px='15px' py='10px'>
            <Text
              me='auto'
              color={textColor}
              fontSize='xl'
              fontWeight='700'
              lineHeight='100%'>
                Translation & Interpretation Graph
            </Text>
            <Button
              bg={boxBg}
              fontSize='sm'
              fontWeight='500'
              // color={textColorSecondary}
              borderRadius='7px'>
              <Icon
                as={MdOutlineCalendarToday}
                color={textColorSecondary}
                me='4px'
              />
              Yearly
            </Button>
          </Flex>
          
          <TotalSpent data={dashboardData.lineChart} />
        </Flex>
      
    </Box>
  );
}
