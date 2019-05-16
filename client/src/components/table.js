import React, { Component } from 'react';
import '../App.css';
import { getProducts as getProductsAction } from '../redux/Products/actions/getActions';
import { connect } from 'react-redux';
import { getData as getDataAction } from '../redux/Products/actions/handleActions';
import { deleteProduct as deleteProductAction } from '../redux/Products/actions/deleteActions';

class ProductsTable extends Component{

  
  componentDidMount(){
    const { getProducts } = this.props;
    getProducts();
  }
    
  render(){
    const{
      products,
      className,
      editValue,
      deleteValue,
      getData,
      deleteProduct
    } = this.props;
    return(
      <div>
        <table className="productTable">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Options</th>
            </tr>
          </tbody>
          {
            products.map(item => (
              <tbody key={item.id}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td className={className}>
                    <input type="button" className='buttonTable edit' value={editValue} 
                    onClick={() => getData(item.id)} 
                    /> 
                    <input type="button" className='buttonTable delete'
                    value={deleteValue}
                    onClick={() => deleteProduct(item.id,item.name)}
                    />
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

// const mapDispatchToProps = dispatch => ({

// })

export default connect (
  mapStateToProps,
  { getProducts: getProductsAction,
    getData: getDataAction,
    deleteProduct: deleteProductAction
})(ProductsTable);