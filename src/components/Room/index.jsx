import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./room.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDateRoomShow } from "../../utils/helpers";

import io from "socket.io-client"
const socket = io.connect(import.meta.env.VITE_API_PRODUCTION)
const RoomInfo = (props) => {
  const { style, isEdit, roomData, onClick = () => { }, handleDelete = () => { }, handleEdit = () => { }, loadData } = props
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    socket.emit("joinRoom", roomData._id)
    socket.on("roomStatusUpdated", (data) => {
      if (roomData._id === data._id) {
        loadData()
      }
    })
  }, [])

  const colorRoomNumber = () => {
    switch (roomData.condition) {
      case 'Phòng trống':
        return '#009306';
      case 'Phòng đang ở':
        return '#FF0000';
      default:
        return '';
    }
  };

  const colorRoomStatus = () => {
    switch (roomData.condition) {
      case "Phòng trống":
        return "#CCE9CD";
      case "Phòng đang ở":
        return "#FFE6E6";
      default:
        return {};
    }
  };
  return (
    <>
      <div className={clsx(styles.room)} key={roomData._id} style={style} onClick={onClick}>
        {isEdit ? (
          <>
            <div className={clsx(styles.room_number)}>
              <h2>{roomData?.roomcode}</h2>

            </div>
            <div style={{ borderLeft: '1px solid #D9D9D9' }} className={clsx(styles.room_status)}>

              <>
                {roomData.catelory_room ? (
                  <React.Fragment >
                    <p style={{ fontSize: '14px' }}>
                      <span style={{ fontSize: '14px' }}>
                        <b>Loại phòng: {roomData?.catelory_room?.cateloryRoom}</b>
                      </span>
                    </p>
                    <p style={{ fontSize: '14px' }}>
                      {VND.format(roomData?.catelory_room?.priceDay)}{' '}
                      <span style={{ fontSize: '14px' }}>
                        / Giờ
                      </span>
                    </p>
                    <p style={{ fontSize: '14px' }}>
                      {VND.format(roomData?.catelory_room?.priceHour)}{' '}
                      <span style={{ fontSize: '14px' }}>
                        / Ngày
                      </span>
                    </p>
                  </React.Fragment>
                ) : null}
                <div className={clsx(styles.room_edit)}>
                  <button onClick={handleEdit}>
                    <EditIcon className={clsx(styles.button)} />
                  </button>
                  <button>
                    <DeleteIcon onClick={handleDelete} className={clsx(styles.button)} />
                  </button>
                </div>
              </>
            </div>
          </>
        ) : (
          <>
            <div style={{ backgroundColor: colorRoomNumber() }} className={clsx(styles.room_number)}>
              <h2 style={{ color: '#ffffff' }}>{roomData?.roomcode}</h2>
            </div>
            <div style={{ backgroundColor: colorRoomStatus() }} className={clsx(styles.room_status)}>
              <>
                {roomData.name ? (
                  < >
                    <div className={clsx(styles.room_client)}>
                      <h2 style={{ color: colorRoomNumber() }}>{roomData?.name} </h2>
                    </div>
                    <div style={{ color: colorRoomNumber() }} className={clsx(styles.room_date)}>
                      <p>{formatDateRoomShow(roomData?.dateCheckin)}</p>
                      <p>{formatDateRoomShow(roomData?.dateCheckout)}</p>
                    </div>
                  </>

                ) : (
                  <div className={clsx(styles.room_client)}>
                    <h2 style={{ color: colorRoomNumber() }}>{roomData.condition}</h2>
                    <React.Fragment>
                      <p style={{ color: colorRoomNumber(), fontSize: '14px' }}>
                        <span style={{ color: colorRoomNumber(), fontSize: '14px' }}>
                          Loại phòng: {roomData?.catelory_room?.cateloryRoom}
                        </span>
                      </p>
                    </React.Fragment>

                  </div>
                )}

                <React.Fragment >
                  <p style={{ color: colorRoomNumber(), fontSize: '14px' }}>
                    {VND.format(roomData?.catelory_room?.priceDay)}{' '}
                    <span style={{ color: colorRoomNumber(), fontSize: '14px' }}>
                      / Giờ
                    </span>
                  </p>
                  <p style={{ color: colorRoomNumber(), fontSize: '14px' }}>
                    {VND.format(roomData?.catelory_room?.priceHour)}{' '}
                    <span style={{ color: colorRoomNumber(), fontSize: '14px' }}>
                      / Ngày
                    </span>
                  </p>
                </React.Fragment>
              </>
            </div>
          </>
        )}
        {roomData.catelory_room &&
          Array.isArray(roomData.catelory_room) &&
          roomData.catelory_room.length > 0
          ? roomData.catelory_room.map((catelory) => (
            <React.Fragment key={catelory._id}>
              <p style={{ color: colorRoomNumber(), fontSize: "14px" }}>
                {VND.format(catelory.priceDay)}{" "}
                <span
                  style={{ color: colorRoomNumber(), fontSize: "14px" }}
                >
                  / Giờ
                </span>
              </p>
            </React.Fragment>
          ))
          : null}
      </div >
    </>
  );
};

export default RoomInfo;


