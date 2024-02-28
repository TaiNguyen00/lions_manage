import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

import clsx from "clsx";
import style from "./mainlayout.module.scss";
import InnerContent from "~/components/innerContent/innerContent";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className={clsx(style.MainLayout)}>
      <Sidebar className={clsx(style.Mainsibar)} />
      <div className={clsx(style.Main_content)}>
        <Header />
        <InnerContent>
          <Outlet />
        </InnerContent>
      </div>
    </div>
  );
};

export default MainLayout;
