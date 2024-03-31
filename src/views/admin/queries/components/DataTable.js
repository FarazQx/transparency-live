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
  Image,
  useDisclosure,
  Button,
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
import QueryForm from "./QueryForm";
import ViewModal from "./ViewModal";

// Icon imports
import EditIcon from "assets/icons/edit_square.svg";
import ViewIcon from "assets/icons/visibility.svg";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

export default function DataTable(props) {
  const {
    columnsData,
    tableData,
    contractorList,
    isSelectable = false,
    showPageSize = false,
    onEdit = () => {},
    onDelete = () => {},
    onAdd = () => {},
    onStatusUpdate = () => {},
  } = props;

  const [selectedStatus, setSelectedStatus] = useState("All"); // Initial status 'All'
  // Define a state variable to hold the selected row's data
  const [rowData, setRowData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const handleEdit = (rowData) => {
    setRowData(rowData);
    onOpen();
  };
  const handleView = (rowData) => {
    setRowData(rowData);
    onOpen1();
  };

  const filteredTableData = useMemo(() => {
    if (selectedStatus === "All") {
      return tableData; // No filter applied
    } else {
      return tableData.filter(row => row.queryStatus === selectedStatus); // Filter by status
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
    useRowSelect
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
  const storedItemsPerPage = localStorage.getItem("itemsPerPage");
  initialState.pageSize = storedItemsPerPage
    ? parseInt(storedItemsPerPage, 10)
    : 10; // Default to 10 items per page

  const textColor = useColorModeValue("secondaryGray.900", "black");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return <></>;

  return (
    <Box px={"25px"}>
      {/* This the Add or Edit Modal */}
      <QueryForm
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        rowData={rowData}
        onAdd={onAdd}
        onEdit={onEdit}
      />
      {/* This the View Modal */}
      <ViewModal
        onOpen={onOpen1}
        isOpen={isOpen1}
        onClose={onClose1}
        rowData={rowData}
      />

      {/* Table Heading  */}
      <Flex justify="space-between" mb="20px" align="center">
        <Box>
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            All Queries
          </Text>
        </Box>
        <Flex gap={2}>
          <Search
            tableInstance={tableInstance}
            setGlobalFilter={setGlobalFilter}
          />
          <Button
            leftIcon={<MdAdd />}
            transition="0.2s linear"
            onClick={onOpen}
            bg={"primaryBtn"}
            color={"white"}
            _hover={"btnHover"}
            _active={"btnActive"}
            borderRadius="8px"
            variant="solid"
          >
            Add Query
          </Button>
        </Flex>
      </Flex>

      {/* Table  */}
      <Tabs position="relative" variant="unstyled">
        <TabList color={"primary"} gap={2}>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus("All")}
          >
            All
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus(0)}
          >
            Pending
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus(1)}
          >
            Estimate Sent
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus(2)}
          >
            Estimate Approved
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus(6)}
          >
            Completed
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus(7)}
          >
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
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                  borderColor={"borderColor"}
                  borderBottomWidth={"2px"}
                  paddingInline={0}
                  textAlign={column.id === "queryStatus" ? "center" : "start"}
                >
                  {column.render("Header")}
                </Th>
              ))}
              <Th
                key={"actions"}
                pe="10px"
                borderColor={"borderColor"}
                borderBottomWidth={"2px"}
              >
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
                {
                  row.cells.map((cell, index) => {
                    const isStatusColumn = cell.column.id === "queryStatus";
                    const isTypeColumn = cell.column.id === "serviceType";

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                      paddingInline={1}
                      maxW={"120px"}
                      textAlign={isStatusColumn ? "center" : "left"}
                    >
                      {isStatusColumn ? (
                        // Check the status and render the appropriate badge
                        cell.value === 0 ? (
                          <Badge bg="rgba(91, 114, 130, 0.20)" color="#384752" borderRadius={"6px"}>
                            Pending
                          </Badge>
                        ) : cell.value === 1 ? (
                          <Badge bg="rgba(232, 100, 39, 0.30)" color="#DC4C09" borderRadius={"6px"}>
                            Estimate Sent
                          </Badge>
                        ) : cell.value === 2 ? (
                          <Badge bg="rgba(60, 125, 14, 0.30)" color="#3C7D0E" borderRadius={"6px"}>
                            Estimate Approved
                          </Badge>
                        ) : cell.value === 3 ? (
                          <Badge bg="#B3D4FF" color="#0747A6" borderRadius={"6px"}>
                            Assigned
                          </Badge>
                        ) : cell.value === 4 ? (
                          <Badge bg="#FFE380" color="#72663E" borderRadius={"6px"}>
                            In Progress
                          </Badge>
                        ) : cell.value === 5 ? (
                          <Badge bg="rgba(143, 73, 222, 0.30)" color="#5D2C94" borderRadius={"6px"}>
                            On Review
                          </Badge>
                        ) : cell.value === 6 ? (
                          <Badge bg="#79F2C0" color="#006644" borderRadius={"6px"}>
                            Completed
                          </Badge>
                        ) : cell.value === 7 ? (
                          <Badge bg="#FFBDAD" color="#843737" borderRadius={"6px"}>
                            Cancelled
                          </Badge>
                        ) : null // Adjust this line to handle other statuses if needed
                      ) : isTypeColumn ? (
                        // Render "Translation" or "Interpretation" based on the "type" value
                        cell.value === 0 ? (
                          <Text color={textColor} fontSize="sm" noOfLines={1}>
                            Translation
                          </Text>
                        ) : cell.value === 1 ? (
                          <Text color={textColor} fontSize="sm" noOfLines={1}>
                            Interpretation
                          </Text>
                        ) : null
                      ) : (
                        // Render regular text for other columns
                        <Text color={textColor} fontSize="sm" noOfLines={1}>
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
                  {/* Actions */}
                  <Flex gap={2}>
                    <Image src={EditIcon} h="18px" w="19px" onClick={() => handleEdit(row.original)} cursor={'pointer'} />
                    <Image src={ViewIcon} h="18px" w="19px" onClick={() => handleView(row.original)} cursor={'pointer'} />
                    <TableMenu icon={<Icon as={IoEllipsisVertical} h="18px" w="19px" color={textColor}/>} rowData={row.original} updateStatus={onStatusUpdate} contractorList={contractorList} />
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex px="25px" justifyContent="space-between" alignItems={"center"}>
        <Pagination tableInstance={tableInstance} />
        {showPageSize && <PageSize tableInstance={tableInstance} />}
      </Flex>
    </Box>
  );
}
