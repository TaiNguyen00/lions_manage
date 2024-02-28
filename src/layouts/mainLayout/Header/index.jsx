import style from "./header.module.scss";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMB from "../siderbarMB";
import { useState, useContext, useEffect } from "react";
import { Button } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { AppContext, AuthContext } from "~/context";

const Header = () => {
  const [yourproduct, setYourProduct] = useState({});
  const { authData, handleLogOut } = useContext(AuthContext);
  const { api, spinner } = useContext(AppContext);
  const [menusider, setMenusider] = useState(false);
  const [toggle, setToggle] = useState({});
  const handletoggle = (typeId) => {
    setToggle((prevState) => ({
      ...prevState,
      [typeId]: !prevState[typeId],
    }));
  };
  // console.log(authData.staff.packageID.quantity_staff);
  const loadData = async () => {
    const datayourproduct = await api.productApi.get({
      _id: authData?.user?.yourProduct,
    });
    setYourProduct(datayourproduct);

  };
  // console.log("data", authData.user.package.name_package);

  useEffect(() => {
    loadData();
  }, []);

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });
  const tooltip = () => {
    // const user = [
    //   {
    //     id: 1,
    //     number_floors: 4,
    //     type_room: 3,
    //     number_room: 4,
    //     number_staff: 3,
    //   },
    // ];
    return (
      <div className={clsx(style.childtype)}>
        <div className={clsx(style.childitem)}>
          <p className={clsx(style.title)}> Gói quản lí</p>
          <p>
            <b>Nhân viên </b>
            {authData && (authData?.user?.package?.quantity_staff)}
          </p>
          <p>
            <b>Phòng</b>
            {authData && (authData?.user?.package?.quantity_room)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(style.container)}>
      <div className={clsx(style.menuicon)}>
        <MenuIcon onClick={() => setMenusider(!menusider)} />
        {menusider && (
          <SidebarMB
            menusider={menusider}
            setMenusider={setMenusider}
            className={clsx(style.MainsibarMB)}
          />
        )}
      </div>

      <div className={clsx(style.header)}>
        <div className={clsx(style.row)}>
          <div className={clsx(style.col)}>
            <h2 className={clsx(style.title)}> {yourproduct?.name_product}</h2>
            <div className={clsx(style.item)}>
              <span className={clsx(style.item_title)}>
                LH: {yourproduct?.phone_product}
              </span>
              <span className={clsx(style.item_title)}>
                ĐC: {yourproduct?.adress_product}
              </span>
              <span className={clsx(style.item_title)}>
                Chức vụ: {authData?.user.role === "owner" ? "Chủ khách sạn" : "Nhân viên"}
              </span>
              <span className={clsx(style.item_title)}>
                Mã khách sạn: {yourproduct?.codeProduct}
              </span>
            </div>
          </div>
        </div>
        <div className={clsx(style.type)}>
          <CustomWidthTooltip title={tooltip()}>
            <Button
              className={clsx(style.type_title)}
              onClick={() => handletoggle()}
            >
              {authData && authData?.user?.package?.name_package}
            </Button>
          </CustomWidthTooltip>
        </div>{" "}
      </div>
    </div>
  );
};

export default Header;
