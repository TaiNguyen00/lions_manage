import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./statistic.module.scss";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import HomeIcon from "@mui/icons-material/Home";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatisticRevenue = () => {
  const [users, setUsers] = useState([
    {
      name: "1",
      item_delive: 1,
      item_delivel: 9,
      item_delivell: 12,
      item_deliveed: 13,
    },
    {
      name: "2",
      item_delive: 9,
      item_delivel: 10,
      item_delivell: 11,
      item_deliveed: 3,
    },
    {
      name: "3",
      item_delive: 3,
      item_delivel: 7,
      item_delivell: 21,
      item_deliveed: 23,
    },
    {
      name: "4",
      item_delive: 9,
      item_delivel: 10,
      item_delivell: 20,
      item_deliveed: 23,
    },
    {
      name: "5",
      item_delive: 12,
      item_delivel: 13,
      item_delivell: 14,
      item_deliveed: 23,
    },
  ]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newUsers = users.map((user) => ({
        ...user,
        item_delive: user.item_delive + Math.floor(Math.random() * 2),
        item_delivel: user.item_delivel + Math.floor(Math.random() * 2),
        item_delivell: user.item_delivell + Math.floor(Math.random() * 2),
        item_deliveed: user.item_deliveed + Math.floor(Math.random() * 2),
      }));

      setUsers(newUsers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
  };

  useEffect(() => {
    const filteredUsers = users.filter(
      (user) => parseInt(user.name) <= parseInt(selectedValue)
    );
    setUsers(filteredUsers);
  }, [selectedValue]); // useEffect runs only when selectedValue changes
  const data = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Phòng đơn",
        // data: users.map((user) => user.item_delive),
        backgroundColor: "#E5DAFB",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        // position: "center",
        margin: "10px 20px",
        padding: "10px",
      },

      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      layout: {
        padding: {
          top: 50,
          bottom: 50,
          left: 50, // Adjust the left padding as needed
          right: 50, // Adjust the right padding as needed
          // You can also add top, bottom padding if needed
        },
      },
    },
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.title)}>
        {" "}
        <HomeIcon />
        Thống kê doanh thu
      </div>
      <div className={clsx(styles.select)}>
        <select
          name=""
          id=""
          value={selectedValue}
          onChange={handleSelectChange}
        >
          <option value={12}>Tất cả</option>
          <option value={13}>Quý 1</option>
        </select>
      </div>

      <div className={clsx(styles.charts)}>
        <Bar options={options} data={data} className={clsx(styles.chartss)} />
      </div>
    </div>
  );
};
export default StatisticRevenue;
