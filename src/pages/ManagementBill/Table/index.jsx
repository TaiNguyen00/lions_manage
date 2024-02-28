// import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./style.module.scss";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import clsx from "clsx";
import BillModal from "../Modal/ModalBill";
import ModalDeletebill from "../Modal/ModalBill";
const TableComponentbill = (props) => {
  const { columns, data, renderCell } = props;
  const [openBill, setOpenBill] = useState(false);
  const [bill, setBill] = useState([]);
  const [opendelete, setOpendelete] = useState(false);

  const [page, pageChange] = useState(0);
  const [rowperpage, rowperpageChange] = useState(5);

  const seeBill = (billID) => {
    const bill = data.find((bills) => bills._id == billID);
    setBill(bill);
    setOpenBill(true);
  };
  const handleCloseBill = () => {
    setOpenBill(false);
  };

  const openPopupDelete = () => {
    setOpendelete(true);
  };
  const closePopupDelete = () => {
    setOpendelete(false);
  };

  // // Hàm đóng popup

  //handle Table
  const handleChangePage = (event, newpage) => {
    pageChange(newpage);
  };
  const handlePerPageChange = (event) => {
    rowperpageChange(+event.target.value);
    pageChange(0);
  };

  return (
    <>
      <div className={clsx(styles.container)}>
        <Paper className={clsx(styles.paper)}>
          <TableContainer
            className={clsx(styles.tableContainer)}
            style={{ border: "none" }}
          >
            <Table>
              <TableHead>
                <TableRow className={clsx(styles.tr)}>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        className={clsx(styles.TableCell)}
                      >
                        {column.name}
                      </TableCell>
                    );
                  })}
                  <TableCell className={clsx(styles.TableCell)}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center">
                        Chưa có dữ liệu hóa đơn
                      </TableCell>
                    </TableRow>
                  ) : (
                    data
                      .slice(page * rowperpage, page * rowperpage + rowperpage)
                      .map((entity) => {
                        return (
                          <TableRow key={entity._id} className={clsx(styles.tr)}>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                className={clsx(styles.TableCell)}
                              >
                                {renderCell(entity, column)}
                              </TableCell>
                            ))}

                            <TableCell className={clsx(styles.TableCell)}>
                              <>
                                <button
                                  key={entity.id}
                                  onClick={() => seeBill(entity._id)}
                                  className={clsx(styles.button)}
                                >
                                  <RemoveRedEyeIcon />
                                </button>
                              </>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 7, 9]}
            rowsPerPage={rowperpage}
            page={page}
            count={data.length}
            component="div"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handlePerPageChange}
          ></TablePagination>
        </Paper>
      </div>
      <BillModal
        open={openBill}
        handleCloseBill={handleCloseBill}
        bill={bill}
      />

      <ModalDeletebill
        open={opendelete}
        setOpendelete={setOpendelete}
        onClose={closePopupDelete}
      />
    </>
  );
};

TableComponentbill.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  renderCell: PropTypes.func.isRequired,
};

export default TableComponentbill;
