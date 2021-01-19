import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';

const inputBottomMargin = {marginBottom: '10px'};

const FilterSpaForm = (props) => {
  const {submitter} = props;
  return (
    <Formik
      initialValues={{name: '', price: ''}}
      onSubmit={(spa, {setSubmitting}) => {
        submitter(spa);
      }}>
      {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          submitForm
        }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={inputBottomMargin}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder='Spa name'
          />
          <Input
            style={inputBottomMargin}
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
            placeholder='Spa price'
          />
          <Button
            onClick={() => submitForm()}
            type="submit" >
            Search
          </Button>
        </form>
      )}
    </Formik>
  )
};


export default FilterSpaForm;