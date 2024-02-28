import clsx from "clsx";
import styles from "./style.module.scss";
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import TableComponent from "./Table/index";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import { AppContext, AuthContext } from "~/context";
// import PrintIcon from "@mui/icons-material/Print";

import HomeIcon from "@mui/icons-material/Home";
import { formatCurrencyVND, formatDateRoomShow } from "~/utils/helpers";

const Managementbill = () => {
  const { api } = useContext(AppContext);
  const { authData } = useContext(AuthContext);
  const [bill, setBill] = useState([]);
  const loadData = async () => {
    const bill = await api.billApi.get({ id_yourProduct: authData?.user?.yourProduct, });
    setBill(bill);


  };
  const sortDay = bill.sort((a, b) => {
    const dateA = new Date(a.checkInDateTime);
    const dateB = new Date(b.checkInDateTime);

    return dateA - dateB;
  });
  useEffect(() => {
    loadData();
  }, []);
  const columns = [
    {
      id: "1",
      name: "Tên khách hàng",
    },
    {
      id: "2",
      name: "Loại phòng",
    },
    {
      id: "3",
      name: "Phòng",
    },
    {
      id: "4",
      name: "Số Điện thoại",
    },
    {
      id: "5",
      name: "Giới tính ",
    },
    {
      id: "6",
      name: "Thời gian nhận phòng",
    },
    {
      id: "7",
      name: "Thời gian trả phòng",
    },
    {
      id: "8",
      name: "Thời gian ở",
    },
    {
      id: "9",
      name: "Giá phòng",
    },
    {
      id: "10",
      name: "Tổng tiền",
    },
  ];

  const [filteredData, setFilteredData] = useState(bill);
  const [startDate, setStartDate] = useState(dayjs("2023/09/4"));
  const [endDate, setEndDate] = useState(dayjs("2023/12/21"));
  const filterData = (start, end) => {
    if (start && end) {
      const filteredData = sortDay.filter((entity) => {
        const itemDate = dayjs(entity.checkInDateTime);
        return itemDate >= start && itemDate <= end;
      });
      // console.log("loc", filteredData);
      return filteredData;
    } else {
      return sortDay;
    }
  };
  // câp
  useEffect(() => {
    const newFilteredData = filterData(startDate, endDate);
    setFilteredData(newFilteredData); //
  }, [bill, startDate, endDate]);
  // console.log("bill", bill);
  // console.log("fitlerdata", filteredData);
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    const newFilteredData = filterData(newDate, endDate);
    setFilteredData(newFilteredData);
    // setBill(newFilteredData);

    // console.log("neu", newDate);
  };

  const handleEndDateChange = (newDate) => {
    const newFilteredData = filterData(startDate, newDate);
    setFilteredData(newFilteredData);

    setEndDate(newDate);

    // console.log("neu", newDate);
  };
  const [locales, setLocales] = useState("en-gb");

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.aside)}>
        <div className={clsx(styles.content)}>
          <h2 className={clsx(styles.h2)}>
            <HomeIcon /> Quản lý Hóa đơn
          </h2>
          <div className={clsx(styles.row)}>
            <div className={clsx(styles.selec)}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={locales}
              >
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Ngày bắt đấu"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <DatePicker
                    label="Ngày kết thúc"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>

          <TableComponent
            columns={columns}
            data={filteredData}
            // data={sortDay}
            setData={setBill}
            renderCell={(entity, column) => {
              switch (column.id) {
                case "1":
                  return entity.name;
                case "2":
                  return entity.catelory_room;
                case "3":
                  return entity.room_code;
                case "4":
                  return entity.phone;
                case "5":
                  return entity.sex;
                case "6":
                  return formatDateRoomShow(entity.checkInDateTime);
                case "7":
                  return formatDateRoomShow(entity.checkOutDateTime);
                case "8":
                  return entity.intendTime;
                case "9":
                  return formatCurrencyVND(entity.priceRoom);
                case "10":
                  return formatCurrencyVND(entity.intendPrice);
                default:
                  return "";
              }
            }}
          />

        </div>
      </div>
    </div>
  );
};

export default Managementbill;
