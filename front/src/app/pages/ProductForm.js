/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct, getCategory } from "../actions/products";
import { Input, Select } from "../../_metronic/_partials/controls"; //_metronic/_partials/controls
import { Field, Formik } from "formik";
import { useEffect } from "react";

const ProductForm = ({ addProduct, getCategory, products: { categories } }) => {
  useEffect(() => {
    getCategory();
  }, [getCategory]);
  const [image ,setImage]= useState("")
  const [color , setColor] = useState([])
  const [formData, setFormData] = useState({
    title_en: "",
    categoryId: "",
    price: "",
    description: "",
    size: "",
    sale: "",
    stock:""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    title_en,
    categoryId,
    price,
    description,
    size,
    stock,
    sale, 
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  };
  const newFormData = new FormData()
  newFormData.append('title_en', formData.title_en)
  newFormData.append('categoryId', formData.categoryId)
  newFormData.append('price', formData.price)
  newFormData.append('description', formData.description)
  newFormData.append('size', formData.size)
  newFormData.append('color', color)
  newFormData.append('sale', formData.sale)
  newFormData.append('stock', formData.stock)
  newFormData.append('image', image) 
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(newFormData);
    addProduct(newFormData)
    setFormData({
      title_en: "",
      categoryId: "",
      price: "",
      description: "",
      size: "",
      stock: "",
      sale: "",
      onsale: "",
    });
    setImage("")
  };
  return (
    <div>
      <Formik>
        <form className="form form-label-right" encType="multipart/form-data" onSubmit={(e) => onSubmit(e)} >
          <div className="form-group row">
            <div className="col-lg-12">
              <Field
                name="title_en"
                component={Input}
                placeholder="Title"
                label="Title"
                onChange={(e) => onChange(e)}
                value={title_en}
                className="form-control"
              />
            </div>
            </div>
            <div className="form-group row">
            <div className="col-lg-12">
              <Select
                name="categoryId"
                label="Category"
                value={categoryId}
                onChange={(e) => {
                  onChange(e);
                }}
              >
                <option value="0">Choose Your Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}

              </Select>
            </div>
            </div>
            {/* Choose Image */}
            <div className="form-group row">
            <div className="col-lg-3">
              <label className="form-label" >
                <span>Choose Product Image   .</span>
                </label>
                <div className="btn btn-bg-dark">
             <input type="file" onChange={(e)=>setImage(e.target.files[0])} name="image"/>
                </div>
              
            </div>
          </div>
          <div className="form-group row">
          <div className="col-lg-12">
              <Field
                name="stock"
                component={Input}
                placeholder="Stock"
                label="stock"
                onChange={(e) => onChange(e)}
                value={stock}
                className="form-control"
              />
            </div>
            </div>
            <div className="form-group row">
            <div className="col-lg-12">
              <Field
                type="number"
                name="price"
                component={Input}
                value={price}
                placeholder="Price"
                label="Price ($)"
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <Field
              name="description"
              as="textarea"
              label="Description"
              value={description}
              component={Input}
              className="form-control"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light text-dark"
            >
              More Options
            </button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select
                    name="size"
                    label="Select Size"
                    value={size}
                    onChange={(e) => onChange(e)}
                    
                  >
                    <option value="0">* Select Size</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                    <option value="x-large">x-large</option>
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Field
                    name="sale"
                    component={Input}
                    placeholder="sale"
                    label="sale"
                    onChange={(e) => onChange(e)}
                    value={sale}
                    className="form-control"
                    />
                </div>
                <div className="col-lg-4">
                  <label >Select Color</label>
                <select
                  className="form-control form-control-solid is-valid-select"
                  name="color"
                  multiple
                  onChange={(e)  => setColor([...e.target.selectedOptions].map(o =>(o.value)))}
                >
                  <option value="Red">Red</option>
                  <option value="CadetBlue">CadetBlue</option>
                  <option value="Eagle">Eagle</option>
                  <option value="Gold">Gold</option>
                  <option value="LightSlateGrey">LightSlateGrey</option>
                  <option value="RoyalBlue">RoyalBlue</option>
                  <option value="Crimson">Crimson</option>
                  <option value="Blue">Blue</option>
                  <option value="Sienna">Sienna</option>
                  <option value="Indigo">Indigo</option>
                  <option value="Green">Green</option>
                  <option value="Violet">Violet</option>
                  <option value="GoldenRod">GoldenRod</option>
                  <option value="OrangeRed">OrangeRed</option>
                  <option value="Khaki">Khaki</option>
                  <option value="Teal">Teal</option>
                  <option value="Purple">Purple</option>
                  <option value="Orange">Orange</option>
                  <option value="Pink">Pink</option>
                  <option value="Black">Black</option>
                  <option value="DarkTurquoise">DarkTurquoise</option>
                </select>
              </div>
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Sumbit
          </button>
        </form>
      </Formik>
    </div>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, { addProduct, getCategory })(
  ProductForm
);
