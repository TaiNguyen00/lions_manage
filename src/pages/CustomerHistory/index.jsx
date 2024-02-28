import clsx from 'clsx';
import styles from './customerHistory.module.scss';
import { useContext, useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import TableComponent from './table/index';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput, InputAdornment } from '@mui/material';
import { AppContext, AuthContext } from "~/context";
import { formatDates } from "~/utils/helpers";

const CustomerHistory = () => {
  const [data, setData] = useState([])
  const { api, spinner } = useContext(AppContext);
  const { authData, } = useContext(AuthContext);
  const loadData = async () => {
    try {
      const client = await api.clientApi.get({ id_yourProduct: authData?.user?.yourProduct });
      setData(client);


    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  // console.log(data);
  const columnsCustomer = [
    {
      id: '1',
      name: 'Tên khách hàng',
    },
    {
      id: '2',
      name: 'Giới tính',
    },
    {
      id: '3',
      name: 'Số điện thoại',
    },
    {
      id: '4',
      name: 'CCCD',
    },
    {
      id: '5',
      name: 'Ngày cấp',
    },
    {
      id: '6',
      name: 'Ngày hết hạn',
    },
    {
      id: '7',
      name: 'Quốc tịch',
    },
  ];

  //search
  const [search, setSearch] = useState('');
  return (
    <>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.aside)}>
          <div className={clsx(styles.content)}>
            <h2 className={clsx(styles.h2)}>
              <HomeIcon /> Thống kê và báo cáo
            </h2>

            <div className={clsx(styles.row)}>
              <Stack spacing={2} sx={{ width: 300 }}>
                <FormControl>
                  <FormLabel>
                    <h3>Lịch sử khách hàng</h3>
                  </FormLabel>
                  <OutlinedInput
                    variant='filled'
                    size='small'
                    placeholder='Tìm kiếm khách hàng'
                    onChange={(e) => setSearch(e.target.value)}
                    className={clsx(styles.input)}
                    startAdornment={
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Stack>
            </div>
            <TableComponent
              columns={columnsCustomer}
              data={data.filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(search);
              })}
              setData={setData}
              renderCell={(entity, column) => {
                console.log(entity);
                switch (column.id) {
                  case '1':
                    return entity.name;
                  case '2':
                    return entity.sex;
                  case '3':
                    return entity.phone;
                  case '4':
                    return entity.cccd;
                  case '5':
                    return formatDates(entity.dateRange);
                  case '6':
                    return formatDates(entity.dateExpiration);
                  case '7':
                    return entity.nationality;
                  default:
                    return '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerHistory;
