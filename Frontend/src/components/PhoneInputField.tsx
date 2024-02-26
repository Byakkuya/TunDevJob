import React from "react";
import { useField } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// @ts-ignore
const PhoneInputField = ({ label, country, ...props }) => {
    const [field, meta, helpers] = useField(props.name);

    const handleChange = (value:any, country:any, e:any, formattedValue:any) => {
        helpers.setValue(value);
    };

    return (
        <div>
            <label htmlFor={props.name}>{label}</label>
            <PhoneInput
                {...field}
                {...props}
                country={country} // Set the default country here
                value={field.value}
                onChange={handleChange}
                inputStyle={{ color: "black" }}
                inputProps={{
                    name: props.name,
                    id: props.name,
                }}
            />
            {meta.touched && meta.error ? (
                <div style={{ color: "red" }}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default PhoneInputField;
