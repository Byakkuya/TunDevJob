import React from "react";
import { useField } from "formik";

interface FileInputFieldProps {
    label: string;
    name: string;
}

const FileInputField: React.FC<FileInputFieldProps> = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props.name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        helpers.setValue(files);

        // Additional logic or logging can be added here
        //@ts-ignore
        //console.log(files[0]);
    };

    return (
        <div>
            <label htmlFor={props.name}>{label}</label>
            <input
                type="file"
                {...props}
                id={props.name}
                onChange={handleChange}
            />
            {meta.touched && meta.error ? (
                <div style={{ color: "red" }}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default FileInputField;
