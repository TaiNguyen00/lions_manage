import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import style from './style.module.scss'
import { AppContext, AuthContext } from '~/context';



import clsx from 'clsx';
import { formatDateRoomShow } from '~/utils/helpers';
const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 700,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const handlePrint = () => {
    window.print();
    setOpenBill(false) // Kích hoạt chức năng in
};
const BillModal = (props) => {
    const { open, handleCloseBill, bill, product } = props
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseBill}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <div className={clsx(style.invoice, style.invoice_to_print)}>
                        <div className={clsx(style.header)}>
                            <h1>Hoá Đơn Khách Sạn</h1>
                        </div>
                        <div className={clsx(style.customer_info)}>
                            <p>{`Khách sạn ${product.name_product}`}</p>
                            <p>{`Địa chỉ: ${product.adress_product}`}</p>
                            <p>{`Số điện thoại: ${product.phone_product}`}</p>
                        </div>
                        <hr />
                        <div className={clsx(style.customer_infos)}>
                            <p>{`Tên khách hàng:${bill?.name}`} </p>
                            <p>{`Số điện thoại:${bill?.phone}`}</p>
                        </div>
                        <div className={clsx(style.invoice_details)}>
                            <h2>Chi tiết hoá đơn</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Mô tả</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                    <tr>
                                        <td>Giá phòng</td>
                                        <td> {VND.format(bill?.priceRoom)}</td>
                                    </tr>
                                    <tr>
                                        <td>Phòng</td>
                                        <td> {bill?.room_code}</td>
                                    </tr>
                                    <tr>
                                        <td>Loại phòng</td>
                                        <td> {bill?.catelory_room}</td>
                                    </tr>
                                    <tr>
                                        <td>Thời gian nhận phòng</td>
                                        <td>{formatDateRoomShow(bill?.checkInDateTime)}</td>
                                    </tr>
                                    <tr>
                                        <td>Thời gian trả phòng</td>
                                        <td>{formatDateRoomShow(bill?.checkOutDateTime)}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Tổng cộng</strong></td>
                                        <td><strong> {VND.format(bill?.intendPrice)}{" "}</strong></td>
                                    </tr></tbody>
                            </table>
                        </div>
                    </div>
                    <div className={clsx(style.button_print)}>
                        <Button onClick={handlePrint} variant="outlined">In hóa đơn</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
export default BillModal
