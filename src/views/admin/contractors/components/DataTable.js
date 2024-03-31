/*eslint-disable*/
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
  Tab,
  TabIndicator,
  Image,
  Button,
  useDisclosure,
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
import QueryForm from "./QueryForm";
import ViewModal from "./ViewModal";

// Icon imports
import EditIcon from "assets/icons/edit_square.svg";
import ViewIcon from "assets/icons/visibility.svg";
import DeleteIcon from "assets/icons/account_circle_off.svg";
import { MdAdd } from "react-icons/md";

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
  const handleDelete = (rowData) => {
    setRowData(rowData);
    onDelete(rowData.id);
  };

  const filteredTableData = useMemo(() => {
    if (selectedStatus === "All") {
      return tableData; // No filter applied
    } else {
      return tableData.filter((row) => row["type"] === selectedStatus); // Filter by contractor type
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
        onAdd={onAdd}
        onEdit={onEdit}
        rowData={rowData}
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
            All Contractors
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
            Add Contractor
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
            Translator
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus(1)}
          >
            Interpreter
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus("All")}
          >
            Both
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
        px={0}
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
                  textAlign={"start"}
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
                {row.cells.map((cell, index) => {
                  const isTypeColumn = cell.column.id === "type";
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                      paddingInline={1}
                      maxW={"120px"}
                      textAlign={"left"}
                    >
                      <Text color={textColor} fontSize="sm" noOfLines={1}>
                        {isTypeColumn
                          ? cell.value === 0
                            ? "Translator"
                            : cell.value === 1
                            ? "Interpreter"
                            : cell.value
                          : cell.value}
                      </Text>
                    </Td>
                  );
                })}

                <Td
                  key={index}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor="transparent"
                >
                  {/* Actions  */}
                  <Flex gap={2}>
                    <Image
                      src={EditIcon}
                      h="18px"
                      w="19px"
                      cursor={"pointer"}
                      onClick={() => handleEdit(row.original)}
                    />
                    <Image
                      src={ViewIcon}
                      h="18px"
                      w="19px"
                      onClick={() => handleView(row.original)}
                      cursor={"pointer"}
                    />
                    <Image
                      src={DeleteIcon}
                      h="18px"
                      w="19px"
                      cursor={"pointer"}
                      onClick={() => handleDelete(row.original)}
                    />
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
