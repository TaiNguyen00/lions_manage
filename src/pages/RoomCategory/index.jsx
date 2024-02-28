import clsx from "clsx";
import styles from "./roomcategory.module.scss";
import React, { useState, useEffect, useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, MenuItem, Select } from "@mui/material";
import { AppContext, AuthContext } from "~/context";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "./Modal/Modal";
import DeleteModal from "./Modal/ModalDelete";
import { formatCurrencyVND } from "~/utils/helpers";
import UnAuthorized from "~/components/UnAuthorized";
const RoomCategory = () => {
  const { api, spinner } = useContext(AppContext);
  const { authData } = useContext(AuthContext);
  const [catelory, setCatelory] = useState([]);
  const [filter, setFilter] = useState(catelory);
  const [cateloryRoom, setRoomCate] = useState("Tất cả");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const frmModel = useForm();
  const { reset } = frmModel;
  const loadData = async () => {
    try {
      spinner.show();
      const dataCatelory = await api.cateloryApi.get({
        id_yourProduct: authData?.user?.yourProduct,
      });
      setCatelory(dataCatelory);
    } catch (err) {
      console.log(err);
    } finally {
      spinner.hidden();
    }
  };
  const sortCatelory = catelory.sort((a, b) => a.priceDay - b.priceDay);
  const handleSelectChange = (event) => {
    setRoomCate(event.target.value);
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (cateloryRoom === "Tất cả") {
      setFilter(sortCatelory);
    } else {
      const filteredData = sortCatelory.filter(
        (dt) => dt.cateloryRoom === cateloryRoom
      );
      setFilter(filteredData);
    }
  }, [cateloryRoom, sortCatelory]);

  const handlclose = () => {
    setOpen(false);
  };
  const handleAdd = () => {
    reset({
      cateloryRoom: "",
      priceDay: "",
      priceHour: "",
    });
    setOpen(true);
  };
  const handleEdit = (cateloryID) => {
    const catelorys = catelory.find((catelory) => catelory._id == cateloryID);
    reset({
      _id: catelorys._id,
      cateloryRoom: catelorys.cateloryRoom,
      priceDay: catelorys.priceDay,
      priceHour: catelorys.priceHour,
      isEdit: true,
    });
    setOpen(true);
  };
  const handleDeletes = async (cateloryID) => {
    const catelorys = catelory.find((catelory) => catelory._id == cateloryID);
    setDataDelete(catelorys);
    setOpenDelete(true);
  };
  // tat modal xoa
  const cloesDelete = () => {
    setOpenDelete(false);
  };
  return (
    <>
      {authData.user.role === "owner" ? (
        <div className={clsx(styles.container)}>
          <div className={clsx(styles.aside)}>
            <div className={clsx(styles.content)}>
              <h2 className={clsx(styles.h2)}>
                <HomeIcon /> Danh sách loại phòng
              </h2>
              <div className={clsx(styles.row)}>

                <div className={clsx(styles.crud)}>
                  <Button onClick={handleAdd} className={clsx(styles.button)}>
                    + Thêm mới
                  </Button>
                </div>
              </div>

              {/* table  */}
              {setCatelory ? (
                <TableContainer className={clsx(styles.tb)} component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Tên loại phòng</TableCell>
                        <TableCell align="center">Giá theo ngày</TableCell>
                        <TableCell align="center">Giá theo giờ</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        sortCatelory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              Chưa có dữ liệu loại phòng
                            </TableCell>
                          </TableRow>
                        ) : (
                          sortCatelory.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell align="center">{row.cateloryRoom}</TableCell>
                              <TableCell align="center">{formatCurrencyVND(row.priceDay)}</TableCell>
                              <TableCell align="center">{formatCurrencyVND(row.priceHour)}</TableCell>
                              <TableCell align="center">
                                <div className={clsx(styles.action)}>
                                  <p onClick={() => handleEdit(row._id)}>
                                    <EditIcon />
                                  </p>
                                  <p onClick={() => handleDeletes(row._id)}>
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
              ) : <UnAuthorized />}

              <Modal
                frmModel={frmModel}
                catelory={catelory}
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
              {/* end */}
            </div>
          </div>
        </div>
      ) : <UnAuthorized />}

    </>
  );
};
export default RoomCategory;
