import { format } from "date-fns";

export const columnsDataQueries = [
  {
    Header: "Company Name",
    accessor: "companyName",
  },
  {
    Header: "Requestor",
    // accessor: "firstName",
    accessor: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    Header: "Job Number",
    accessor: "jobNumber",
  },
  {
    Header: "Phone Number",
    accessor: "phone",
  },
  {
    Header: "Service Type",
    accessor: "serviceType",
  },
  {
    Header: "Contractor",
    accessor: "contractor",
  },
  {
    Header: "Requested Date",
    // accessor: "requestedTime",
    accessor: (rowData) => {
      // Convert the string to a Date object
      const requestedDate = new Date(rowData.requestedTime);

      // Format the date using date-fns
      return format(requestedDate, "yyyy-MM-dd");
    },
  },
  {
    Header: "Deadline",
    // accessor: "deadline",
    accessor: (rowData) => {
      // Convert the string to a Date object
      const deadline = new Date(rowData.deadline);

      // Format the date using date-fns
      return format(deadline, "yyyy-MM-dd");
    },
  },
  {
    Header: "Status",
    accessor: "queryStatus",
  },
];
