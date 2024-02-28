import React, {useState, useEffect, useContext} from "react";
import clsx from "clsx";
import style from "./styles.module.scss";
import Room from "../../components/Room";
import DvrIcon from "@mui/icons-material/Dvr";
import DeleteModal from "./ModalDelete/index";
import ModalRoom from "./ModalRoom";
import {AppContext, AuthContext} from "~/context";
import {Button} from "@mui/material";
import {useForm} from "react-hook-form";
import UnAuthorized from "~/components/UnAuthorized";
const ManagementRoom = () => {
  const {api, spinner} = useContext(AppContext);
  const {authData} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [floors, setFloors] = useState([]);
  const [catelory, setCatelory] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const sortFloor = floors.sort((a, b) => a.floor - b.floor);
  const loadData = async () => {
    try {
      spinner.show();
      const dataFloor = await api.floorApi.get({
        id_yourProduct: authData?.user?.yourProduct,
      });
      const dataCatelory = await api.cateloryApi.get({
        id_yourProduct: authData?.user?.yourProduct,
      });
      setFloors(dataFloor);
      setCatelory(dataCatelory);
    } catch (err) {
      console.log(err);
    } finally {
      spinner.hidden();
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const frmModel = useForm();
  const {reset} = frmModel;

  const handleEdit = (floorID, roomID) => {
    const Floors = floors.find((floors) => floors._id == floorID);
    const currentRoom = Floors.id_room.find((room) => room._id == roomID);
    reset({
      _id: currentRoom._id,
      roomcode: currentRoom.roomcode,
      floor_id: currentRoom.floor_id,
      catelory_room: currentRoom.catelory_room._id,
      isEdit: true,
    });
    loadData();
    setOpen(true);
  };
  const handleAdd = () => {
    reset({
      roomcode: "",
      floor_id: "",
      catelory_room: "",
    });
    setOpen(true);
  };
  const handlclose = () => {
    setOpen(false);
  };
  const handleDelete = async (floorID, roomID) => {
    const Floors = floors.find((floors) => floors._id == floorID);
    const currentRoom = Floors.id_room.find((room) => room._id == roomID);
    setDataDelete(currentRoom);
    setOpenDelete(true);
  };

  const cloesDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      {authData.user.role === "owner" ? (
        <div className={clsx(style.body)}>
          <div className={clsx(style.body_container)}>
            <div className={clsx(style.header_content)}>
              <div className={clsx(style.header_title)}>
                <DvrIcon />
                <h4>Danh sách phòng</h4>
              </div>
              <div className={clsx(style.header_button)}>
                <Button
                  className={clsx(style.button)}
                  variant="outlined"
                  style={{border: " 1px solid #000", color: "#000"}}
                  onClick={handleAdd}
                >
                  Thêm Phòng
                </Button>
              </div>
            </div>

            <div className={clsx(style.container)}>
              {sortFloor.map((fls) => (
                <div key={fls._id} className={clsx(style.floor)}>
                  <h4>
                    {fls.title_foor} {fls.floor}
                  </h4>
                  <div className={clsx(style.room)}>
                    {fls.id_room.length > 0 ? (
                      fls.id_room.map((room) => (
                        <Room
                          key={room._id}
                          isEdit
                          style={{cursor: "pointer"}}
                          roomData={room}
                          handleDelete={() => handleDelete(fls._id, room._id)}
                          handleEdit={() => handleEdit(fls._id, room._id)}
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

            <DeleteModal
              cloesDelete={cloesDelete}
              loadData={loadData}
              dataDelete={dataDelete}
              open={openDelete}
            />
            <ModalRoom
              open={open}
              loadData={loadData}
              catelory={catelory}
              floor={floors}
              frmModel={frmModel}
              onClose={handlclose}
            />
          </div>
        </div>
      ) : (
        <UnAuthorized />
      )}
    </>
  );
};
export default ManagementRoom;
