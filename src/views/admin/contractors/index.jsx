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
import { columnsDataQueries } from "views/admin/contractors/variables/columnsData";
import tableDataQueries from "views/admin/contractors/variables/tableDataQueries.json";

// Base url
import BASE_URL from "config";

export default function Contractors() {
  const [contractorList, setContractorList] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchContractors();
  }, []);

  const fetchContractors = () => {
    return axios
      .get(`${BASE_URL}/account/GetContractors`)
      .then((res) => {
        console.log(res.data);
        setContractorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Create = (newRecord) => {
    return axios
      .post(`${BASE_URL}/Account/Create`, newRecord, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Show succesful request
        if (res.status === 200 && res.data.message === "success") {
          // Fetch all queries again after adding a new one
          fetchContractors();
          // Show toast for successful addition
          toast({
            title: "Contractor added.",
            description: "A new contractor has been added.",
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
          title: "Failed to add contractor.",
          description: "An error occurred while adding the contractor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const Update = (id, updatedRecord) => {
    console.log(id);
    return axios
      .put(`${BASE_URL}/Account/UpdateContractor/${id}`, updatedRecord, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Show succesful request
        if (res.status === 200 && res.data.message === "success") {
          // Fetch all queries again after adding a new one
          fetchContractors();
          // Show toast for successful addition
          toast({
            title: "Contractor updated.",
            description: "Contractor has been updated.",
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
          title: "Failed to update contractor.",
          description: "An error occurred while updating the contractor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  const Delete = (id) => {
    return axios
      .post(`${BASE_URL}/Account/DeleteContractor/${id}`)
      .then((res) => {
        if (res.status == 200) {
          toast({
            title: "Contractor deleted.",
            description: "Contractor has been deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          fetchContractors();
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Failed to delete contractor.",
          description: "An error occurred while deleting the contractor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  // Chakra Color Mode
  return (
    <Box pt={4} overflowX={"auto"}>
      <DataTable
        columnsData={columnsDataQueries}
        tableData={contractorList}
        showPageSize={true}
        onAdd={Create}
        onEdit={Update}
        onDelete={Delete}
      />
    </Box>
  );
}
