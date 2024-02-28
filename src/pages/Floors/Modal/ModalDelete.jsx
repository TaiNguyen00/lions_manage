import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    styled,
} from "@mui/material";
import { AppContext, AuthContext } from "~/context";
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
    const { authData } = useContext(AuthContext)
    const handleDeletes = async () => {
        const rooms = await api.roomApi.get({ id_yourProduct: authData.user.yourProduct })
        const roomss = rooms.map(r => r.floor_id)
        try {
            spinner.show()
            if (roomss.includes(dataDelete._id)) {
                notificationContext.show({
                    type: "error",
                    title: "Không thể xóa tầng, phòng đang tồn tại !",
                    // duration: mặt định 4s,
                    description: `Tầng ${dataDelete.floor} không thể xóa !`
                })
            } else {
                await api.floorApi.delete({ _id: dataDelete._id });
                cloesDelete()
                loadData()
                notificationContext.show({
                    type: "success",
                    title: "Đã xóa tầng thành công !",
                    // duration: mặt định 4s,
                    description: `Tầng ${dataDelete.floor} đã được xóa !`
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
                <DialogTitle>{`Bạn có muốn xóa tầng ${dataDelete.floor} Không ?`}</DialogTitle>

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
