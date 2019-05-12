import React, { Component } from 'react';
import '../App.css';

export default class ProductsTable extends Component{
  
  render(){
    const{
      products,
      className,
      editValue,
      deleteValue,
      getDataFunction,
      // type
    } = this.props;
    // Vale la pena pasar el value como prop o lo asigno directo en este componente?
    // Lo mismo con el className
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
                      onClick={() => getDataFunction(item.id)} /> 
                      <input type="button" className='buttonTable delete'
                      value={deleteValue} onClick={() => getDataFunction(item.id)}/>
                     </td>
                  </tr>
                 </tbody>
                )
              )
            }
          </table>
         </div>
    )
  }
}