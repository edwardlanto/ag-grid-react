import React, { Component } from "react";

function DeleteButton(props){

  const btnClickedHandler = () => {
    props.clicked(props.value);
  }
  
  return(
    <button onClick={btnClickedHandler}>Click Me!</button>
  )
}

export default DeleteButton;
