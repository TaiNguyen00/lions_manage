import { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import Room from '~/components/Room';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { DateTime, InputCustom, SelectInput, DateLocalTime } from '../FormLocal/Input';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from '@mui/material';
import style from './style.module.scss';
import { formatCurrencyVND } from '~/utils/helpers';
import EditIcon from '@mui/icons-material/Edit';
import { AppContext, AuthContext } from '~/context';
import { formatDateRoom, formatDate } from "~/utils/helpers";
import { ROOM_TYPES } from '~/utils/constants';


// for io
import io from "socket.io-client"
const socket = io.connect(import.meta.env.VITE_API_PRODUCTION)

const ModalFormRoom = (props) => {
  const { open, currentRoom, setOpen, product, loadData, setBill, setOpenBill } = props;

  const [btCheckout, setBtCheckout] = useState(true);
  const [disableForm, setDisableForm] = useState(true);
  const [time, setTime] = useState(0)
  const { api, spinner, messageContext } = useContext(AppContext);
  const { authData } = useContext(AuthContext);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      width: '90%', // Set your desired width here
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
      height: '70px',
    },
  }));
  // 
  const { handleSubmit, control, formState, reset, getValues } = useForm();
  // data form 
  const sexs = [{ value: 'Nam' }, { value: 'Nữ' }];
  const nationalities = [{ value: 'Vietnam' }, { value: 'USA' }, { value: 'Japan' },];
  // end data form

  // Open edit
  const handleOpenEdit = () => {
    setDisableForm(false);
  };



  useEffect(() => {
    if (currentRoom) {
      if (currentRoom?.condition == ROOM_TYPES.ROOM_EMPTY) {
        currentRoom.checkInDateTime = '',
          currentRoom.checkOutDateTime = '',
          currentRoom.dateRange = '',
          currentRoom.dateExpiration = ''
        setBtCheckout(false);
        setDisableForm(false);
      } else {
        setBtCheckout(true);
        setDisableForm(true);
      }
      reset(currentRoom);
    }
    if (currentRoom) {
      socket.emit("joinRoom", currentRoom._id)
      socket.on("roomStatusUpdated", (data) => {
        if (currentRoom._id === data._id) {
          reset(data)
        }
      })
    }
  }, [currentRoom]);

  // socket io



  const { isValid } = formState;
  const onSubmit = async (data) => {
    if (isValid) {
      const checkInDateTime = new Date(data.dateCheckin);
      const checkOutDateTime = new Date(data.dateCheckout);
      const checkDateRange = new Date(data.dateRange);
      const checkDateExpiration = new Date(data.dateExpiration);
      if (checkInDateTime > checkOutDateTime) {
        alert('Ngày trả phòng phải sau ngày nhận phòng');
      } else if (data.nationality == '') {
        alert('Phải chọn quốc tịch');
      } else if (checkDateRange > checkDateExpiration) {
        alert('Ngày cấp trước ngày hết hạn');
      } else if (data.sex === '') {
        alert('Phải chọn giới tính');
      } else if (data.phone.length < 8) {
        alert('Số điện thoại phải có ít nhất 8 ký tự');
      } else if (data.cccd.length < 8) {
        alert('CCCD phải có ít nhất 8 ký tự');
      }
      else {
        const intendTime = checkOutDateTime - checkInDateTime;
        const timeInDays = intendTime / (1000 * 60 * 60);
        setTime(timeInDays)
        const intenPrices = currentRoom?.catelory_room?.priceDay
        const intenHour = currentRoom?.catelory_room?.priceHour
        try {
          spinner.show()
          if (timeInDays > 5) {
            const time = Math.ceil(timeInDays / 24)
            const price = time * intenHour
            // await api.roomApi.updateStatusRoom({
            //   ...data,
            //   intendPrice: price,
            //   intendTime: time,
            //   condition: 'Phòng đang ở'
            // });
            await socket.emit("updateRoomStatusInfo", { ...data, intendPrice: price, intendTime: time, condition: 'Phòng đang ở', currentRoom: currentRoom._id })
            loadData()
            messageContext.show({
              type: "success",
              message: `Phòng ${currentRoom.roomcode} đã được cập nhật`
            })
            setBtCheckout(true);
            setDisableForm(true);
            setOpen(false)
          } else {
            const timeInDays = intendTime / (1000 * 60 * 60);
            const price = intenPrices * timeInDays
            // await api.roomApi.update({
            //   ...data,
            //   intendPrice: price,
            //   intendTime: timeInDays,
            //   condition: 'Phòng đang ở'
            // });
            await socket.emit("updateRoomStatusInfo", { ...data, intendPrice: price, intendTime: time, condition: 'Phòng đang ở' })
            loadData()
            messageContext.show({
              type: "success",
              message: `Phòng ${currentRoom.roomcode} đã được cập nhật`
            })
            setBtCheckout(true);
            setDisableForm(true);
            setOpen(false)
          }
        } catch (err) {
          console.log(err)
        } finally {
          spinner.hidden()
        }
      }
    } else {
      messageContext.show({
        type: "error",
        message: `Vui lòng nhập đủ thông tin khách hàng !`
      })
    }
  }

  const handleClose = () => {
    setOpen(false);
    setDisableForm(true)
  };
  // handle checkout
  const handleCheckout = async (data) => {
    await socket.emit("joinRoom", data)
    try {
      spinner.show()
      const client = await api.clientApi.get({ id_yourProduct: authData.user.yourProduct })
      const chungminh = (client.map(cl => cl.cccd))
      if (chungminh.includes(Number(data.cccd))) {
        messageContext.show({
          type: "error",
          message: `Người dùng đã tồn tại !`
        })
      } else {

        await api.clientApi.insert({
          id_yourProduct: product._id,
          room_code: data.roomcode,
          name: data.name,
          phone: data.phone,
          cccd: data.cccd,
          nationality: data.nationality,
          sex: data.sex,
          dateRange: data.dateRange,
          dateExpiration: data.dateExpiration
        })
      }

      // in hoá đơn
      const bills = await api.billApi.insert({
        id_yourProduct: product._id,
        room_code: data.roomcode,
        name: data.name,
        phone: data.phone,
        sex: data.sex,
        checkInDateTime: data.dateCheckin,
        checkOutDateTime: data.dateCheckout,
        intendPrice: data.intendPrice,
        intendTime: data.intendTime,
        priceRoom: data.catelory_room.priceDay,
        catelory_room: data.catelory_room.cateloryRoom
      })
      /// update room trả phòng thì sẽ clear lại bằng null
      const roomUpdateData = {
        _id: data._id,
        name: '',
        phone: '',
        cccd: '',
        sex: '',
        nationality: '',
        checkInDateTime: new Date(null),
        checkOutDateTime: new Date(null),
        intendPrice: '',
        intendTime: '',
        dateRange: null,
        dateExpiration: null
      };
      await socket.emit("updateRoomStatusInfo", { ...roomUpdateData, condition: 'Phòng trống', currentRoom: data._id })
      loadData()
      setBill(bills)
      setOpenBill(true)
      setOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      spinner.hidden()
    }
  };
  return (
    <BootstrapDialog
      aria-labelledby='customized-dialog-title'
      open={open}
      className={clsx(style.Boxx)}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        {disableForm ? `Trạng thái đặt phòng ` : ` Chỉnh sữa thông tin khách hàng `}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <div className={clsx(style.update_stastus)}>
            <h3>Trạng thái phòng</h3>
            <div className={clsx(style.update)}>
              <div className={clsx(style.stastus_room)}>
                {currentRoom && (
                  <Room roomData={getValues()} />
                )}
              </div>
            </div>
          </div>
          <div className={clsx(style.status_body)}>
            <h4>Điền thông tin đặt phòng</h4>

            {disableForm && (
              <h4 onClick={handleOpenEdit} className={clsx(style.edit_from)}>
                <EditIcon />
              </h4>
            )}

            <div className={clsx(style.formt)}>
              <div className={clsx(style.formt_rigister)}>
                <InputCustom
                  className={clsx(style.Input_CusTum)}
                  disabled={disableForm}
                  control={control}
                  required
                  name='name'
                  defaultValue=' '
                  label='Tên'
                  type='text'
                />

                <DateLocalTime
                  control={control}
                  disabled={disableForm}
                  required
                  name='dateCheckin'
                  defaultValue=''
                  label='Thời gian nhận phòng'
                  type='datetime-local'
                />
                <DateLocalTime
                  control={control}
                  disabled={disableForm}
                  required
                  name='dateCheckout'
                  defaultValue=''
                  label='Thời gian trả phòng'
                  type='datetime-local'
                />
                <InputCustom
                  control={control}
                  disabled={disableForm}
                  required
                  name='phone'
                  defaultValue=''
                  label='Số điện thoại'
                  type='Number'
                />

                <SelectInput
                  control={control}
                  disabled={disableForm}
                  required
                  name='sex'
                  defaultValue=''
                  label='Giới tính'
                  optionInput={sexs}
                />
              </div>

              <div className={clsx(style.formt_client)}>
                <InputCustom
                  control={control}
                  disabled={disableForm}
                  required
                  name='cccd'
                  defaultValue
                  label='Căn cước công dân'
                  type='Number'
                />
                <SelectInput
                  control={control}
                  disabled={disableForm}
                  required
                  name='nationality'
                  defaultValue
                  label='Quốc tịch'
                  optionInput={nationalities}
                />
                <DateTime
                  control={control}
                  disabled={disableForm}
                  required
                  name='dateRange'
                  defaultValue={new Date()}
                  label='Ngày cấp'
                />
                <DateTime
                  control={control}
                  disabled={disableForm}
                  required
                  name='dateExpiration'
                  defaultValue={new Date()}
                  label='Ngày hết hạn'
                />

              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className={clsx(style.Action)}>
            <div className={clsx(style.priceHouse)}>
              <h6>
                Thời gian dự kiến:<span>{time > 5
                  ? ` ${currentRoom?.intendTime || 0} ngày`
                  : ` ${currentRoom?.intendTime || 0} giờ`}</span>
              </h6>
              <h6>
                Tổng tiền dự kiến:<span> {formatCurrencyVND(currentRoom?.intendPrice || 0)}</span>
              </h6>
            </div>
            <div className={clsx(style.handle)}>
              {!disableForm ? (
                <div className={clsx(style.save)}>
                  <Button
                    className={clsx(style.button_save)}
                    type='submit'
                    size='small'
                    variant='contained'
                    color='success'
                  >
                    Lưu
                  </Button>
                  <Button
                    className={clsx(style.button_save)}
                    onClick={() => setDisableForm(true)}
                    size='small'
                    variant='contained'
                    color='success'
                  >
                    Hoàn tác
                  </Button>
                </div>
              ) : (
                <Button
                  size='small'
                  onClick={() => handleCheckout(currentRoom)}
                  disabled={!btCheckout}
                  className={clsx(style.button_printer)}
                  variant='contained'
                  color='success'
                >
                  Trả phòng
                </Button>
              )}
            </div>
          </div>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};
export default ModalFormRoom;
