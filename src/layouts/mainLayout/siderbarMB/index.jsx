import style from "./style.module.scss";
import clsx from "clsx";
import { sidebarMenu } from "~/config/navigation";
import { NavLink, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "~/context";
import { Button } from "@mui/material";
const SidebarMB = ({ menusider, setMenusider }) => {
  const location = useLocation();
  // Sử dụng một object để lưu trạng thái của mỗi mục menu
  const [menuStates, setMenuStates] = useState({});
  const { handleLogOut } = useContext(AuthContext);
  // const [selectedMenu, setSelectedMenu] = useState(null);
  const toggleMenu = (menuId) => {
    setMenuStates((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  return (
    <>
      <div
        className={clsx(style.overlay)}
        onClick={() => setMenusider(!menusider)}
      ></div>
      <div className={clsx(style.sidebar)}>
        <div className={clsx(style.Close)}>
          <CloseIcon onClick={() => setMenusider(!menusider)} />
        </div>
        <div className={clsx(style.sidebar_title)}>
          <h2>Quản lý khách sạn</h2>
        </div>
        <ul className={clsx(style.sideBarMenu)}>
          {sidebarMenu.map((router) => (
            <li
              key={router.id}
              className={clsx(
                style.parentMenu,
                router.path === location.pathname && style.activeMenu // Kiểm tra đường dẫn hiện tại và cung cấp lớp CSS nếu khớp
              )}
            // className={
            //   router.id === selectedMenu
            //     ? clsx(style.activeMenu)
            //     : clsx(style.parentMenu)
            // }
            // onClick={() => setSelectedMenu(router.id)}
            >
              <div className={clsx(style.MenuFirst)}>
                <div>
                  <NavLink to={router.path}>
                    <span>{router.icon}</span>
                    {router.title}
                  </NavLink>
                </div>
                <div className={clsx(style.Dropdown)}>
                  {router.item && (
                    <KeyboardArrowDownIcon
                      onClick={() => toggleMenu(router.id)}
                      className={clsx(style.Icon)}
                    />
                  )}
                </div>
              </div>
              {menuStates[router.id] && (
                <ul className={clsx(style.childMenu)}>
                  {router.item &&
                    router.item.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        className={clsx(
                          style.itemChild,
                          item.path === location.pathname && style.activeitem // Kiểm tra đường dẫn hiện tại và cung cấp lớp CSS nếu khớp
                        )}
                      >
                        <li key={item.id} className={clsx(style.item_link)}>
                          <span>{item.icon}</span>
                          {item.title}
                        </li>
                      </NavLink>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div
          className={clsx(style.button_logout)}
          onClick={() => {
            handleLogOut();
          }}
        >
          <Button className={clsx(style.button)}>Đăng xuất</Button>
        </div>
      </div>
    </>
  );
};

export default SidebarMB;
