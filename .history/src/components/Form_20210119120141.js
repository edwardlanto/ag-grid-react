import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Select } from "@material-ui/core/";
import { useForm } from "react-hook-form";
import { store } from "../store";
import MenuItem from '@material-ui/core/MenuItem';

function Form() {
  // Form constants
  const { register, handleSubmit, errors } = useForm();
  const [categories, setCategories] = useState([]);
  // Global state of tree
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const onSubmit = (data) => {
    try {

      dispatch({
        type: "ADD",
        row: data,
      });
  
    if(categories.includes(data.category)) return;
    setCategories([...categories, data.category]);
      
    } catch (err) {
      console.log("err", err);
    }
  };

  // Select Form

  const handleChange = (e) => {
    try{
      if(e.target.value === 'all'){
        dispatch({
          type: "ALL"
        });
      }else{
        dispatch({
          type: "FILTER",
          value: e.target.value
        });
      }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <input
              name="item"
              ref={register({ required: true })}
              placeholder="Item"
            />
            {errors.item && <div className="error">Item is required</div>}
          </Grid>
          <Grid item xs={3}>
            <input
              name="category"
              ref={register({ required: true })}
              placeholder="Category"
            />
            {errors.category && <div className="error">Category is required</div>}
          </Grid>
          <Grid item xs={3}>
            <input
              name="price"
              ref={register({ pattern: /^-?\d+\.?\d*$/ })}
              placeholder="Price"
            />
            {errors.price && <div className="error">Price is needs to be a number</div>}
          </Grid>
          <Grid item xs={1}>
            <input type="submit" value="+" />
          </Grid>
        </Grid>
      </form>
        <Select
          onChange={handleChange}
          defaultValue="all"
        >
          <MenuItem value='all'>All</MenuItem>
          {categories.map((item, index)=> (
            <MenuItem value={item} key={index}>{item}</MenuItem>
          ))}
        </Select>
    </>
  );
}

export default Form;
