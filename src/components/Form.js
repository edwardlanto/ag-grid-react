import React, { useContext, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import { store } from "../store";

function Form() {
  const [count, setCount] = useState(0);
  const latestValue = useRef(count);
  // Form constants
  const { register, handleSubmit, errors } = useForm();
  // Error state
  const [error, setError] = useState(null);
  // Global state of tree
  const globalState = useContext(store);

  const { dispatch } = globalState;

  const onSubmit = (data) => {


    setCount((prev) => {
      latestValue.current = prev + 1;
      return latestValue.current;
    });
    
    data.deleteId = count;
    try {
      dispatch({
        type: "ADD",
        row: data,
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={3}>
            <input
              name="item"
              ref={register({ required: true })}
              placeholder="Item"
            />
            {errors.item && <div className="error">Item is required</div>}
          </Grid>
          <Grid item sm={12} md={3}>
            <input
              name="category"
              ref={register({ required: true })}
              placeholder="Category"
            />
            {errors.category && (
              <div className="error">Category is required</div>
            )}
          </Grid>
          <Grid item sm={12} md={3}>
            <input
              name="price"
              ref={register({ pattern: /^-?\d+\.?\d*$/, required: true })}
              placeholder="Price"
            />
            {errors.price && (
              <div className="error">Price is needs to be a number</div>
            )}
          </Grid>
          <Grid item xs={1}>
            <input type="submit" value="+" />
          </Grid>
        </Grid>
      </form>
      <span className="error">{error && error}</span>
    </>
  );
}

export default Form;
