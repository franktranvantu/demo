import React,  {Component} from 'react';
import { Formik } from 'formik';
import { Input, Tag, Button } from 'antd';

const EditSpaForm = props => {
  const { submitter, initialValues } = props;

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        let errors = {};
        if (!values.name) {
          errors.name = 'Spa name required';
        }
        if (!values.price) {
          errors.lastName = 'Spa price required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        submitter(values);
        setSubmitting(false);
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          isValid,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitForm
        }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={{marginBottom: '5px'}}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.name}</Tag>}

          <Input
            style={{marginBottom: '5px'}}
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
          />
          {errors.price && touched.price && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.price}</Tag>}

          <Button onClick = {() => submitForm()} type="submit" disabled={isSubmitting | (touched && !isValid) }>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default EditSpaForm;