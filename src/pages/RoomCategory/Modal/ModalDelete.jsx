import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    styled,
} from "@mui/material";
import { AppContext } from "~/context/AppContext";
import { useContext } from "react";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(6),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(4),
    },
}));
const DeleteModal = ({ open, cloesDelete, dataDelete, loadData }) => {
    const { api, spinner, notificationContext } = useContext(AppContext)
    const handleDeletes = async () => {
        try {
            if ((dataDelete.id_room).length) {
                notificationContext.show({
                    type: "error",
                    title: "Không thể xóa loại !",
                    // duration: mặt định 4s,
                    description: `Loại ${dataDelete.cateloryRoom} đã có phòng đang tồn tại !`
                })
                cloesDelete()
            } else {
                await api.cateloryApi.delete({ _id: dataDelete._id });
                cloesDelete()
                loadData()
                notificationContext.show({
                    type: "success",
                    title: "Đã xóa loại phòng thành công !",
                    // duration: mặt định 4s,
                    description: `Loại ${dataDelete.cateloryRoom} đã được xóa !`
                })
            }
        } catch (err) {
            console.log(err);
        } finally {
            spinner.hidden()

        }

    }
    return (
        <>
            <BootstrapDialog
                // fullScreen
                open={open}
                onClose={cloesDelete}
                aria-labelledby="customized-dialog-tiAtle"
            >
                <DialogTitle>{`Bạn có muốn xóa loại phòng ${dataDelete.cateloryRoom} Không ?`}</DialogTitle>

                <DialogActions>
                    <Button
                        onClick={handleDeletes}
                        color="success"
                        variant="contained"
                        style={{ borderRadius: "10px", background: "rgba(255, 0, 0, 0.80)" }}
                    >
                        Xóa
                    </Button>
                    <Button
                        onClick={cloesDelete}
                        style={{ borderRadius: "10px", background: "#7C9D96" }}
                        variant="contained"
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};
export default DeleteModal;
