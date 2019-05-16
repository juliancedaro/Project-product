import React, { Component } from 'react';
import Input from '../components/inputs';
import Button from '../components/buttonsFooter';
import '../App.css';
import { getProducts as getProductsAction } from '../redux/Products/actions/getActions';
import { addProduct as addProductsAction } from '../redux/Products/actions/postActions';
import { updateProduct as updateProductAction} from '../redux/Products/actions/updateActions';
import { deleteProduct as deleteProductAction } from '../redux/Products/actions/deleteActions';
import { cleanInputs as cleanInputsAction } from  '../redux/Products/actions/handleActions';
import { 
  handleChangeName as handleChangeNameAction,
  handleChangePrice as handleChangePriceAction,
  handleChangeQuantity as handleChangeQuantityAction,
  } 
from '../redux/Products/actions/handleActions';
import { connect } from 'react-redux';

class Form extends Component {

  // getProducts = () => {
  //   getProducts()
  //     .then(response => response.json())
  //     .then(jsonResponse => {
  //       this.setState({ products: JSON.parse(jsonResponse.products) })
  //     })
  //   .catch(error => {
  //       console.log(error);
  //   });
  // } 
  // addProducts = () => {
  //   const {state, updateState} = this.props;
  //   addProduct(state.name, state.price, state.quantity)
  //   .then(response => response.json())
  //     .then(jsonResponse => {
  //       // console.log(jsonResponse);
  //       updateState({ products: [
  //         ...state.products,
  //         JSON.parse(jsonResponse.product) 
  //       ]})
  //       this.cleanInputs();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     }
  //   );
  // }
  // updateProduct = () => {
  //   const {state, updateState} = this.props;
  //   if(state.id){
  //     const r = window.confirm(`Do you want to update this product: ${state.name}?`);
  //     if(r){
  //       updateProduct(state.id, state.name, state.price, state.quantity)
  //       .then(response => response.json())
  //         .then(jsonResponse => {
  //           updateState({ 
  //             products: state.products.map((item) => {
  //             if(item.id === jsonResponse.response.id) {
  //               return{
  //                 ...item,
  //                 ...jsonResponse.response,
  //               }
  //             }
  //             return item
  //           }) 
  //         })
  //         this.cleanInputs();
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  //     }else{
  //       this.cleanInputs();
  //     }
  //   }else{
  //     alert('Impossible to update, ID is needed');
  //   }
  // }
  // deleteProduct = () => {
  //   const { state, updateState } = this.props;
  //   if(state.id){
  //     const r = window.confirm(`Do you want to delete this product ${state.name}?`);
  //     if(r){
  //       deleteProduct(state.id)
  //         .then(response => response.json())
  //           .then(jsonResponse => {
  //             console.log(jsonResponse);
  //             updateState({ 
  //               products: state.products.filter((item) => (item.id.toString() !== jsonResponse.productId))
  //             }) 
  //           })
  //       this.cleanInputs();
  //     }else{
  //       this.cleanInputs();
  //     }
  //   }else{
  //     alert('Impossible to delete, ID is needed');
  //   }
  // } 
  // cleanInputs = () => {
  //   const { updateState } = this.props;
  //   updateState({
  //     id: '',
  //     name: '',
  //     price: '',
  //     quantity: ''
  //   })
  // }

  render(){

    const{
      id,
      name,
      price,
      quantity,
      getProducts,
      addProducts,
      updateProduct,
      // deleteProduct,
      handleChangeName,
      handleChangePrice,
      handleChangeQuantity,
      cleanInputs
    } = this.props;

    return (
      <form>
        <div className="inputsForm">
          <Input 
            label={'Product ID'} 
            value={id}
            type={'text'} 
            placeholder={'Product ID...'}
            className={'inputData'}
            disabled={true}
          />
          <Input
            label={'Product Name'}
            value={name}
            type={'text'}
            placeholder={'Product Name...'}
            onChange={(e) => handleChangeName(e.target.value)}
            className={'inputData'}
            disabled={false}
            required={true}
          />
          <Input
            label={'Product Price'}
            value={price}
            type={'number'}
            placeholder={'Product Price...'}
            onChange={(e) => handleChangePrice(e.target.value)}
            className={'inputData'}
            disabled={false}
          />
          <Input
            label={'Quantity'}
            value={quantity}
            type={'number'}
            placeholder={'Quantity...'}
            onChange={(e) => handleChangeQuantity(e.target.value)}
            className={'inputData'}
            disabled={false} 
          /> 
        </div>
        <div className="footerButtons"><br/>
          <Button
          type={"button"}
            className={"button"}
            value={"Get"}
            onClick={getProducts}
          />
          <Button
            type={"button"}
            className={"button"}
            value={"Add"}
            onClick={() => addProducts(name, price, quantity)}
          />
          <Button
            type={"button"}
            className={"button"}
            value={"Update"}
            onClick={() => updateProduct(id, name, price, quantity)}
          />
          {/* <Button
            type={"button"}
            className={"button"}
            value={"Delete"}
            onClick={() => deleteProduct(id,name)}
          /> */}
          <Button
            type={"button"}
            className={"button"}
            value={"Clean"}
            onClick={cleanInputs}
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  id: state.products.id,
  name: state.products.name,
  price: state.products.price,
  quantity: state.products.quantity
})

export default connect (
  mapStateToProps,
  { getProducts: getProductsAction,
    addProducts: addProductsAction,
    updateProduct: updateProductAction,
    deleteProduct: deleteProductAction,
    handleChangeName: handleChangeNameAction,
    handleChangePrice: handleChangePriceAction,
    handleChangeQuantity: handleChangeQuantityAction,
    cleanInputs: cleanInputsAction
})(Form);
