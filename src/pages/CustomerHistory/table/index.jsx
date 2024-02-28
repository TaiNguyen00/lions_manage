import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./style.module.scss";
import {
  Checkbox,
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
import {useState} from "react";
import clsx from "clsx";

const TableComponent = ({
  columns,
  data,
  setData,
  renderCell,
  showCheckbox,
  showAction,
  index,
}) => {
  const handleChangePage = (event, newpage) => {
    pageChange(newpage);
  };
  console.log(data);
  const handlePerPageChange = (event) => {
    rowperpageChange(+event.target.value);
    pageChange(0);
  };
  const [page, pageChange] = useState(0);
  const [rowperpage, rowperpageChange] = useState(5);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    const updatedData = data.map((entity) => ({
      ...entity,
      selected: !selectAll,
    }));
    setData(updatedData);
    setSelectAll(!selectAll);
  };

  const handleRowClick = (id) => {
    const updatedData = data.map((entity) => {
      if (entity.id === id) {
        return {...entity, selected: !entity.selected};
      }
      return entity;
    });
    setData(updatedData);
  };

  return (
    <>
      <div className={clsx(styles.container)}>
        <Paper className={clsx(styles.paper)}>
          <TableContainer className={clsx(styles.tableContainer)}>
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
                  {showAction && (
                    <TableCell className={clsx(styles.TableCell)}>
                      Hành động
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Chưa có dữ liệu khách hàng
                    </TableCell>
                  </TableRow>
                ) : (
                  data
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((entity, dataIndex) => {
                      return (
                        <TableRow key={entity.id} className={clsx(styles.tr)}>
                          {showCheckbox && (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={entity.selected}
                                onChange={() => handleRowClick(entity.id)}
                              />
                            </TableCell>
                          )}

                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              className={clsx(styles.TableCell)}
                            >
                              {renderCell(
                                entity,
                                column,
                                index !== undefined ? index : dataIndex
                              )}
                            </TableCell>
                          ))}
                          {showAction && (
                            <TableCell className={clsx(styles.TableCell)}>
                              <button className={clsx(styles.button)}>
                                <EditIcon />
                              </button>

                              <button className={clsx(styles.button)}>
                                <DeleteIcon />
                              </button>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                )}
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
    </>
  );
};

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  renderCell: PropTypes.func.isRequired,
  showCheckbox: PropTypes.bool.isRequired,
  showAction: PropTypes.bool.isRequired,
  index: PropTypes.array.isRequired,
};

export default TableComponent;
