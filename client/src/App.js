import React, { Component } from 'react';
import './App.css';

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

    getData(id) {
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
    console.log('products', products)
    return (
      <div className="container">
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
                    <td className="tdOptions">
                      <input type="button" className='buttonTable edit' value="Edit" 
                      onClick={() => this.getData(item.id)} /> 
                      <input type="button" className='buttonTable delete'
                       value="delete" onClick={() => this.getData(item.id)}/>
                     </td>
                  </tr>
                 </tbody>
                )
              )
            }
          </table>
        </div>
        <form className="productForm">
           <div className="row">
              <div className="col-25"><br/>
                <label>Product ID</label>
              </div>
              <div className="col-75">
                <input 
                  type="text"
                  className="inputData"
                  value={this.state.id}
                  placeholder="Insert ID..." 
                  disabled
                /><br/>
              </div>
           </div>
          <div className="row">
            <div className="col-25">
              <label>Product Name</label>
            </div>
            <div className="col-75">
              <input type="text"
                  value={this.state.name}
                  className="inputData"
                  placeholder="Insert Product..."
                  onChange={this.handleChangeName}
               /><br/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Price</label>
            </div>
            <div className="col-75">
               <input type="number"
               className="inputData"
               value={this.state.price}
               placeholder="Insert Price..."
               onChange={this.handleChangePrice}
               /><br/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Quantity</label>
            </div>
            <div className="col-75">
              <input type="number"
               className="inputData"
               value={this.state.quantity}
               placeholder="Insert Quantity..."
               onChange={this.handleChangeQuantity}
               /><br/>
            </div>
          </div> 
          <div className="rowButtons"><br/>
            <input type="button" className="button" value="Add" onClick={this.addProduct}/>
            <input type="button" className="button" value="Get" onClick={this.getProducts}/>
            <input type="button" className="button" value="Update" onClick={this.updateProduct}/>
            <input type="button" className="button" value="Delete" onClick={this.deleteProduct}/>
            <input type="button" className="button" value="clean" onClick={this.cleanInputs}/>
          </div>
        </form>
      </div>
    )
  }
}


export default App;
