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
  
  // Icon imports
  import EditIcon from 'assets/icons/edit_square.svg'
  import ViewIcon from 'assets/icons/visibility.svg'
  import CloseIcon from 'assets/icons/close.svg'

  
  export default function JobsTable(props) {
    const {
      columnsData,
      tableData,
      isSelectable = false,
      showPageSize = false,
      onEdit = () => {},
      onDelete = () => {},
      onAdd = () => {},
    } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
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
  
    const textColor = useColorModeValue("secondaryGray.900", "black");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      if (isMounted) return;
      setIsMounted(true);
    }, [isMounted]);
  
    if (!isMounted) return <></>;
  
    return (
      <>
        {/* Table Heading  */}
        <Flex justify="space-between" my="20px" align="center">
          <Box>
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Current Jobs
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
        <Card overflowX={'auto'}>
            <Table
              {...getTableProps()}
              variant="simple"
              color="gray.500"
              mb="24px"
              px={0}
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
                            paddingInline={1}
                            textAlign={column.id === 'jobStatus' ? 'center' : 'start'}
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
                        const isStatusColumn = cell.column.id === 'jobStatus';
                        const isTypeColumn = cell.column.id === "serviceType";
                        return (
                            <Td
                            {...cell.getCellProps()}
                            key={index}
                            fontSize={{ sm: '14px' }}
                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                            borderColor='transparent'
                            paddingInline={1}
                            maxW={'100px'}
                            textAlign={isStatusColumn ? 'center' : 'left'}
                            >
                            {isStatusColumn ? (
                            // Check the status and render the appropriate badge
                            (cell.value === 0 ? (
                              <Badge bg='rgba(91, 114, 130, 0.20)' color='#384752' borderRadius={'6px'}>Pending</Badge>
                            ) : cell.value === 1 ? (
                              <Badge bg='rgba(232, 100, 39, 0.30)' color='#DC4C09' borderRadius={'6px'}>Estimate Sent</Badge>  
                            ) : cell.value === 2 ? (
                              <Badge bg='rgba(60, 125, 14, 0.30)' color='#3C7D0E' borderRadius={'6px'}>Estimate Approved</Badge>
                            )  : cell.value === 3 ? (
                              <Badge bg='#B3D4FF' color='#0747A6' borderRadius={'6px'}>Assigned</Badge>
                            )  : cell.value === 4 ? (
                              <Badge bg='#FFE380' color='#72663E' borderRadius={'6px'}>In Progress</Badge>
                            )  : cell.value === 5 ? (
                              <Badge bg='rgba(143, 73, 222, 0.30)' color='#5D2C94' borderRadius={'6px'}>On Review</Badge>
                            )  : cell.value === 6 ? (
                              <Badge bg='#79F2C0' color='#006644' borderRadius={'6px'}>Completed</Badge>
                            ) : cell.value === 7 ? (
                              <Badge bg='#FFBDAD' color='#843737' borderRadius={'6px'}>Cancelled</Badge>
                            ) : null) // Adjust this line to handle other statuses if needed
                          ) : (
                            isTypeColumn ? (
                              // Render "Translation" or "Interpretation" based on the "type" value
                              cell.value === 0 ? (
                                <Text color={textColor} fontSize='sm' noOfLines={1}>Translation</Text>
                              ) : cell.value === 1 ? (
                                <Text color={textColor} fontSize='sm' noOfLines={1}>Interpretation</Text>
                              ) : null
                            ) : (
                              // Render regular text for other columns
                              <Text color={textColor} fontSize='sm' noOfLines={1}>
                                {cell.value}
                              </Text>
                            )
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
                        <Image src={CloseIcon} h='18px' w='19px'/>
                        
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
        </Card>
      </>
    );
  }