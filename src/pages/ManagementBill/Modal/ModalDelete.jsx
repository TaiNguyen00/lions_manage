import React from "react";
import PropTypes from "prop-types";
import { Button, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import clsx from "clsx";
import DialogActions from "@mui/material/DialogActions";
import styles from "./styles.module.scss";


const ModalDeletebill = ({ open, setOpendelete, onClose }) => {
    const showAlert = () => {
        alert("Xóa thành công hóa đơn");
        onClose();
    };
    const handleClose = () => {
        setOpendelete(false);
    };
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                className={clsx(styles.Component)}
            >
                <DialogContent className={clsx(styles.formDelete)}>
                    <DialogTitle>Bạn có muốn xóa hóa đơn này không</DialogTitle>
                </DialogContent>
                <DialogActions className={clsx(styles.button)}>
                    <div className={clsx(styles.deleteBtn)}>
                        <button onClick={showAlert}>Xóa</button>
                    </div>
                    <div className={clsx(styles.closeBtn)}>
                        <button onClick={onClose}>Đóng</button>
                    </div>
                </DialogActions>
            </Dialog>
            {/* </BootstrapDialog> */}
        </>
    );
};

export default ModalDeletebill;
ModalDeletebill.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
