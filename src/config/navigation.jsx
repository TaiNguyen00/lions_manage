import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import BusinessIcon from "@mui/icons-material/Business";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TuneIcon from "@mui/icons-material/Tune";
import LoginIcon from "@mui/icons-material/Login";
import AppsIcon from "@mui/icons-material/Apps";
export const sidebarMenu = [
  {
    id: 0,
    title: "Quản lý trạng thái phòng",
    icon: <AccountTreeIcon />,
    path: "/room-status",
  },
  {
    id: 1,
    title: "Quản lý tầng",
    icon: <AppsIcon />,
    path: "/floors-manage",
  },
  {
    id: 2,
    title: "Quản lý nhân viên",
    icon: <AccessibilityIcon />,
    path: "/reception-manage",
  },

  {
    id: 3,
    title: "Quản lý loại phòng",
    icon: <BusinessIcon />,
    path: "/roomcategory-manage",
  },
  {
    id: 4,
    title: "Quản lý phòng",
    icon: <TuneIcon />,
    path: "/room-manage",
  },
  {
    id: 5,
    title: "Quản lý thống kê",
    icon: <LeaderboardIcon />,
    path: "/",
    item: [
      {
        id: 0,
        title: "Doanh thu",
        icon: <NewspaperIcon fontSize="small" />,
        path: "/statistic-revenue",
      },

      {
        id: 1,
        title: "Lịch sử khách hàng",
        icon: <AccountTreeIcon fontSize="small" />,
        path: "/customer-history",
      },
      {
        id: 2,
        title: "Hóa đơn",
        icon: <LoginIcon fontSize="small" />,
        path: "/management-bill",
      },
    ],
  },
];
