import clsx from "clsx";
import style from "./style.module.scss";
import {Link} from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const NameHotel = ({data, name, quatity, path, backgroundcolor}) => {
  // const backgrounpColor = (name) => {
  //   switch (name) {
  //     case "Tổng số tầng":
  //       return "#FFA500";
  //     case "Tổng loại phòng":
  //       return "#009306";
  //     case "Tổng nhân viên":
  //       return "#A200BC";
  //     case "Tổng phòng":
  //       return "#BC4400";
  //     case "Tổng khách hàng":
  //       return "#05746D";
  //     case "Tổng hóa đơn":
  //       return "#FC3E3E";
  //     default:
  //       return "";
  //   }
  // };
  const color = [
    "#FFA500",
    "#009306",
    "#A200BC",
    "#BC4400",
    "#05746D",
    "#fc3e3e",
  ];

  return (
    <div className={clsx(style.container)}>
      <div
        style={{backgroundColor: backgroundcolor}}
        className={clsx(style.managament)}
      >
        <div className={clsx(style.title)}>{name}</div>
        <div className={clsx(style.content)}>{quatity}</div>
        <div className={clsx(style.box)}>
          <Link to={path}>
            <span>quản lý</span> <ArrowCircleRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NameHotel;
