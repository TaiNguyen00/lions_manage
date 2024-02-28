import {get, useForm} from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import {useEffect, useContext} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {InputCustom, SelectInput} from "../Fomts/Input";
import clsx from "clsx";
import styles from "./style.module.scss";
import {AppContext, AuthContext} from "~/context";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  "& .MuiDialog-paper": {
    width: "80%", // Set your desired width here
    height: "auto",
  },
  "& .MuiDialogContent-root": {
    height: "auto",
  },
  "& .MuiDialogTitle-root": {
    marginTop: "4px",
    marginLeft: "6px",
    height: "50px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    height: "60px",
    marginBottom: "10px",
  },
}));
const ModalRoom = ({open, onClose, floor, loadData, frmModel, catelory}) => {
  const {api, spinner, notificationContext, modal} = useContext(AppContext);
  const {authData} = useContext(AuthContext);
  const handleClose = () => {
    onClose();
  };
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
    register,
  } = frmModel;

  const {isEdit, floor_id, catelory_room} = getValues();

  const onSubmit = async (data) => {
    const room = await api.roomApi.get({
      id_yourProduct: authData.user.yourProduct,
    });
    const numberRoom = room.map((rooms) => rooms.roomcode);
    try {
      spinner.show();
      if (isEdit) {
        await api.roomApi.update({
          _id: data._id,
          roomcode: data.roomcode,
          floor_id: data.floor_id,
          old_floor_id: floor_id,
          catelory_room: data.catelory_room,
          old_catelory_id: catelory_room,
        });
        loadData();
        handleClose();
        notificationContext.show({
          type: "success",
          title: "Đã sửa phòng thành công !",
          // duration: mặt định 4s,
          description: `Phòng ${data.roomcode} đã được sửa !`,
        });
      } else {
        if (numberRoom.includes(Number(data.roomcode))) {
          notificationContext.show({
            type: "error",
            title: "Thêm phòng thất bại !!",
            // duration: mặt định 4s,
            description: `Phòng ${data.roomcode} đã tồn tại !`,
          });
        } else {
          await api.roomApi.insert({
            ...data,
            condition: "Phòng trống",
            packageID: authData.user.package,
            id_yourProduct: authData.user.yourProduct,
          });
          loadData();
          handleClose();
          notificationContext.show({
            type: "success",
            title: "Đã thêm phòng thành công !!",
            // duration: mặt định 4s,
            description: `Phòng ${data.roomcode} đã được thêm !`,
          });
        }
      }
    } catch (err) {
      if (err?.request?.status == 400) {
        modal.show({
          type: "error",
          title: "Số lượng phòng đã đạt giới hạn",
          contents: [err.response.massage],
        });
      } else {
        modal.show({
          type: "error",
          title: "Thêm phòng thất bại vui lòng thử lại",
          contents: [
            "Vui lòng kiểm tra lại bạn đã điền đầy đủ thông tin chúng tôi đã yêu cầu chưa ",
          ],
        });
      }
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
        <DialogTitle id="customized-dialog-title">
          {isEdit ? "Sửa Phòng" : "Tạo Phòng"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
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
              name="roomcode"
              label="Phòng"
              placeholder="Phòng"
              type="number"
              defaultValue=""
              rules={{required: "Không được để trống"}}
            />
            <SelectInput
              control={control}
              required
              name="catelory_room"
              label="Chọn loại phòng"
              optionInput={catelory}
              defaultValue=""
              rules={{required: "Không được để trống"}}
            />

            <SelectInput
              control={control}
              required
              name="floor_id"
              label="Chọn tầng"
              optionInput={floor}
              defaultValue=""
              rules={{required: "Không được để trống"}}
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

export default ModalRoom;
