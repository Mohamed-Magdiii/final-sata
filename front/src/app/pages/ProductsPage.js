import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts , deleteProduct} from "../actions/products";
import PropTypes from 'prop-types'

const ProductsPage = ({getProducts,deleteProduct, products:{products}}) => {
useEffect(()=>{
      getProducts()
  },[getProducts])
  console.log(products);
  return (
  <> 
   <div className="card-body py-10 px-2">
  <div className="table">
    <table className="table table-hover align-middle gs-0 gy-4">
      <thead>
        <tr className="text-center border-3 fw-bolder text-muted bg-light">
          <th className="ps-4 min-w-100px">title</th>
          <th className="min-w-100px">Category</th>
          <th className="min-w-100px">Description</th>
          <th className="min-w-100px">price</th>
          <th className="min-w-100px">Size</th>
          <th className="min-w-100px">Color</th>
          <th className="min-w-100px">Store</th>
          <th className="min-w-100px">Actions</th>
        </tr>
      </thead>
      <tbody>
         {products && products.map((product ) => (
            <tr className="text-center border-3 m-auto" key={product._id}>
              <td className="border text-center">
              <img src={`http://localhost:4000/${product.image}`} className="rounded-circle w-30px" />
                 <span>{product.title_en}</span>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {product.categoryTitle}
                </div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">
                  {product.description}
                </div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{product.price}</div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{!product.size ? '--' : product.size}</div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{product.color}</div>
              </td>
              <td className="border text-center">
                <div className="d-flex flex-column">{!products.store ? '-' : product.store}</div>
              </td>
              <td className="border text-center">
               <span> <i key={product._id} className="far fa-trash-alt ml-auto text-danger" onClick={()=>deleteProduct(product._id)}/></span>
               <span> <i className="fas fa-edit ml-auto text-primary"/></span>
              </td>
            </tr>
          )
         )}
      </tbody>
    </table>
  </div>
</div>
</>);
};
ProductsPage.propTypes = {
    getProducts:PropTypes.func.isRequired,
    deleteProduct:PropTypes.func.isRequired,
    products : PropTypes.object.isRequired,
}
    
const mapStateToProps = state => ({
    products : state.products
})
export default connect(mapStateToProps , {getProducts,deleteProduct })(ProductsPage)