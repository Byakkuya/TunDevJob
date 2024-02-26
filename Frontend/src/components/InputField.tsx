import React from 'react';
import {TextField} from "@material-ui/core";
import {FieldConfig, useField} from "formik";

interface Props extends FieldConfig {
    label: string;

}

const InputField = ({label, ...props}: Props) => {
    // @ts-ignore
    const [field, meta] = useField(props);

    return (
        <TextField
            fullWidth
            label={label}
            {...field}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
        />
    );
};

export default InputField;