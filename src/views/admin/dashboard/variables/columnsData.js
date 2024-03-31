import { format } from 'date-fns';
export const columnsDataJobs = [
  {
    Header: "Company Name",
    accessor: "companyName",
  },
  {
    Header: "Phone Number",
    accessor: "phone",
  },
  {
    Header: "Contractor",
    accessor: "contractor",
  },
  {
    Header: "Service Type",
    accessor: "serviceType",
  },
  {
    Header: "Requested Date",
    // accessor: "requestedTime",
    accessor: (rowData) => {
      // Convert the string to a Date object
      const requestedDate = new Date(rowData.requestedTime);
  
      // Format the date using date-fns
      return format(requestedDate, 'yyyy-MM-dd');
    },
  },
  {
    Header: "Deadline",
    // accessor: "deadline",
    accessor: (rowData) => {
      // Convert the string to a Date object
      const deadline = new Date(rowData.deadline);
  
      // Format the date using date-fns
      return format(deadline, 'yyyy-MM-dd');
    },
  },
  {
    Header: "Status",
    accessor: "jobStatus",
  },
];
