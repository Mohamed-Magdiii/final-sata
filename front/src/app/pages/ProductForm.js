import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addProduct, getCategory } from '../actions/products'
import { Input, Select } from "../../_metronic/_partials/controls"; //_metronic/_partials/controls
import {  Field ,Formik } from "formik";
import { useEffect } from 'react';

const ProductForm = ({addProduct ,getCategory, products:{categories} }) => {
  useEffect(()=>{
    getCategory()
  },[getCategory])
  const [formData, setFormData] = useState({
    title_en: "",
    categoryId: "",
    price: "",
    description: "",
  })
const{title_en,categoryId,price,description}= formData
  const onChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const onSubmit= (e)=>{
    e.preventDefault()
    addProduct(formData)
  }
  
    return (
        <div>
          <Formik
      
      >
        <form
              className="form form-label-right"
              onSubmit={(e) => onSubmit(e)}
            >
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="title_en"
                    component={Input}
                    placeholder="Title"
                    label="Title"
                    onChange={(e) => onChange(e)}
                    value={title_en}
                  />
                </div>
                <div className="col-lg-4">
                  <Select
                    name="categoryId"
                    label="Category"
                    value={categoryId}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  ><option value="0" >
                        Choose Your Category
                      </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Field
                    type="number"
                    name="price"
                    component={Input}
                    value={price}
                    placeholder="Price"
                    label="Price ($)"
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <Field
                  name="description"
                  as="textarea"
                  value={description}
                  component={Input}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >Sumbit</button>
            </form>
            </Formik>
        </div>
    )
}

ProductForm.propTypes = {
addProduct:PropTypes.func.isRequired,
getCategory:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
  products : state.products
})

export default connect(mapStateToProps, {addProduct , getCategory})(ProductForm)
