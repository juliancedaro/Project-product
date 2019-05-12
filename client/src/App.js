import React, { Component } from 'react';
import './App.css';
import Input from './components/inputs';
import Button from './components/buttonsFooter';
import ProductsTable from './components/table';

class App extends Component{
    state = {
      id: '',
      name: '',
      price: '',
      quantity: '',
      products: []
    };

   getProducts = () => {

      fetch('http://localhost:9000/products')
        .then(response => response.json())
        .then(jsonResponse => {
          this.setState({ products: JSON.parse(jsonResponse.products) })
        })
        .catch(error => {
           console.log(error);
        });

    }

    addProduct = () => {
      fetch('http://localhost:9000/products', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": this.state.name,
          "price": this.state.price,
          "quantity": this.state.quantity
          })
        })
        .then(response => response.json())
        .then(jsonResponse => {
          // console.log(jsonResponse);
          this.setState({ products: [
            ...this.state.products,
            JSON.parse(jsonResponse.product) 
          ]})
          this.cleanInputs();
        })
        .catch(error => {
           console.log(error);
        });
    }

    updateProduct = () => {
      if(this.state.id){
      const id = this.state.id;
      fetch(`http://localhost:9000/products/${id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": this.state.name,
          "price": this.state.price,
          "quantity": this.state.quantity
        })
      })
      .then(response => response.json())
        .then(jsonResponse => {
          this.setState({ 
            products: this.state.products.map((item) => {
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
          // const index = products.findIndex(product => product.id === jsonResponse.response.id)
          // console.log('index', index)
          // products[index] = jsonResponse.response
        }else{
          alert('Impossible to update, ID is needed');
        }
    }

    deleteProduct = () => {
      if(this.state.id){
        const id = this.state.id;
        const r = window.confirm(`Do you want to delete this product?`);
        if(r === true){
        fetch(`http://localhost:9000/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'Application/json'
            }
          })
          .then(response => response.json())
            .then(jsonResponse => {
              console.log(jsonResponse);
                const { products } = this.state;
                this.setState({ 
                  products: products.filter((item) => (item.id.toString() !== jsonResponse.productId))
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
  
    componentDidMount(){
      this.getProducts();
    }

    handleChangeName = (e) => {
      this.setState({
          name: e.target.value
      })  
    }

    handleChangePrice = (e) => {
      this.setState({
          price: e.target.value
      })  
    }

    handleChangeQuantity = (e) => {
      this.setState({
          quantity: e.target.value
      })  
    }

    getData = (id) => {
      const { products } = this.state;
      const product = products.find(product => 
        product.id === id
      );
      // console.log(product);
      this.setState({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      })
    }

    cleanInputs = () => {
      this.setState({
        id: '',
        name: '',
        price: '',
        quantity: ''
      })
    }

  render(){
    const { products } = this.state
    console.log('id',this.state.id)
    return (
      <div className="container">
        <div>
          <ProductsTable
            products={products}
            className="table"
            editValue="Edit"
            deleteValue="Delete"
            getDataFunction={this.getData} 
          />
         </div>
        <form className="productForm">
          <Input 
            label={'Product ID'} 
            value={this.state.id}
            type={'text'} 
            placeholder={'Product ID...'}
            disabled={true}
          />
          <Input
            label={'Product Name'}
            value={this.state.name}
            type={'text'}
            placeholder={'Product Name...'}
            getData={this.handleChangeName}
            disabled={false}
          />
          <Input
            label={'Product Price'}
            value={this.state.price}
            type={'number'}
            placeholder={'Product Price...'}
            getData={this.handleChangePrice}
            disabled={false}
          />
          <Input
            label={'Quantity'}
            value={this.state.quantity}
            type={'number'}
            placeholder={'Quantity...'}
            getData={this.handleChangeQuantity}
            disabled={false} 
          />
          
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
              onClick={this.addProduct}
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
      </div>
    )
  }
}


export default App;
