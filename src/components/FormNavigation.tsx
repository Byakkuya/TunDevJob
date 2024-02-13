import React from 'react';
import {Button} from "@material-ui/core";
import {FormikValues} from "formik";


interface Props {
    hasPrevious: boolean;
    onBackClick: (values: FormikValues) => void;
    isLastStep: boolean;
}
const FormNavigation = (props : Props) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 50

        }}>
            {props.hasPrevious && ( <Button variant="contained" type="button" onClick={props.onBackClick}>
                Back
            </Button>
            )}

            <Button type="submit" color="primary" variant="contained">{props.isLastStep ? 'Submit': 'Next'}</Button>
        </div>
    );
};

export default FormNavigation;