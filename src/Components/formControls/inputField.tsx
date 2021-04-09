import React, { SetStateAction, Dispatch } from "react";
import { InputLabel, TextField } from "@material-ui/core";


interface Props {
    name: string,
    value: string | number | undefined,
    label: string,
    disabled: boolean
    onChange: Dispatch<SetStateAction<any>>
}

const InputField = ({name, value, label, disabled, onChange}: Props) => {
    return (
        <TextField
        disabled={disabled}
        label={label}
        placeholder={label}
        variant="outlined" 
        name={name}
        value={value}
        onChange={onChange}
        />
    )
}

export default InputField;