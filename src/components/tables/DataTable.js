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
    Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator
  } from '@chakra-ui/react'
  
  //libraries imports
  import React, { useEffect, useMemo, useState } from 'react'
  import {
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable
  } from 'react-table'
  
  // Components imports
  import AddButton from 'components/buttons/add'
  import Card from 'components/card/Card'
  import Pagination from 'components/pagination/Pagination'
  import Search from 'components/search/Search'
  import PageSize from 'components/pagination/PageSize'


  // Icon imports
  import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
    
  export default function DataTable (props) {
    const { columnsData, tableData,  isSelectable = false, showPageSize = false, onEdit = () => {}, onDelete = () => {}, onAdd = () => {} } = props
  
    const columns = useMemo(() => columnsData, [columnsData])
    const data = useMemo(() => tableData, [tableData])
  
    const tableInstance = useTable(
      {
        columns,
        data
      },
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect
    )
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      setGlobalFilter,
      initialState
    } = tableInstance
    initialState.pageSize = 10
  
    //Retrieve the initial PageSize from browser storage
    const storedItemsPerPage = localStorage.getItem('itemsPerPage');
    initialState.pageSize = storedItemsPerPage ? parseInt(storedItemsPerPage, 10) : 10; // Default to 10 items per page

    const textColor = useColorModeValue('secondaryGray.900', 'black')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  
    const [isMounted, setIsMounted] = useState(false)
  
    useEffect(() => {
      if (isMounted) return
      setIsMounted(true)
    }, [isMounted])
  
    if (!isMounted) return <></>

    return (
      <>

        <Flex px='25px' justify='space-between' mb='20px' align='center'>
          <Box>
            <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
              Development Table
            </Text>
          </Box>
          <Flex gap={2}>
            <Search tableInstance={tableInstance} setGlobalFilter={setGlobalFilter} />
            <AddButton onClick={onAdd} />
          </Flex>
        </Flex>

        <Tabs position="relative" variant="unstyled" px='25px'>
          <TabList color={'primary'} gap={2}>
            <Tab bg={'secondary'} borderTopRadius={'lg'} h='35px'>One</Tab>
            <Tab bg={'secondary'} borderTopRadius={'lg'} h='35px'>Two</Tab>
            <Tab bg={'secondary'} borderTopRadius={'lg'} h='35px'>Three</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="primary"
            borderRadius="1px"
          />
          
          <TabPanels >

            <TabPanel px={0} py={4}>
              <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px' px={0}>
          
                <Thead>
                  {headerGroups.map((headerGroup, index) => (
                    <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {(isSelectable && (
                        <Th key={index} borderColor={borderColor}>
                          <Checkbox
                            onChange={() => tableInstance.toggleAllRowsSelected()}
                            isChecked={tableInstance.isAllRowsSelected}
                          />
                        </Th>
                      ))}
                      {headerGroup.headers.map((column, index) => (
                        <Th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          key={index}
                          borderColor={borderColor}
                          paddingInline={0}
                        >
                          {column.render('Header')}
                        </Th>
                      ))}
                      <Th key={'actions'} pe='10px' borderColor={borderColor}>
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
                        {(isSelectable && (
                          <Td key={index} fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor='transparent'>
                            <Checkbox onChange={() => row.toggleRowSelected()} isChecked={row.isSelected} />
                          </Td>
                        ))}
                        {row.cells.map((cell, index) => {
                          return (
                            <Td
                              {...cell.getCellProps()}
                              key={index}
                              fontSize={{ sm: '14px' }}
                              minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                              borderColor='transparent'
                              paddingInline={0}
                            >
                              <Text color={textColor} >
                                {cell.value}
                              </Text>
                            </Td>
                          );
                        })}
                        <Td key={index} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor='transparent'>
                          <Flex gap={2}>
                            <EditIcon color={textColor} h='18px' w='19px' onClick={() => onEdit(index)} />
                            <ViewIcon color={textColor} h='18px' w='19px' onClick={() => onDelete(index)} />
                            <DeleteIcon color={textColor} h='18px' w='19px' onClick={() => onDelete(index)} />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
        
              </Table>
              <Flex px='25px' justifyContent="space-between" alignItems={'center'}>
                <Pagination tableInstance={tableInstance} />
                {showPageSize && <PageSize tableInstance={tableInstance} />}
              </Flex>
            </TabPanel>

          </TabPanels>
        </Tabs>
  
        
               
        
        
      </>
    )
  }
    