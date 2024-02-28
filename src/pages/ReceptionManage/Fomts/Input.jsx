import { Controller } from "react-hook-form";
import style from "./style.module.scss";
import clsx from "clsx";
import { TextField } from "@mui/material";

export const InputCustom = (props) => {
  const {
    name,
    label,
    control,
    size = "small",
    className = "",
    type,
    disabled,
    defaultValue = "",
    ...otherProps
  } = props;
  return (
    <>
      <label className={clsx(style.label)} htmlFor={name}>
        {label}
      </label>
      <br />
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        render={({ field }) => (
          <TextField
            // label={label || name}
            size={size}
            type={type}
            className={clsx(style.input)}
            {...otherProps}
            {...field}
          />
        )}
      />
      <br />
    </>
  );
};

export const SelectInput = (props) => {
  const { label, optionInput, name, disabled, defaultValue } = props;

  return (
    <>
      <label className={clsx(style.label)}>{label}</label>
      <br />
      <Controller
        name={name}
        control={props.control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <select disabled={disabled} className={clsx(style.input)} {...field}>
            <option value={""} style={{ display: "none" }}>
              Chọn tuy chon
            </option>
            {optionInput.map((option, index) => (
              <option key={index} value={option.value || option._id}>
                {option.title_foor || null}
                {option.floor || null}
                {option.title_second || null}
                {option.cateloryRoom || null}
              </option>
            ))}
          </select>
        )}
      />
    </>
  );
};
