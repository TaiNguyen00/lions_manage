import React, {useContext, useEffect, useState} from "react";
import {AppContext, AuthContext} from "~/context";
import NameHotel from "~/components/Namehotel";
import StatisticCategory from "../StatisticCategory";
import clsx from "clsx";
import style from "./style.module.scss";
import StatisticFloor from "../StatisticFloor";

const Home = () => {
  const {spinner, api} = useContext(AppContext);
  const {authData} = useContext(AuthContext);
  const [dataFloor, setDataFloor] = useState([]);
  const [staff, setDataStaff] = useState([]);
  const [dataCatelory, setDataCatelory] = useState([]);
  const [room, setRoom] = useState([]);
  const [client, setClient] = useState([]);
  const [bill, setBill] = useState([]);
  const loadData = async () => {
    const datayourproduct = await api.productApi.get({
      _id: authData?.user?.yourProduct,
    });
    const dataFloor = await api.floorApi.get({
      id_yourProduct: datayourproduct._id,
    });
    setDataFloor(dataFloor);
    const staff = await api.accountApi.get({
      yourProduct: datayourproduct._id,
      role: "reception",
    });
    setDataStaff(staff);
    const dataCatelory = await api.cateloryApi.get({
      id_yourProduct: datayourproduct._id,
    });
    setDataCatelory(dataCatelory);
    const room = await api.roomApi.get({id_yourProduct: datayourproduct._id});
    setRoom(room);
    const client = await api.clientApi.get({
      id_yourProduct: datayourproduct._id,
    });
    setClient(client);
    const bill = await api.billApi.get({id_yourProduct: datayourproduct._id});
    setBill(bill);
  };
  const quatityFloor = dataFloor.length;
  const quatityStaff = staff.length;
  const quatityCatelory = dataCatelory.length;
  const quatityRoom = room.length;
  const quatityClient = client.length;
  const quatityBill = bill.length;
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div className={clsx(style.manage)}>
        <NameHotel
          name="Tổng số tầng"
          quatity={quatityFloor}
          path="/floors"
          backgroundcolor="#FFA500"
        />
        <NameHotel
          name="Tổng nhân viên"
          quatity={quatityStaff}
          path="/reception-manage"
          backgroundcolor="#009306"
        />
        <NameHotel
          name="Tổng loại phòng"
          quatity={quatityCatelory}
          path="/room-category"
          backgroundcolor="#A200BC"
        />
        <NameHotel
          name="Tổng phòng"
          quatity={quatityRoom}
          path="/management-room"
          backgroundcolor="#BC4400"
        />
        <NameHotel
          name="Tổng khách hàng"
          quatity={quatityClient}
          path="/customer-history"
          backgroundcolor="#05746D"
        />
        <NameHotel
          name="Tổng hóa đơn"
          quatity={quatityBill}
          path="/management-bill"
          backgroundcolor="#fc3e3e"
        />
      </div>
      <div className={clsx(style.title)}>
        <h4 className={clsx(style.title_home)}>Thống kê và báo cáo </h4>
        <p> Thống kê về phần trăm sử dụng các loại phòng</p>
      </div>
      <div className={clsx(style.char)}>
        <StatisticFloor />
        <StatisticCategory />
      </div>
    </div>
  );
};

export default Home;
