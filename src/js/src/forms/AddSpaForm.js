import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewSpa } from '../client';

const inputBottomMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const AddSpaForm = (props) => (
    <Formik
        initialValues={{ name: '', price: ''}}
        validate={values => {
            let errors = {};

            if (!values.name) {
                errors.name = 'Spa Name Required'
            }

            if (!values.price) {
                errors.price = 'Spa Price Required'
            }

            return errors;
        }}
        onSubmit={(spa, { setSubmitting }) => {
          addNewSpa(spa).then(() => {
                props.onSuccess();
            })
            .catch(err => {
                props.onFailure(err);
            })
            .finally(() => {
                setSubmitting(false);
            })
        }}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
    }) => (
        <form onSubmit={handleSubmit}>
            <Input
                style={inputBottomMargin}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
            />
            {errors.name && touched.name &&
                    <Tag style={tagStyle}>{errors.name}</Tag>}
            <Input
                style={inputBottomMargin}
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
            />
            {errors.price && touched.price &&
                <Tag style={tagStyle}>{errors.price}</Tag>}
            <Button 
                onClick={() => submitForm()} 
                type="submit" 
                disabled={isSubmitting | (touched && !isValid)}>
                Submit
            </Button>
        </form>
    )}
    </Formik>
);


export default AddSpaForm;