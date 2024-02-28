/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { AppContext } from "~/context";

export const AuthContext = createContext({});

//
export const AuthProvider = ({ children }) => {
  const { api, spinner, modal } = useContext(AppContext);
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // const [authData, setauthData] = useState(
  //   JSON.parse(localStorage.getItem("reception"))
  // );

  if (authData) {
    Cookies.set("access_token", authData?.access_token);
  }

  // if (authData) {
  //   Cookies.set("access_token_reception", authData?.access_token);
  // }

  const handleLogin = async (data) => {
    try {
      spinner.show()
      const user = await api.userApi.loginOwner(data);
      setAuthData(user);
      localStorage.setItem("user", JSON.stringify(user));
      spinner.hidden()
      modal.show({
        type: 'success',
        title: 'Đăng nhập thành công',
        contents: ['Vui lòng xác nhận để chuyển sang trang quản lý',],
        onClose: () => { navigate('/') }
      })
    } catch (err) {
      if (err?.request?.status == 401) {
        modal.show({
          type: 'error',
          title: 'Không có quyền truy cập vào trang này',
          contents: [err.response.data.message]
        })
      } else {
        modal.show({
          type: 'error',
          title: 'Đăng nhập thất bại',
          contents: ['Vui lòng kiểm tra lại bạn đã điền đầy đủ thông tin chúng tôi đã yêu cầu chưa ']
        })
      }
    } finally {
      spinner.hidden()
    }
  };
  // loginUser
  const handleLoginReception = async (data) => {
    try {
      spinner.show();
      const userReception = await api.userApi.loginReception(data)
      setAuthData(userReception)
      localStorage.setItem("user", JSON.stringify(userReception));
      spinner.hidden()
      modal.show({
        type: 'success',
        title: 'Đăng nhập thành công',
        contents: ['Vui lòng xác nhận để chuyển sang trang quản lý',],
        onClose: () => { navigate('/') }
      })
    } catch (err) {
      if (err?.request?.status == 401) {
        modal.show({
          type: 'error',
          title: 'Không có quyền truy cập vào trang này',
          contents: [err.response.data.message]
        })
      } else {
        modal.show({
          type: 'error',
          title: 'Đăng nhập thất bại',
          contents: ['Vui lòng kiểm tra lại bạn đã điền đầy đủ thông tin chúng tôi đã yêu cầu chưa ']
        })
      }
    } finally {
      spinner.hidden()
    }

  }

  const handleLogOut = async () => {
    try {
      setAuthData(null);
      localStorage.removeItem("user");
      Cookies.remove("access_token");
      modal.show({
        type: 'success',
        title: 'Đăng xuất thành công',
        contents: ['Vui lòng xác nhận để di chuyển về lại trang đăng nhập của chúng tôi'],
        onClose: () => { navigate('/login') }
      })
    } catch (err) {
      modal.show({
        type: 'error',
        title: 'Đăng xuất thất bại vui lòng thử lại',
      })
    }
  };

  useEffect(() => {
    if (!authData) {
      navigate('/login')
    }

  }, [authData])
  return (
    <AuthContext.Provider
      value={{ authData, handleLogOut, handleLogin, handleLoginReception }}
    >
      {children}
    </AuthContext.Provider>
  );
};
