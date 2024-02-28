import React, { useContext, useState } from "react";
import clsx from "clsx";
import styles from "./login.module.scss";
import { useForm } from "react-hook-form";
import { AuthContext, AppContext } from "~/context";
const LoginReceptionist = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleLogin, handleLoginReception } = useContext(AuthContext)
  const { modal } = useContext(AppContext)
  const [userRole, setUserRole] = useState("khachSan"); // Chủ khách sạn là giá trị mặc định

  const validateUsername = (value) => {
    const specialCharactersRegex = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    if (specialCharactersRegex.test(value)) {
      return "Username không được chứa ký tự đặt biệt";
    }
    return true; // Validation passed
  };

  const onSubmit = (data) => {

    handleLogin(data)

  };
  const onSubmitReception = (data) => {
    handleLoginReception(data)

  };

  return (
    <div>
      <div className={clsx(styles.receptionist_form)}>
        <h2 className={clsx(styles.h2)}>Đăng nhập</h2>
        <p>Xin chào, vui lòng điền thông tin đăng nhập</p>
        <button
          className={clsx(styles.Role)}
          //           className={clsx(styles.Role)}
          onClick={() => setUserRole("khachSan")}
        >
          Chủ khách sạn
        </button>
        <button
          className={clsx(styles.Role)}
          onClick={() => {
            setUserRole("leTan");
          }}
        >
          Lễ tân
        </button>
        {userRole === "khachSan" && (
          <form
            className={clsx(styles.receptionist)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_control)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Tên đăng nhập"
                  {...register("username", {
                    required: "* Họ không được trống",
                    validate: validateUsername,
                  })}
                />
              </div>
              <div className={clsx(styles.receptionist_error)}>
                {errors.username && (
                  <span className={clsx(styles.error)}>
                    {errors.username.message}
                  </span>
                )}
              </div>
            </div>

            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_control)}>
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  {...register("password", {
                    required: "* Vui lòng điền mật khẩu",
                    minLength: {
                      value: 6,
                      message: "* Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                />
              </div>
              <div className={clsx(styles.receptionist_error)}>
                {errors.password && (
                  <span className={clsx(styles.error)}>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div className={clsx(styles.form_group)}>
              <button type="submit" className={clsx(styles.button)}>
                Đăng nhập chủ khách sạn
              </button>
            </div>
          </form>
        )}
        {userRole === "leTan" && (
          <form
            className={clsx(styles.receptionist)}
            onSubmit={handleSubmit(onSubmitReception)}
          >
            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_control)}>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Tên đăng nhập"
                  {...register("username", {
                    required: "* Họ không được trống",
                    validate: validateUsername,
                  })}
                />
              </div>
              <div className={clsx(styles.receptionist_error)}>
                {errors.Name && (
                  <span className={clsx(styles.error)}>
                    {errors.Name.message}
                  </span>
                )}
              </div>
            </div>

            <div className={clsx(styles.form_group)}>
              <div className={clsx(styles.form_control)}>
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  {...register("password", {
                    required: "* Vui lòng điền mật khẩu",
                    minLength: {
                      value: 6,
                      message: "* Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                />
              </div>
              <div className={clsx(styles.receptionist_error)}>
                {errors.password && (
                  <span className={clsx(styles.error)}>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>



            <div className={clsx(styles.form_group)}>
              <button type="submit" className={clsx(styles.button)}>
                Đăng nhập lể tân
              </button>
            </div>
          </form>
        )}
      </div>
      <div>{/* Đây là ví dụ về cách thay đổi vai trò người dùng */}</div>
    </div>
  );
};

export default LoginReceptionist;
