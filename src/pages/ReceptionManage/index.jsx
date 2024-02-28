import clsx from "clsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./receptionManage.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState, useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, MenuItem, Select } from "@mui/material";
import Modal from "./Modal/Modal";
import { AppContext, AuthContext } from "~/context";
import { useForm } from "react-hook-form";
import DeleteModal from "./Modal/ModalDelete";
import UnAuthorized from "~/components/UnAuthorized";
const ReceptionManage = () => {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const { api } = useContext(AppContext);
  const { authData } = useContext(AuthContext);
  const frmModel = useForm();
  const [dataDelete, setDataDelete] = useState({});
  const { reset } = frmModel;
  const [openDelete, setOpenDelete] = useState(false);

  const loadData = async () => {
    try {
      const datayourproduct = await api.productApi.get({ _id: authData?.user?.yourProduct, });
      const staff = await api.accountApi.get({
        yourProduct: authData?.user?.yourProduct,
        role: "reception"
      });
      setProduct(datayourproduct)
      setData(staff);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    loadData()
  }, [])
  // thêm nhân viên
  const [open, setOpen] = useState(false)
  const handleAdd = () => {
    reset({
      username: '',
      name: "",
      codeID_staff: '',
      password: "",
      role_staff: "",
      phone: "",
    });
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleEdit = (staffID) => {
    const staffs = data.find((staff) => staff._id == staffID);
    reset({
      _id: staffs._id,
      username: staffs.username,
      name: staffs.name,
      password: staffs.password,
      codeID_staff: staffs.codeID_staff,
      role_staff: staffs.role_staff,
      phone: staffs.phone,
      isEdit: true
    })
    setOpen(true);
  }
  const handleDeletes = async (staffID) => {
    const staff = data.find(fl => fl._id == staffID)
    setDataDelete(staff)
    setOpenDelete(true)
  }
  // tat modal xoa 
  const cloesDelete = () => {
    setOpenDelete(false)
  }

  return (
    <>
      {authData.user.role === "owner" ? (
        <div className={clsx(styles.container)}>
          <div className={clsx(styles.aside)}>
            <div className={clsx(styles.content)}>
              <h2 className={clsx(styles.h2)}>
                <HomeIcon /> Quản lý nhân viên
              </h2>
              <div className={clsx(styles.row)}>
                <div className={clsx(styles.selec)}>

                </div>
                <div className={clsx(styles.crud)}>
                  <Button onClick={handleAdd} className={clsx(styles.button)}>
                    + Thêm mới
                  </Button>
                </div>
              </div>

              <TableContainer className={clsx(styles.tb)} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Tên đăng nhập</TableCell>
                      <TableCell align="center">Mật khẩu</TableCell>
                      <TableCell align="center">Tên nhân viên</TableCell>
                      <TableCell align="center">Số điện thoại</TableCell>
                      <TableCell align="center">Code nhân viên </TableCell>
                      <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          Chưa có dữ liệu nhân viên
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell align="center">{row?.username}</TableCell>
                          <TableCell align="center">{row?.password}</TableCell>
                          <TableCell align="center">{row?.name}</TableCell>
                          <TableCell align="center">{row?.phone}</TableCell>
                          <TableCell align="center">{row?.codeID_staff}</TableCell>
                          <TableCell align="center">
                            <div className={clsx(styles.action)}>
                              <p onClick={() => handleEdit(row._id)}><EditIcon /></p>
                              <p onClick={() => handleDeletes(row._id)}><DeleteIcon /></p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      ) : <UnAuthorized />}

      <Modal
        frmModel={frmModel}
        open={open}
        loadData={loadData}
        onClose={closeModal}
        product={product}
        staffs={data}
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


export default ReceptionManage;
