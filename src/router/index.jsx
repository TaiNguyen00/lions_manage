import React from "react";

import { Routes, Route } from "react-router";

import routers from "~/config/routers";

const Router = () => (
  <React.Suspense>
    <Routes>
      {routers.map((route) => {
        if (route.childPath) {
          const ParentComponent = route.component;
          return <Route path={route.path} element={<ParentComponent />} key={route.id}>
            {route.childPath.map((childRoute) => {
              const ChildComponent = childRoute.childComponent
              return <Route path={childRoute.path} element={<ChildComponent />} key={childRoute.id} />
            })}
          </Route>;
        }
        const Page = route.component;
        return <Route key={route.id} path={route.path} element={<Page />} />
      })}
    </Routes>
  </React.Suspense>
);

export default Router;
