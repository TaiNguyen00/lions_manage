import styles from "./styles.module.scss";
import clsx from "clsx";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Divider, Space, Tag } from "antd";
import Paper from "@mui/material/Paper";
import { useState, useContext, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "./Modal/Modal";
import { AppContext, AuthContext } from "~/context";
import { useForm } from "react-hook-form";
import DeleteModal from "./Modal/ModalDelete";
import UnAuthorized from "~/components/UnAuthorized";
const Floors = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [data, setData] = useState([]);
  const { api, spinner } = useContext(AppContext);
  const frmModel = useForm();
  const { reset } = frmModel;
  const { authData } = useContext(AuthContext);
  // get data
  const sortFloor = data.sort((a, b) => a.floor - b.floor);
  const loadData = async () => {
    try {
      spinner.show();
      const dataFloor = await api.floorApi.get({
        id_yourProduct: authData?.user?.yourProduct,
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

  // end
  // sử lí from thêm
  const handleAdd = () => {
    reset({
      title_floor: "",
      floor: "",
      title_second: "",
    });
    setOpen(true);
  };
  const handlclose = () => {
    setOpen(false);
  };
  // end
  // sử lí form sửa
  const handleEdit = (floorId) => {
    const Floors = data.find((floors) => floors._id == floorId);
    reset({
      _id: Floors._id,
      title_floor: Floors.title_floor,
      floor: Floors.floor,
      title_second: Floors.title_second,
      isEdit: true,
    });
    setOpen(true);
  };
  // end
  // sử lí hàm xóa
  const handleDeletes = async (floorId) => {
    const floors = data.find((fl) => fl._id == floorId);
    setDataDelete(floors);
    setOpenDelete(true);
  };
  // tat modal xoa
  const cloesDelete = () => {
    setOpenDelete(false);
  };
  // xoa
  return (
    <>
      {authData.user.role === 'owner' ? (
        <div className={clsx(styles.container)}>
          <div className={clsx(styles.aside)}>
            <div className={clsx(styles.content)}>
              <h2 className={clsx(styles.h2)}>
                <HomeIcon /> Quản lý tầng
              </h2>
              <div className={clsx(styles.row)}>
                <Button
                  className={clsx(styles.button)}
                  variant="outlined"
                  style={{ border: " 1px solid #000", color: "#000" }}
                  onClick={handleAdd}
                >
                  Thêm Tầng
                </Button>
              </div>
            </div>
            {sortFloor ? (
              <TableContainer className={clsx(styles.tb)} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Tên tầng</TableCell>
                      <TableCell align="center">Số tầng</TableCell>
                      <TableCell align="center">Tên phụ</TableCell>
                      <TableCell align="center">Số lượng phòng</TableCell>
                      <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      sortFloor.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            Chưa có dữ liệu tầng
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortFloor?.map((row) => (
                          <TableRow key={row?._id}>
                            <TableCell align="center">{row?.title_floor}</TableCell>
                            <TableCell align="center">{row?.floor}</TableCell>
                            <TableCell align="center">
                              {row?.title_second ? (
                                <Tag color="#87d068">{row?.title_second}</Tag>
                              ) : (
                                <Tag color="#f50">Tầng chưa có tên phụ</Tag>
                              )}
                            </TableCell>
                            <TableCell align="center">{row?.id_room.length}</TableCell>
                            <TableCell align="center">
                              <div className={clsx(styles.action)}>
                                <p onClick={() => handleEdit(row?._id)}>
                                  <EditIcon />
                                </p>
                                <p onClick={() => handleDeletes(row?._id)}>
                                  <DeleteIcon />
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            ) : "Không có dử liệu"}

          </div>
        </div>
      ) : <UnAuthorized />}


      <Modal
        frmModel={frmModel}
        floor={data}
        open={open}
        loadData={loadData}
        onClose={handlclose}
      />
      <DeleteModal
        cloesDelete={cloesDelete}
        loadData={loadData}
        dataDelete={dataDelete}
        open={openDelete}
      />
    </>
  );
};

export default Floors;
