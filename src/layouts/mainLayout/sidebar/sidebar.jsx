import style from "./sidebar.module.scss";
import clsx from "clsx";
import {sidebarMenu} from "~/config/navigation";
import {NavLink, useLocation} from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useContext, useState} from "react";
import {AuthContext} from "~/context";
import {Button} from "@mui/material";

const Sidebar = () => {
  const location = useLocation();
  // const [selectedMenu, setSelectedMenu] = useState(null);
  // const [selecteditem, setSelecteditem] = useState(null);
  // Sử dụng một object để lưu trạng thái của mỗi mục menu
  const [menuStates, setMenuStates] = useState({});
  const {} = useContext(AuthContext);
  const toggleMenu = (menuId) => {
    setMenuStates((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  return (
    <div className={clsx(style.sidebar)}>
      <div className={clsx(style.sidebar_title)}>
        <NavLink to="/">Quản lý khách sạn</NavLink>
      </div>
      <ul className={clsx(style.sideBarMenu)}>
        {sidebarMenu.map((router) => (
          <li key={router.id}>
            <NavLink
              key={router.id}
              to={router.path}
              className={clsx(
                style.parentMenu,
                router.path === location.pathname && style.activeMenu // Kiểm tra đường dẫn hiện tại và cung cấp lớp CSS nếu khớp
              )}
              // activeClassName="active_link"
            >
              <div className={clsx(style.MenuFirst)}>
                <div className={clsx(style.Menutitle)}>
                  <span>{router.icon}</span>
                  {router.title}
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
                        // className={clsx(style.itemChild)}
                        // className={
                        //   item.id === selecteditem
                        //     ? clsx(style.activeitem)
                        //     : clsx(style.itemChild)
                        // }
                        // onClick={() => setSelecteditem(item.id)}
                      >
                        <li key={item.id} className={clsx(style.item_link)}>
                          <span>{item.icon}</span>
                          {item.title}
                        </li>
                      </NavLink>
                    ))}
                </ul>
              )}
            </NavLink>
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
  );
};

export default Sidebar;
