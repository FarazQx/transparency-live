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
import { Box, useToast } from "@chakra-ui/react";
import DataTable from "./components/DataTable";
import { columnsDataQueries } from "views/admin/queries/variables/columnsData";
import tableDataQueries from "views/admin/queries/variables/tableDataQueries.json";

// Base url
import BASE_URL from "config";

export default function Queries() {
  const [queiresList, setQueriesList] = useState([]);
  const [contractorList, setContractorList] = useState([]);
  const toast = useToast()

  useEffect(() => {
    fetchQueries();
    fetchContractors();
  }, [])

  const fetchQueries = () => {
    return axios
      .get(`${BASE_URL}/Query/GetQueries`)
      .then((res) => {
        setQueriesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchContractors = () => {
    return axios.get(`${BASE_URL}/account/GetContractors`)
      .then(res => {
          setContractorList(res.data);
      })
      .catch(err => {
          console.log(err);
      });
  };

  const Create = (newRecord) => {
    return axios
      .post(`${BASE_URL}/Query/Create`, newRecord, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Show succesful request
        if (res.status === 200 && res.data.message === "success") {
          // Fetch all queries again after adding a new one
          fetchQueries();
          // Show toast for successful addition
          toast({
            title: "Query added.",
            description: "A new query has been added.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        toast({
          title: "Failed to add query.",
          description: "An error occurred while adding the query.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const Update = (id, updatedRecord) => {
    return axios
      .post(`${BASE_URL}/Query/UpdateQuery/${id}`, updatedRecord, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Show succesful request
        if (res.status === 200 && res.data.message === "success") {
          // Fetch all queries again after updating
          fetchQueries();
          // Show toast for successful update
          toast({
            title: "Record updated.",
            description: "The record has been updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        toast({
          title: "Failed to update record.",
          description: "An error occurred while updating the record.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const updateStatus = (id, value) => {
    return axios
      .put(`${BASE_URL}/Query/UpdateStatus/${id}`, { Value: value })
      .then((res) => {
        // Show succesful request
        if (res.status === 200 && res.data.message === "success") {
          // Fetch all queries again after status update
          fetchQueries();
          // Show toast for successful update
          toast({
            title: "Status updated.",
            description: "The status has been updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        // Handle error
        console.log(err);
        toast({
          title: "Failed to update status.",
          description: "An error occurred while updating the status.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // Chakra Color Mode
  return (
    <Box pt={4} overflowX={'auto'}>
        <DataTable
          columnsData={columnsDataQueries}
          tableData={queiresList}
          showPageSize={true}
          onAdd={Create}
          onEdit={Update}
          onStatusUpdate={updateStatus}
          contractorList={contractorList}
        />
    </Box>
  );
}
