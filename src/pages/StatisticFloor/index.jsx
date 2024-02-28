import React, {useState, useEffect, useRef, useContext} from "react";
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import clsx from "clsx";
import styles from "./style.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import {AppContext, AuthContext} from "~/context";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticFloor = () => {
  const {api} = useContext(AppContext);
  const {authData} = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const loadData = async () => {
    const datayourproduct = await api.productApi.get({
      _id: authData?.user?.yourProduct,
    });
    const dataFloor = await api.floorApi.get({
      id_yourProduct: datayourproduct._id,
    });
    setDatas(dataFloor);
  };
  useEffect(() => {
    loadData();
  }, []);
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.data.datasets[0].data = datas;
        chartInstance.update(); // Cập nhật biểu đồ với dữ liệu mới
      }
    }
  }, [datas]);

  const datahotel = {
    labels: datas.map(
      (stac) => stac.title_floor + stac.floor + stac.title_second
    ),
    datasets: [
      {
        label: `Số phòng có trong tầng `,
        data: datas.map((stac) => stac.id_room.length),
        backgroundColor: [
          "#F4F0FD",
          "#5E3FBE",
          "#CBB6F8",
          "#E5DAFB",
          "#F0FFFF",
        ],

        borderColor: ["#F4F0FD", "#5E3FBE", "#CBB6F8", "#E5DAFB", "#F0FFFF"],
        borderWidth: 2,
        borderAlign: "center",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        justifyContent: "space-between",
        position: "left",
        margin: "0 20px",
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
      },
    },
  };
  return (
    <div className={clsx(styles.container)}>
      {/* {datas.length === 0 ? (
        <div className={clsx(styles.noData)}>Không có dữ liệu</div>
      ) : (
        <>
          <div className={clsx(styles.Piechart)}>
            <Pie
              className={clsx(styles.pie)}
              ref={chartRef}
              data={datahotel}
              options={options}
            />
          </div>
          <div className={clsx(styles.footer)}>Phần trăm sữ dụng các tầng</div>
        </>
      )} */}
      {datas.length === 0 ? (
        <>
          <div className={clsx(styles.Piechart)}>
            <Pie
              className={clsx(styles.pie)}
              data={{
                labels: ["Trống "],
                datasets: [{data: [1], backgroundColor: ["#CCCCCC"]}],
              }}
              options={options}
            />
            <div className={clsx(styles.footer)}>
              Không có dữ liệu các tầng{" "}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={clsx(styles.Piechart)}>
            <Pie
              className={clsx(styles.pie)}
              ref={chartRef}
              data={datahotel}
              options={options}
            />
          </div>
          <div className={clsx(styles.footer)}>Phần trăm sử dụng các tầng</div>
        </>
      )}
    </div>
  );
};

export default StatisticFloor;
