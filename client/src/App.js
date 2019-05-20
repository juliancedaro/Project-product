import React, { Component } from 'react';
import './App.css';
import ProductsTable from './components/table';
import Form from './components/form';
import { Provider } from 'react-redux'; 
import store from './redux/store';


class App extends Component{
    
  render = () => {
    return (
      <Provider store={store}>
        <div className="container">
          <div>
            <ProductsTable
              className="table"
            />
          </div>
          <div>
          <br/>
            <Form
            />
          </div>
        </div>
      </Provider>
    )
  }
}


export default App;
