import React, { Dispatch, SetStateAction } from "react";
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";

interface option {
    value: string | boolean,
    label: string
}

interface Props {
    name: string,
    value: string | boolean,
    label: string,
    options: option[]
    onChange: Dispatch<SetStateAction<any>>
}

const RadioGroupField = ({ name, value, label, options, onChange }: Props) => {
    console.log(options)
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup row={true}
                name={name}
                value={value.toString()}
                onChange={onChange} >
                {
                    options && options.map((option) => (
                        <FormControlLabel key={option.label} value={option.value} control={<Radio />} label={option.label} />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )

}

export default RadioGroupField;