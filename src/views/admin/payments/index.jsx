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
import React, { useState, useEffect } from "react";

// Axios import
import axios from "axios";
import BASE_URL from "config";

// Chakra imports
import { Box, useToast } from "@chakra-ui/react";
import DataTable from "./components/DataTable";
import { columnsDataPayments } from "views/admin/payments/variables/columnsData";
import tableDataPayments from "views/admin/payments/variables/tableDataPayments.json";

export default function Payments() {
  // Chakra Color Mode
  const [paymentList, setPaymentList] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);
  const fetchPayments = () => {
    return axios
      .get(`${BASE_URL}/Payment/GetPayments`)
      .then((res) => {
        console.log(res.data);
        setPaymentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update = (id, updatedRecord) => {
    return axios
      .post(`${BASE_URL}/Payment/Update/${id}`, updatedRecord, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Show succesful request
        if (res.status === 200 && res.data.message === "success") {
          // Fetch all queries again after adding a new one
          fetchPayments();
          // Show toast for successful addition
          toast({
            title: "Payment updated.",
            description: "Payment has been updated.",
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
          title: "Failed to update payment.",
          description: "An error occurred while updating the payment.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  const updateStatus = (id, value) => {
    return axios
      .put(
        `${BASE_URL}/Payment/UpdateAdminStatus/${id}`,
        { value: value },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // Show succesful request
        if (res.status === 200 && res.data.message === "success") {
          // Fetch all queries again after adding a new one
          fetchPayments();
          // Show toast for successful addition
          toast({
            title: "Status updated successfully.",
            description: "Payment has been updated.",
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
          description: "An error occurred while updating the payment.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <Box pt={4}>
      <DataTable
        columnsData={columnsDataPayments}
        tableData={paymentList}
        showPageSize={true}
        onEdit={update}
        onStatusUpdate={updateStatus}
      />
    </Box>
  );
}
