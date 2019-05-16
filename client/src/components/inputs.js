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
      onChange,
      disabled,
      required
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
            required={required}
            value={value}
            onChange={onChange}
            disabled={disabled}
          /><br/>
        </div>
      </div>
    )
  }
}
