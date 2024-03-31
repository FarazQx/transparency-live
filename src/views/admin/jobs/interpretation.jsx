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
import { Box } from "@chakra-ui/react";
import DataTable from "./components/DataTable";
import { columnsDataQueries} from "views/admin/jobs/variables/columnsData";
import tableDataQueries from "views/admin/jobs/variables/tableDataQueries.json";

export default function Interpretation() {
  
  const [interpretationList, setInterpretationList] = useState([]);

  useEffect(() => {
    refreshJobsList();
  }, [])

  const jobsAPI = (url = 'http://34.217.79.31/Query/GetInterpretationQueries') => {
      return {
          fetchAll: () => axios.get(url),
          update: (id, rowData) => axios.post("http://34.217.79.31/Query/UpdateQuery/" + id, rowData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              }
              }),
          delete: id => axios.delete("http://34.217.79.31/Query/DeleteQuery/" + id)
      }
  }
  function refreshJobsList() {
    jobsAPI().fetchAll()
      .then(res => {
          setInterpretationList(res.data);
      })
      .catch(err => console.log(err))
  }
  // Chakra Color Mode
  return (
    <Box pt={4} overflowX={'auto'}>
        <DataTable
          columnsData={columnsDataQueries}
          tableData={interpretationList} // Replace this with interpretationList
          showPageSize={true}
          title={'Interpretation'}
        />
    </Box>
  );
}
