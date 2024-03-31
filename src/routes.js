import React from "react";

import { Icon } from "@chakra-ui/react";

// Admin Imports
import MainDashboard from "views/admin/dashboard";
import Profile from "views/admin/settings";
import Queries from "views/admin/queries";
import Reports from "views/admin/reports";
import Payments from "views/admin/payments";
import Interpretation from "views/admin/jobs/interpretation";
import Translation from "views/admin/jobs/translation";
import Contractors from "views/admin/contractors";
import Inbox from "views/admin/inbox";

import dashboardIcon from "./assets/icons/dashboard-white.svg";
import inboxIcon from "./assets/icons/inbox-white.svg";
import clientQueryIcon from "./assets/icons/client-queries-white.svg";
import jobsIcon from "./assets/icons/jobs-white.svg";
import contractorIcon from "./assets/icons/contractors-white.svg";
import reportIcon from "./assets/icons/reports-white.svg";
import paymentIcon from "./assets/icons/payments-white.svg";
import settingsIcon from "./assets/icons/settings-white.svg";
import dashboardIconGreen from "./assets/icons/dashboard-green.svg";
import inboxIconGreen from "./assets/icons/inbox-green.svg";
import clientQueryIconGreen from "./assets/icons/client-queries-green.svg";
// import jobsIconGreen from "./assets/icons/jobs-green.svg";
import contractorIconGreen from "./assets/icons/contractors-green.svg";
import reportIconGreen from "./assets/icons/reports-green.svg";
import paymentIconGreen from "./assets/icons/payments-green.svg";
import settingsIconGreen from "./assets/icons/settings-green.svg";


const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <img src={dashboardIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={dashboardIconGreen} width='24px' height='24px' color='inherit' />,
    component: MainDashboard,
  },

  {
    name: "Inbox",
    layout: "/admin",
    path: "/inbox",
    icon: (
      <img
        src={inboxIcon}
        width='24px'
        height='24px'
        color='inherit'
      />
    ),
    iconActive: <img src={inboxIconGreen} width='24px' height='24px' color='inherit' />,
    component: Inbox,
  },
  {
    name: "Client Queries",
    layout: "/admin",
    icon: <img src={clientQueryIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={clientQueryIconGreen} width='24px' height='24px' color='inherit' />,
    path: "/queries",
    component: Queries,
  },
  {
    name: "Jobs",
    layout: "/admin",
    path: "/jobs",
    icon: <img src={jobsIcon} width='24px' height='24px' color='inherit' />,
    // component: Jobs,
    items: [
      {
        name: "Translation",
        layout: "/admin",
        path: "/jobs/translation",
        component: Translation,
      },
      {
        name: "Interpretation",
        layout: "/admin",
        path: "/jobs/interpretation",
        component: Interpretation,
      },
    ]
  },
  {
    name: "Contractors",
    layout: "/admin",
    path: "/contractors",
    icon: <img src={contractorIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={contractorIconGreen} width='24px' height='24px' color='inherit' />,
    component: Contractors,
  },
  {
    name: "Reports",
    layout: "/admin",
    path: "/reports",
    icon: (
      <img
        src={reportIcon}
        width='24px'
        height='24px'
        color='inherit'
      />
    ),
    iconActive: <img src={reportIconGreen} width='24px' height='24px' color='inherit' />,
    component: Reports,
  },
  {
    name: "Payments",
    layout: "/admin",
    path: "/payments",
    icon: <img src={paymentIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={paymentIconGreen} width='24px' height='24px' color='inherit' />,
    component: Payments,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "/settings",
    icon: <img src={settingsIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={settingsIconGreen} width='24px' height='24px' color='inherit' />,
    component: Profile,
  },
];

export default routes;
