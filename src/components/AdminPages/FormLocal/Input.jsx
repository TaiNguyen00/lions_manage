import { Controller } from "react-hook-form";
import style from './style.module.scss'
import clsx from "clsx";
import { TextField } from "@mui/material";
import { formatDateRoom, formatDate } from "~/utils/helpers";

export const DateTime = (props) => {
    const {
        name,
        defaultValue,
        label,
        type,
        disabled,
        ...otherProps
    } = props
    return (
        <>
            <label className={clsx(style.label)} htmlFor={name}>{label}</label><br />
            <Controller
                name={name}
                control={props.control}
                defaultValue={defaultValue}
                render={({ field }) =>
                    <input
                        className={clsx(style.input)}
                        {...field}
                        disabled={disabled}
                        {...otherProps}
                        type='date'
                        value={formatDate(field.value)}
                    />}
            />
        </>

    )
};
export const DateLocalTime = (props) => {
    const {
        name,
        defaultValue = null,
        label,
        type,
        disabled,
        ...otherProps
    } = props
    return (
        <>
            <label className={clsx(style.label)} htmlFor={name}>{label}</label><br />
            <Controller
                name={name}
                control={props.control}
                defaultValue={defaultValue || ""}
                render={({ field }) =>
                    <input
                        className={clsx(style.input)}
                        {...field}
                        disabled={disabled}
                        {...otherProps}
                        type={type}
                        value={formatDateRoom(field.value || "")}
                    />}
            />
        </>

    )
};

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
            <label className={clsx(style.label)} htmlFor={name}>{label}</label><br />
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue || ""}
                disabled={disabled}
                render={({ field }) => (
                    <TextField
                        // label={label || name}
                        size={size}
                        type={type}
                        className={clsx(style.input)}
                        {...otherProps}
                        {...field}
                        value={field.value || ''}
                    />
                )}
            /><br />
        </>);
};

export const SelectInput = (props) => {
    const {
        label,
        optionInput,
        name,
        disabled,
        defaultValue = "",
    } = props

    return (
        <>
            <label className={clsx(style.label)} >{label}</label><br />
            <Controller
                name={name}
                control={props.control}
                defaultValue={defaultValue || ""}
                disabled={disabled}
                render={({ field }) => (
                    <select
                        className={clsx(style.input)}
                        {...field}>
                        <option value={''} style={{ display: 'none' }}>Chọn tuy chon</option >
                        {optionInput.map((option, index) => (
                            <option key={index} value={option.value} >{option.value || null}</option >
                        ))}

                    </select >
                )}
            />
        </>
    )
}



