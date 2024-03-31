// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Checkbox,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Icon,
  Badge,
  Image
} from "@chakra-ui/react";

//libraries imports
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

// Components imports
import Card from "components/card/Card";
import Pagination from "components/pagination/Pagination";
import Search from "components/search/Search";
import PageSize from "components/pagination/PageSize";
import TableMenu from "./TableMenu";

// Icon imports
import EditIcon from 'assets/icons/edit_square.svg'
import ViewIcon from 'assets/icons/visibility.svg'
import { IoEllipsisVertical } from "react-icons/io5";

export default function DataTable(props) {
  const {
    columnsData,
    tableData,
    isSelectable = false,
    showPageSize = false,
    onEdit = () => {},
    onDelete = () => {},
    onAdd = () => {},
  } = props;

  const [selectedStatus, setSelectedStatus] = useState('All'); // Initial status 'All'

  const filteredTableData = useMemo(() => {
    if (selectedStatus === 'All') {
      return tableData; // No filter applied
    } else {
      return tableData.filter(row => row.status === selectedStatus); // Filter by status
    }
  }, [selectedStatus, tableData]);

  // const columns = useMemo(() => columnsData, [columnsData]);
  // const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns: columnsData,
      data: filteredTableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

  //Retrieve the initial PageSize from browser storage
  const storedItemsPerPage = localStorage.getItem('itemsPerPage');
  initialState.pageSize = storedItemsPerPage ? parseInt(storedItemsPerPage, 10) : 10; // Default to 10 items per page

  const textColor = useColorModeValue("secondaryGray.900", "black");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return <></>;

  return (
    <Box px={'25px'}>
      {/* Table Heading  */}
      <Flex justify="space-between" mb="20px" align="center">
        <Box>
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            All Jobs
          </Text>
        </Box>
        <Flex gap={2}>
          <Search
            tableInstance={tableInstance}
            setGlobalFilter={setGlobalFilter}
          />
        </Flex>
      </Flex>

      {/* Table  */}
      <Tabs position="relative" variant="unstyled">
        <TabList color={"primary"} gap={2}>
          <Tab bg={"secondaryGray.100"} borderTopRadius={"lg"} h="35px" onClick={() => setSelectedStatus('All')}>
            All
          </Tab>
          <Tab bg={"secondaryGray.100"} borderTopRadius={"lg"} h="35px" onClick={() => setSelectedStatus('Pending')}>
            Pending
          </Tab>
          <Tab bg={"secondaryGray.100"} borderTopRadius={"lg"} h="35px" onClick={() => setSelectedStatus('In Progress')}>
            In Progress
          </Tab>
          <Tab bg={"secondaryGray.100"} borderTopRadius={"lg"} h="35px" onClick={() => setSelectedStatus('On Review')}>
            On Review
          </Tab>
          <Tab bg={"secondaryGray.100"} borderTopRadius={"lg"} h="35px" onClick={() => setSelectedStatus('Completed')}>
            Completed
          </Tab>
          <Tab bg={"secondaryGray.100"} borderTopRadius={"lg"} h="35px" onClick={() => setSelectedStatus('Cancelled')}>
            Cancelled
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2.5px"
          bg="primary"
          borderRadius="2px"
        />
      </Tabs>

      <Table
        {...getTableProps()}
        variant="simple"
        color="gray.500"
        mb="24px"
        my={4}
      >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {isSelectable && (
                <Th key={index} borderColor={borderColor}>
                  <Checkbox
                    onChange={() => tableInstance.toggleAllRowsSelected()}
                    isChecked={tableInstance.isAllRowsSelected}
                  />
                </Th>
              )}
                        
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps(),
                  )}
                  key={index}
                  borderColor={'borderColor'}
                  borderBottomWidth={'2px'}
                  paddingInline={0}
                  textAlign={column.id === 'status' ? 'center' : 'start'}
                >
                  {column.render("Header")}
                </Th>
              ))}
              <Th key={"actions"} pe="10px" borderColor={'borderColor'} borderBottomWidth={'2px'}>
                Actions
              </Th>
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {isSelectable && (
                  <Td
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    <Checkbox
                      onChange={() => row.toggleRowSelected()}
                      isChecked={row.isSelected}
                    />
                  </Td>
                )}
                {row.cells.map((cell, index) => {
                  const isStatusColumn = cell.column.id === 'status';
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor='transparent'
                      paddingInline={1}
                      maxW={'120px'}
                      textAlign={isStatusColumn ? 'center' : 'left'}
                    >
                      {isStatusColumn ? (
                      // Check the status and render the appropriate badge
                      (cell.value === 'Completed' ? (
                        <Badge bg='#79F2C0' color='#006644' borderRadius={'6px'}>Completed</Badge>
                      ) : cell.value === 'In Progress' ? (
                        <Badge bg='#FFE380' color='#72663E' borderRadius={'6px'}>In Progress</Badge>
                      ) : cell.value === 'Cancelled' ? (
                        <Badge bg='#FFBDAD' color='#843737' borderRadius={'6px'}>Cancelled</Badge>
                      )  : cell.value === 'Pending' ? (
                        <Badge bg='rgba(91, 114, 130, 0.20)' color='#384752' borderRadius={'6px'}>Pending</Badge>
                      )  : cell.value === 'Assigned' ? (
                        <Badge bg='#B3D4FF' color='#0747A6' borderRadius={'6px'}>Assigned</Badge>
                      )  : cell.value === 'Estimate Sent' ? (
                        <Badge bg='rgba(232, 100, 39, 0.30)' color='#DC4C09' borderRadius={'6px'}>Estimate Sent</Badge>   
                      )  : cell.value === 'Estimate Approved' ? (
                        <Badge bg='rgba(60, 125, 14, 0.30)' color='#3C7D0E' borderRadius={'6px'}>Estimate Approved</Badge>
                      ) : cell.value === 'On Review' ? (
                        <Badge bg='rgba(143, 73, 222, 0.30)' color='#5D2C94' borderRadius={'6px'}>On Review</Badge>
                      ) : null) // Adjust this line to handle other statuses if needed
                    ) : (
                      // Render regular text for other columns
                      <Text color={textColor} fontSize='sm' noOfLines={1}>
                        {cell.value}
                      </Text>
                    )}
                    </Td>
                  );
                })}
                <Td
                  key={index}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor="transparent"
                >
                  <Flex gap={2}>
                  <Image src={EditIcon} h='18px' w='19px'/>
                  <Image src={ViewIcon} h='18px' w='19px'/>
                  {/* <DeleteIcon color={textColor} h='18px' w='19px' onClick={() => onDelete(index)} /> */}
                  <TableMenu
                      icon={
                      <Icon as={IoEllipsisVertical} h='18px' w='19px' color={textColor} />
                      }
                  />
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex
        px="25px"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Pagination tableInstance={tableInstance} />
        {showPageSize && <PageSize tableInstance={tableInstance} />}
      </Flex>
    </Box>
  );
}