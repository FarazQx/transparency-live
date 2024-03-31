import React from "react";

import { Icon } from "@chakra-ui/react";

// Admin Imports
import MainDashboard from "views/contractor/dashboard";
import Inbox from "views/admin/inbox";
import Jobs from "views/contractor/jobs";
import Payments from "views/contractor/payments";
import Profile from "views/contractor/settings";

import dashboardIcon from "./assets/icons/dashboard-white.svg";
import inboxIcon from "./assets/icons/inbox-white.svg";
import jobsIcon from "./assets/icons/jobs-white.svg";
import paymentIcon from "./assets/icons/payments-white.svg";
import settingsIcon from "./assets/icons/settings-white.svg";
import dashboardIconGreen from "./assets/icons/dashboard-green.svg";
import inboxIconGreen from "./assets/icons/inbox-green.svg";
import paymentIconGreen from "./assets/icons/payments-green.svg";
import settingsIconGreen from "./assets/icons/settings-green.svg";


const routes = [
  {
    name: "Dashboard",
    layout: "/contractor",
    path: "/dashboard",
    icon: <img src={dashboardIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={dashboardIconGreen} width='24px' height='24px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Inbox",
    layout: "/contractor",
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
    name: "Jobs",
    layout: "/contractor",
    path: "/jobs",
    icon: <img src={jobsIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={inboxIconGreen} width='24px' height='24px' color='inherit' />,
    component: Jobs,
  },
  {
    name: "Payments",
    layout: "/contractor",
    path: "/payments",
    icon: <img src={paymentIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={paymentIconGreen} width='24px' height='24px' color='inherit' />,
    component: Payments,
  },
  {
    name: "Settings",
    layout: "/contractor",
    path: "/settings",
    icon: <img src={settingsIcon} width='24px' height='24px' color='inherit' />,
    iconActive: <img src={settingsIconGreen} width='24px' height='24px' color='inherit' />,
    component: Profile,
  },
];

export default routes;
