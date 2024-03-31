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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import PaymentForm from "./PaymentForm";

// Icon imports
import EditIcon from "assets/icons/edit_square.svg";
import ViewIcon from "assets/icons/visibility.svg";
import PdfIcon from "assets/icons/pdf_icon.svg";
import { IoEllipsisVertical, IoEllipsisHorizontal } from "react-icons/io5";

export default function DataTable(props) {
  const {
    columnsData,
    tableData,
    isSelectable = false,
    showPageSize = false,
    onEdit = () => {},
    onStatusUpdate = () => {},
  } = props;

  const [selectedStatus, setSelectedStatus] = useState("All"); // Initial status 'All'
  const [rowData, setRowData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredTableData = useMemo(() => {
    if (selectedStatus === "All") {
      return tableData; // No filter applied
    } else {
      return tableData.filter((row) => row.status === selectedStatus); // Filter by status
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
  const handleEdit = (rowData) => {
    setRowData(rowData);
    onOpen();
  };
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
      {/* This is Edit Modal */}
      <PaymentForm
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        onEdit={onEdit}
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
            Current Payments
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
            Invoices Sent
          </Tab>
          <Tab
            bg={"tabsBg"}
            borderTopRadius={"lg"}
            h="35px"
            onClick={() => setSelectedStatus(2)}
          >
            Paid
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
                  paddingInline={2}
                  textAlign={column.id === "adminPaymentStatus" ? "center" : "start"}
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
                  const isStatusColumn =
                    cell.column.id === "adminPaymentStatus";
                  const isInvoiceColumn = cell.column.id === "r_invoice" || cell.column.id === "c_invoice";
                  const isTypeColumn = cell.column.id === "serviceType";
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                      paddingInline={2}
                      maxW={"130px"}
                      textAlign={isStatusColumn ? "center" : "left"}
                    >
                      {isStatusColumn ? (
                        // Check the status and render the appropriate badge
                        cell.value === 0 ? (
                          <Badge
                            bg="rgba(91, 114, 130, 0.20)"
                            color="#384752"
                            borderRadius={"6px"}
                          >
                            Pending
                          </Badge>
                        ) : cell.value === 1 ? (
                          <Badge
                            bg="rgba(232, 100, 39, 0.30)"
                            color="#DC4C09"
                            borderRadius={"6px"}
                          >
                            Sent
                          </Badge>
                        ) : cell.value === 2 ? (
                          <Badge
                            bg="rgba(60, 125, 14, 0.30)"
                            color="#3C7D0E"
                            borderRadius={"6px"}
                          >
                            Paid
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
                      {isInvoiceColumn && <InvoiceBadge />}
                    </Td>
                  );
                })}
                <Td
                  key={index}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor="transparent"
                >
                  <Flex gap={2}>
                    <Image
                      src={EditIcon}
                      h="18px"
                      w="19px"
                      cursor={"pointer"}
                      onClick={() => handleEdit(row.original)}
                    />
                    <Image src={ViewIcon} h="18px" w="19px" />
                    <TableMenu
                      icon={
                        <Icon
                          as={IoEllipsisVertical}
                          h="18px"
                          w="19px"
                          color={textColor}
                        />
                      }
                      rowData={row.original}
                      updateStatus={onStatusUpdate}
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

function InvoiceBadge() {
  return (
    <Flex
      border={"1px solid gray"}
      borderRadius={"md"}
      p={0.5}
      flexDir={"row"}
      width={"125px"}
      alignItems={"center"}
    >
      <Image src={PdfIcon} h={"18px"} w={"18px"} />
      <Text color={"black"} ml={1}>
        Invoice.pdf
      </Text>
      <InvoiceMenu />
    </Flex>
  );
}

function InvoiceMenu(props) {
  const { ...rest } = props;

  // Ellipsis modals
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton {...rest} onClick={onOpen} lineHeight={0}>
        <Icon
          as={IoEllipsisHorizontal}
          h="18px"
          w="18px"
          color={"black"}
          ml={2}
        />
      </MenuButton>
      <MenuList color={"black"}>
        <MenuItem>View Invoice</MenuItem>
        {/* <MenuItem>Edit Invoice</MenuItem> */}
        {/* <MenuItem>Send Invoice</MenuItem> */}
        <MenuItem>Print Invoice</MenuItem>
      </MenuList>
    </Menu>
  );
}
