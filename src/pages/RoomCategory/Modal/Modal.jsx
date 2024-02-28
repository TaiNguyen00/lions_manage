import { Button, Dialog, DialogContent, DialogTitle, IconButton, styled, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { InputCustom } from "../From/index";
import clsx from "clsx";
import styles from "./style.module.scss";
import { AppContext, AuthContext } from "~/context";
import React, { useContext } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        width: "80%", // Set your desired width here
        padding: theme.spacing(1),
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
        paddingBottom: "30px",
        height: 'auto',
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(2),
    },
}));
const Modal = ({ open, onClose, loadData, catelory, frmModel }) => {
    const { api, spinner, notificationContext } = useContext(AppContext)
    const { authData } = useContext(AuthContext);
    const nameCate = catelory.map(ct => ct.cateloryRoom)
    const handleClose = () => {
        onClose();
    };
    const { handleSubmit, control, formState: { errors }, getValues } = frmModel
    const { isEdit } = getValues()

    const onSubmit = async (data) => {
        try {
            spinner.show()
            if (isEdit) {
                await api.cateloryApi.update({
                    _id: data._id,
                    cateloryRoom: data.cateloryRoom,
                    priceDay: data.priceDay,
                    priceHour: data.priceHour,
                })
                loadData()
                handleClose();
                notificationContext.show({
                    type: "success",
                    title: "Đã sửa loại phòng thành công !",
                    // duration: mặt định 4s,
                    description: `Loại ${data.cateloryRoom} đã được sửa !`
                })
            } else {
                if (nameCate.includes(data.cateloryRoom)) {
                    // alert("Loại đã tồn tại")
                    notificationContext.show({
                        type: "error",
                        title: "Thêm thất bại!",
                        // duration: mặt định 4s,
                        description: `Loại ${data.cateloryRoom} đã tồn tại !`
                    })
                } else {
                    await api.cateloryApi.insert({
                        ...data,
                        id_yourProduct: authData.user.yourProduct
                    })
                    loadData()
                    handleClose();
                    notificationContext.show({
                        type: "success",
                        title: "Đã thêm loại phòng thành công !",
                        // duration: mặt định 4s,
                        description: `Loại ${data.cateloryRoom} đã được thêm !`
                    })
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            spinner.hidden()

        }

    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle id="customized-dialog-title">
                {isEdit ? 'Sửa Loại' : 'Thêm Loại'}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers className={clsx(styles.from)} id="modal-modal-description">

                    <InputCustom
                        className={`Input_CusTum`}
                        control={control}
                        required
                        name="cateloryRoom"
                        // label="Tầng"
                        placeholder="Loại phòng"
                        type="text"
                        defaultValue=""
                    />
                    <InputCustom

                        control={control}
                        required
                        name="priceDay"
                        // label="Tầng"
                        placeholder="Giá theo ngày"
                        type="Number"
                        defaultValue=""
                    />

                    <InputCustom
                        control={control}
                        required
                        name="priceHour"
                        // label="Số tầng"
                        placeholder="Giá theo giờ"
                        type="number"
                        defaultValue=""
                    />

                </DialogContent>
                <div className={clsx(styles.end_modal)}>
                    <div className={clsx(styles.button_save)}>
                        <Button style={{ color: "#fff" }} type="submit">
                            {isEdit ? 'Sửa' : 'Thêm'}
                        </Button>
                    </div>
                    <div className={clsx(styles.button_close)}>
                        <Button style={{ color: "#fff" }} onClick={handleClose}>
                            Đóng
                        </Button>
                    </div>
                </div>
            </form>
        </BootstrapDialog>
    );
};

export default Modal;
