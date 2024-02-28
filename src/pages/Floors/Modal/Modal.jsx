import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {InputCustom} from "../Fomts/Input";
import clsx from "clsx";
import styles from "./style.module.scss";
import {AppContext, AuthContext} from "~/context";
import React, {useContext} from "react";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  "& .MuiDialog-paper": {
    width: "80%",
    padding: theme.spacing(1),
    // Set your desired width here
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
    height: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    height: "70px",
  },
}));
const Modal = ({open, onClose, loadData, frmModel, floor}) => {
  const {authData} = useContext(AuthContext);
  const {api, spinner, notificationContext} = useContext(AppContext);
  const handleClose = () => {
    onClose();
  };
  const numberFloor = floor?.map((fl) => fl.floor);
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = frmModel;
  const {isEdit} = getValues();
  const onSubmit = async (data) => {
    try {
      spinner.show();
      if (isEdit) {
        await api.floorApi.update({
          _id: data._id,
          title_floor: data.title_floor,
          floor: data.floor,
          title_second: data.title_second,
        });
        loadData();
        handleClose();
        notificationContext.show({
          type: "success",
          title: "Đã sửa tầng thành công !",
          // duration: mặt định 4s,
          description: `Tầng ${data.floor} đã được sửa !`,
        });
      } else {
        if (numberFloor.includes(Number(data.floor))) {
          alert("Số tầng đã tồn tại !");
        } else {
          await api.floorApi.insert({
            ...data,
            id_yourProduct: authData.user.yourProduct,
          });
          loadData();
          handleClose();
          notificationContext.show({
            type: "success",
            title: "Đã thêm tầng thành công !",
            // duration: mặt định 4s,
            description: `Tầng ${data.floor} đã được thêm !`,
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      spinner.hidden();
    }
  };
  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        onClose={handleClose}
        open={open}
        className={clsx(styles.Boxx)}
      >
        <DialogTitle sx={{m: 0, p: 1}} id="customized-dialog-title">
          {isEdit ? "Sửa Tầng" : "Thêm Tầng"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 6,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers className={clsx(styles.from)}>
            <InputCustom
              className={`Input_CusTum`}
              control={control}
              required
              name="title_floor"
              // label="Tầng"
              placeholder="Tầng"
              type="text"
              defaultValue=""
            />
            <InputCustom
              className={`Input_CusTum`}
              control={control}
              required
              name="floor"
              // label="Số tầng"
              placeholder="Số tầng"
              type="number"
              defaultValue=""
            />
            <InputCustom
              className={`Input_CusTum`}
              control={control}
              name="title_second"
              // label="Tên phụ"
              placeholder="Tên phụ"
              type="text"
              defaultValue=""
            />
          </DialogContent>
          <DialogActions>
            <div className={clsx(styles.end_modal)}>
              <div className={clsx(styles.button_save)}>
                <Button style={{color: "#fff"}} type="submit">
                  {isEdit ? "Sửa" : "Thêm"}
                </Button>
              </div>
              <div className={clsx(styles.button_close)}>
                <Button style={{color: "#fff"}} onClick={handleClose}>
                  Đóng
                </Button>
              </div>
            </div>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};

export default Modal;
