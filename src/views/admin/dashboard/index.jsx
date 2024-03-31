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
  SimpleGrid,
  Flex,
  useColorModeValue,
  Button,
  Icon,
  Text
} from "@chakra-ui/react";
import { MdOutlineCalendarToday } from "react-icons/md";

// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import RecentActivities from "./components/RecentActivities"
import IconBoxCard from "components/card/Iconcard";
import JobsTable from "./components/JobsTable";

// Assets
import {columnsDataJobs} from "./variables/columnsData";
import tableDataJobs from "views/admin/dashboard/variables/tableDataJobs.json";
import openQueryIcon from "assets/icons/person_raised_hand2.svg";
import cancellationReqIcon from "assets/icons/person_cancel.svg";
import openJobsIcon from "assets/icons/work.svg";
import closedJobsIcon from "assets/icons/task.svg"

// Base url
import BASE_URL from "config";

export default function UserReports() {

  const [isFetching, setIsFetching] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
      setIsFetching(true);
      fetchDashboardComponents();
  }, []);
  
  async function fetchDashboardComponents() {
      axios
        .get(`${BASE_URL}/Dashboard/GetDashboard`)
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
    {title:dashboardData.openQueries, description: 'Open Requests', icon: openQueryIcon},
    {title:dashboardData.cancelledRequests, description: 'Cancellation Requests', icon:cancellationReqIcon},
    {title:dashboardData.openJobs, description: 'Open Jobs', icon:openJobsIcon},
    {title:dashboardData.closedJobs, description: 'Closed Jobs', icon: closedJobsIcon}
  ];

  // Chakra Color Mode
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  return (
    <Box pt={4} overflowX={'auto'}>
      <Flex gap='20px'>
        <Flex w="75%" flexDir="column" gap='20px'>
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
                bg={'btnBg'}
                fontSize='sm'
                fontWeight='500'
                // color={textColorSecondary}
                borderRadius='7px'>
                <Icon
                  as={MdOutlineCalendarToday}
                  // color={textColorSecondary}
                  me='4px'
                />
                Monthly
            </Button>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap='20px'
            mb='20px'
            >
            
            {items.map((item, index) => (
              <IconBoxCard key={index} item={item} />
            ))}

          </SimpleGrid>
          <JobsTable columnsData={columnsDataJobs} tableData={dashboardData.jobs?? []} showPageSize={false} />
        </Flex>

        <Flex w="25%" flexDir="column" gap='20px'>
          <RecentActivities data={dashboardData.activities} />
          <MiniCalendar />
        </Flex>
      </Flex>
    </Box>
  );
}
