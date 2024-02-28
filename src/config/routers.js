import MainLayout from "../layouts/mainLayout";

import {
  Home,
  CustomerHistory,
  ReceptionManage,
  RoomCategory,
  Login,
  ManagementBill,
  Floors,
  StatisticRevenue,
  StatisticCategory,
} from "~/pages";

import TestComponent from "~/layouts/mainLayout/TestComponent";
import AdminPages from "~/components/AdminPages";
import ManagementRoom from "~/components/ManagmentRoom";

const routers = [
  {
    id: 0,
    path: "/",
    component: MainLayout,
    childPath: [
      {
        id: 0,
        path: "/",
        childComponent: Home,
      },
      {
        id: 1,
        path: "/room-status",
        childComponent: AdminPages,
      },
      {
        id: 2,
        path: "/room-manage",
        childComponent: ManagementRoom,
      },
      {
        id: 3,
        path: "/roomcategory-manage",
        childComponent: RoomCategory,
      },
      {
        id: 4,
        path: "/reception-manage",
        childComponent: ReceptionManage,
      },
      {
        id: 5,
        path: "/customer-history",
        childComponent: CustomerHistory,
      },
      {
        id: 6,
        path: "/floors-manage",
        childComponent: Floors,
      },
      {
        id: 7,
        path: "/management-bill",
        childComponent: ManagementBill,
      },
      {
        id: 9,
        path: "/statistic-revenue",
        childComponent: StatisticRevenue,
      },
      {
        id: 10,
        path: "/statistic-category",
        childComponent: StatisticCategory,
      },
    ],
  },
  {
    id: 1,
    path: "/abc",
    component: Home,
  },

  {
    id: 2,
    path: "/login",
    component: Login,
  },
  {
    id: 3,
    path: "/testcomponent",
    component: TestComponent,
  },
];

export const routersOwner = []
export const routersReseption = []

export default routers;
