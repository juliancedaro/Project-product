import React, { Component } from 'react';
import '../App.css';
import { getProducts } from '../api';

export default class ProductsTable extends Component{
  
  componentDidMount(){
    this.getProducts();
  }
  
  getProducts = () => {
    const { updateState } = this.props;
    getProducts()
      .then(response => response.json())
      .then(jsonResponse => {
        updateState({ products: JSON.parse(jsonResponse.products) })
      })
      .catch(error => {
          console.log(error);
      });
  }

  getData = (id) => {
    const {state, updateState } = this.props;
    console.log(id);
    const { products } = state;
    const product = products.find(product => 
      product.id === id
    );
    // console.log(product);
    updateState({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    })
  }
  
  render(){
    const{
      className,
      editValue,
      deleteValue,
      state,
    } = this.props;

    const { products } = state;
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
                    onClick={() => this.getData(item.id)} /> 
                    <input type="button" className='buttonTable delete'
                    value={deleteValue} onClick={() => this.getData(item.id)}/>
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