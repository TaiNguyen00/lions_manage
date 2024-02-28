import { Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import styles from "./crud.module.scss";
import clsx from "clsx";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { AppContext, AuthContext } from "~/context";
import { InputCustom } from "../Fomts/Input";
const Modal = ({ open, onClose, loadData, frmModel, product, staffs }) => {
  const { api, spinner, notificationContext, modal } = useContext(AppContext);
  const { authData } = useContext(AuthContext);
  console.log("check auth data", authData);
  const { handleSubmit, control, getValues } = frmModel;
  const { isEdit } = getValues();
  const onSubmit = async (data) => {
    try {
      spinner.show();
      const codeStaff = staffs.map((st) => st.username);
      if (isEdit) {
        await api.accountApi.update({
          _id: data._id,
          username: data.username,
          phone: data.phone,
          name: data.name,
          password: data.password,
        });
        loadData();
        onClose();
        notificationContext.show({
          type: "success",
          title: "Đã cập nhật nhân viên thành công !",
          // duration: mặt định 4s,
          description: `Nhân viên  ${data.username} đã được cập nhật !`,
        });
      } else {
        if (codeStaff.includes(data.username)) {
          notificationContext.show({
            type: "error",
            title: "Thêm thất bại !",
            // duration: mặt định 4s,
            description: `Mã nhân viên  ${data.username} đã được sử dụng !`,
          });
        } else {
          await api.accountApi.insert({
            ...data,
            username: product.codeProduct + data.username,
            package: authData.user.package,
            yourProduct: authData.user.yourProduct,
            role: "reception",
          });
          notificationContext.show({
            type: "success",
            title: "Đã thêm nhân viên thành công !",
            // duration: mặt định 4s,
            description: `Nhân viên  ${data.username} đã được thêm !`,
          });
          onClose();
          loadData();
        }
      }
    } catch (err) {
      if (err?.request?.status == 400) {
        modal.show({
          type: 'error',
          title: 'Số lượng nhân viên đạt giới hạn ',
          contents: [err.response.massage]
        })
      } else {
        modal.show({
          type: 'error',
          title: 'Thêm phòng thất bại vui lòng thử lại',
          contents: ['Vui lòng kiểm tra lại bạn đã điền đầy đủ thông tin chúng tôi đã yêu cầu chưa ']
        })
      }
      console.log(err);
    } finally {
      spinner.hidden();
    }
  };
  return (
    <div>
      <Dialog open={open} className={clsx(styles.crudComponent)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className={clsx(styles.formCrud)}>
            <Typography className={clsx(styles.Typography)}>
              {isEdit ? "Sửa nhân viên" : "Thêm nhân viên"}
            </Typography>

            <InputCustom
              className={clsx(styles.input_room)}
              control={control}
              required
              name="username"
              // label="Tầng"
              placeholder="Tên đăng nhập"
              type="text"
              defaultValue=""
            />
            <InputCustom
              className={clsx(styles.input_room)}
              control={control}
              required
              name="password"
              // label="Tầng"
              placeholder="Mật khẩu"
              type="password" // ??
              defaultValue=""
            />
            <InputCustom
              className={clsx(styles.input_room)}
              control={control}
              required
              name="name"
              // label="Tầng"
              placeholder="Tên nhân viên"
              type="text"
              defaultValue=""
            />
            <InputCustom
              className={clsx(styles.input_room)}
              control={control}
              required
              name="phone"
              // label="Tầng"
              placeholder="Số điện thoại"
              type="Number"
              defaultValue=""
            />
          </DialogContent>
          <DialogActions className={clsx(styles.button)}>
            <div className={clsx(styles.addBtn)}>
              <button type="submit">{isEdit ? "Sửa" : "Thêm"}</button>
            </div>
            <div className={clsx(styles.closeBtn)}>
              <button onClick={onClose}>Đóng</button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;