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
import React from "react";
import MiniCalendar from "components/calendar/MiniCalendar";
import RecentActivities from "./components/RecentActivities"
import IconBoxCard from "components/card/Iconcard";
import JobsTable from "./components/JobsTable";

// Assets
import {
  columnsDataJobs,
} from "views/admin/dashboard/variables/columnsData";
import tableDataJobs from "views/admin/dashboard/variables/tableDataJobs.json";
import openQueryIcon from "assets/icons/person_raised_hand2.svg";
import cancellationReqIcon from "assets/icons/person_cancel.svg";
import openJobsIcon from "assets/icons/work.svg";
import closedJobsIcon from "assets/icons/task.svg"

export default function UserReports() {

  const items = [{title:'52', description: 'Open Requests', icon: openQueryIcon},{title:'05', description: 'Cancellation Requests', icon:cancellationReqIcon},{title:'52', description: 'Open Jobs', icon:openJobsIcon},{title:'300', description: 'Closed Jobs', icon: closedJobsIcon}];

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
          <JobsTable columnsData={columnsDataJobs} tableData={tableDataJobs} showPageSize={false} />
        </Flex>

        <Flex w="25%" flexDir="column" gap='20px'>
          <RecentActivities />
          <MiniCalendar />
        </Flex>
      </Flex>
    </Box>
  );
}
