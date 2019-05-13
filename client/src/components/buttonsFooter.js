import React, { Component } from 'react';
import '../App.css';

export default class Button extends Component {
    
  render(){

    const{
      type,
      className,
      value,
      onClick
    } = this.props;

    return(
      <input 
        type={type}
        className={className}
        value={value} 
        onClick={onClick}
      />
    )
  }
}