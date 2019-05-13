import React, { Component } from 'react';
import '../App.css';

export default class Input extends Component{
   
  render(){

    const{
      label,
      value,
      type,
      placeholder,
      className,
      getData,
      disabled
      } = this.props;
    
     return(
      <div className="row">
        <div className="col-25">
          <label>{label}</label>
        </div>
        <div className="col-75">
          <input 
            type={type}
            className={className}
            placeholder={placeholder}
            required
            value={value}
            onChange={getData}
            disabled={disabled}
          /><br/>
        </div>
      </div>
     )
  }
}
