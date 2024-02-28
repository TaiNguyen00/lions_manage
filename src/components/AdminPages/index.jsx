import { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import style from "./style.module.scss";
import Room from "../Room";
import DvrIcon from "@mui/icons-material/Dvr";
import Button from "@mui/material/Button";
import ModalFormRoom from "./Modal/modalFormRoom";
import { AppContext, AuthContext } from "~/context";
import BillModal from "./Modal/BillRoom";

import io from "socket.io-client";
const socket = io.connect(import.meta.env.VITE_API_PRODUCTION);

const AdminPages = () => {
  const statusRoom = {
    roomAll: "Tất cả",
    roomEmpty: "Phòng trống",
    roomInhabited: "Phòng đang ở",
  };
  const [open, setOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const [bill, setBill] = useState(null);
  const [openBill, setOpenBill] = useState(false);
  const [fiterFloor, setFiter] = useState(statusRoom.roomAll);
  const { api, spinner } = useContext(AppContext);
  const { authData } = useContext(AuthContext);

  const loadData = async () => {
    console.log("check");
    try {
      spinner.show();
      const datayourproduct = await api.productApi.get({
        _id: authData?.user?.yourProduct,
      });
      setProduct(datayourproduct);
      const dataFloor = await api.floorApi.get({
        id_yourProduct: datayourproduct._id,
      });
      setData(dataFloor);
    } catch (err) {
      console.log(err);
    } finally {
      spinner.hidden();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoomAll = () => {
    setFiter(statusRoom.roomAll);
  };

  const handleRoomEmpty = () => {
    setFiter(statusRoom.roomEmpty);
  };
  const handleCloseBill = () => setOpenBill(false);
  const handleRoomInhabited = () => {
    setFiter(statusRoom.roomInhabited);
  };

  // handle edit
  const onClickCard = (roomData) => {
    setCurrentRoom(roomData);
    setOpen(true);
    socket.emit("joinRoom", roomData._id);
  };

  const sortedFloorAndFilterRoom = (data, name) => {
    return data
      .sort((a, b) => a.floor - b.floor)
      .map((floor) => ({
        ...floor,
        id_room: floor.id_room
          ? floor.id_room.filter(
            (room) =>
              fiterFloor == statusRoom.roomAll || fiterFloor == room.condition
          )
          : [],
      }));
  };

  return (
    <div className={clsx(style.body)}>
      <div className={clsx(style.body_container)}>
        <div className={clsx(style.header_content)}>
          <div className={clsx(style.header_title)}>
            <DvrIcon />
            <h4>Danh sách phòng</h4>
          </div>
          <div className={clsx(style.header_button)}>
            <Button
              onClick={handleRoomAll}
              className={clsx(style.button)}
              variant="outlined"
            >
              {statusRoom.roomAll}
            </Button>
            <Button
              onClick={handleRoomEmpty}
              className={clsx(style.button)}
              variant="contained"
              color="success"
            >
              {statusRoom.roomEmpty}
            </Button>
            <Button
              onClick={handleRoomInhabited}
              className={clsx(style.button)}
              variant="contained"
              color="error"
            >
              {statusRoom.roomInhabited}
            </Button>
          </div>
        </div>

        <div className={clsx(style.container)}>
          {sortedFloorAndFilterRoom(data, "floor").map((fls) => (
            <div key={fls._id} className={clsx(style.floor)}>
              <h4>
                {fls.title_foor} {fls.floor}
              </h4>
              <div className={clsx(style.room)}>
                {fls.id_room.length > 0 ? (
                  fls.id_room.map((room) => (
                    <Room
                      key={room._id}
                      style={{ cursor: "pointer" }}
                      roomData={room}
                      onClick={() => onClickCard(room)}
                      loadData={loadData}
                    />
                  ))
                ) : (
                  <h3 className={clsx(style.error)}>
                    Tầng hiện tại chưa có phòng
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>

        {open && <ModalFormRoom
          open={open}
          setOpen={setOpen}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          loadData={loadData}
          setBill={setBill}
          setOpenBill={setOpenBill}
          product={product}
        />}

        {openBill && <BillModal
          open={openBill}
          handleCloseBill={handleCloseBill}
          bill={bill}
          product={product}
        />}
      </div>
    </div>
  );
};
export default AdminPages;
