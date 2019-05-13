import React, { Component } from 'react';
import './App.css';
import ProductsTable from './components/table';
import Form from './components/form';

class App extends Component{
    state = {
      id: '',
      name: '',
      price: '',
      quantity: '',
      products: []
    };
    
  updateState = (data) => {
    this.setState({
      ...data,
    })
  }

  render = () => {
    return (
      <div className="container">
        <div>
          <ProductsTable
            className="table"
            editValue="Edit"
            deleteValue="Delete"
            state={this.state}
            updateState={this.updateState}
          />
         </div>
          <Form
            state={this.state}
            updateState={this.updateState}
          />
      </div>
    )
  }
}


export default App;
