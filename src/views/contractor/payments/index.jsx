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
import { Box } from "@chakra-ui/react";
// import DataTable from "./components/DataTable";
import DataTable from "./components/DataTable";
import { columnsDataPayments} from "views/contractor/payments/variables/columnsData";
import tableDataPayments from "views/contractor/payments/variables/tableDataPayments.json";
import React from "react";

export default function Payments() {
  // Chakra Color Mode
  return (
    <Box pt={4}>
        <DataTable
          columnsData={columnsDataPayments}
          tableData={tableDataPayments}
          showPageSize={true}
        />
    </Box>
  );
}
