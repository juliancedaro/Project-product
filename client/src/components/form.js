import React, { Component } from 'react';
import Input from '../components/inputs';
import Button from '../components/buttonsFooter';
import '../App.css';
import { getProducts, addProduct, updateProduct, deleteProduct }  from '../api';

export default class Form extends Component {

  getProducts = () => {
    getProducts()
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({ products: JSON.parse(jsonResponse.products) })
      })
    .catch(error => {
        console.log(error);
    });
  } 
  addProducts = () => {
    const {state, updateState} = this.props;
    addProduct(state.name, state.price, state.quantity)
    .then(response => response.json())
      .then(jsonResponse => {
        // console.log(jsonResponse);
        updateState({ products: [
          ...state.products,
          JSON.parse(jsonResponse.product) 
        ]})
        this.cleanInputs();
      })
      .catch(error => {
        console.log(error);
      }
    );
  }
  updateProduct = () => {
    const {state, updateState} = this.props;
    if(state.id){
      const r = window.confirm(`Do you want to update this product: ${state.name}?`);
      if(r){
        updateProduct(state.id, state.name, state.price, state.quantity)
        .then(response => response.json())
          .then(jsonResponse => {
            updateState({ 
              products: state.products.map((item) => {
              if(item.id === jsonResponse.response.id) {
                return{
                  ...item,
                  ...jsonResponse.response,
                }
              }
              return item
            }) 
          })
          this.cleanInputs();
        })
        .catch(error => {
          console.log(error);
        })
      }else{
        this.cleanInputs();
      }
    }else{
      alert('Impossible to update, ID is needed');
    }
  }

  deleteProduct = () => {
    const { state, updateState } = this.props;
    if(state.id){
      const r = window.confirm(`Do you want to delete this product ${state.name}?`);
      if(r){
        deleteProduct(state.id)
          .then(response => response.json())
            .then(jsonResponse => {
              console.log(jsonResponse);
              updateState({ 
                products: state.products.filter((item) => (item.id.toString() !== jsonResponse.productId))
              }) 
            })
            this.cleanInputs();
      }else{
        this.cleanInputs();
      }
    }else{
      alert('Impossible to delete, ID is needed');
    }
  } 

  handleChangeName = (e) => {
    const { updateState } = this.props;
    updateState({
        name: e.target.value
    })  
  }

  handleChangePrice = (e) => {
    const { updateState } = this.props;
    updateState({
        price: e.target.value
    })  
  }

  handleChangeQuantity = (e) => {
    const { updateState } = this.props;
    updateState({
        quantity: e.target.value
    })    
  }

  cleanInputs = () => {
    const { updateState } = this.props;
    updateState({
      id: '',
      name: '',
      price: '',
      quantity: ''
    })
  }

  render(){
    const{
      state,
    } = this.props;

  return (
    <form>
      <div className="inputsForm">
        <Input 
          label={'Product ID'} 
          value={state.id}
          type={'text'} 
          placeholder={'Product ID...'}
          className={'inputData'}
          disabled={true}
        />
        <Input
          label={'Product Name'}
          value={state.name}
          type={'text'}
          placeholder={'Product Name...'}
          getData={this.handleChangeName}
          className={'inputData'}
          disabled={false}
        />
        <Input
          label={'Product Price'}
          value={state.price}
          type={'number'}
          placeholder={'Product Price...'}
          getData={this.handleChangePrice}
          className={'inputData'}
          disabled={false}
        />
        <Input
          label={'Quantity'}
          value={state.quantity}
          type={'number'}
          placeholder={'Quantity...'}
          getData={this.handleChangeQuantity}
          className={'inputData'}
          disabled={false} 
        />  
      </div>
      <div className="footerButtons"><br/>
      <Button
        type={"button"}
        className={"button"}
        value={"Get"}
        onClick={this.getProducts}
      />
      <Button
        type={"button"}
        className={"button"}
        value={"Add"}
        onClick={this.addProducts}
      />
      <Button
        type={"button"}
        className={"button"}
        value={"Update"}
        onClick={this.updateProduct}
      />
      <Button
        type={"button"}
        className={"button"}
        value={"Delete"}
        onClick={this.deleteProduct}
      />
      <Button
        type={"button"}
        className={"button"}
        value={"Clean"}
        onClick={this.cleanInputs}
      />
    </div>
  </form>
  )
  }
}