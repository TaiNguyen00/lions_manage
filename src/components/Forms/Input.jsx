import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import "./style.scss";
const InputCustom = (props) => {
  const {
    name,
    label,
    control,
    size = "small",
    className = "",
    defaultValue = "",
    rules,
    disabled = false,
    ...otherProps
  } = props;
  //field: { onChange, onBlur, value, ref }
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          disabled={disabled}
          helperText={error ? error.message : null}
          error={!!error}
          label={label || name}
          size={size}
          className={`m-1 ${className}`}
          {...otherProps}
          {...field}
        />
      )}
    />
  );
};

export default InputCustom;
