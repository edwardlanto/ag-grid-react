import React, { useState, useContext } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { store } from "../store";

function SelectComponent() {
  const [filter, setFilter] = useState("All");
  const globalState = useContext(store);
  const { dispatch } = globalState;

  // Created a categories set for no duplicates
  const categories = globalState?.state.originalData.map((item) => item.category);
  let categoriesSet = Array.from(new Set(categories));

  const handleChange = (event) => {
    if (event.target.value === "All") {
      dispatch({
        type: "ALL"
      });
    } else {
      dispatch({
        type: "FILTER",
        value: event.target.value,
      });
    }
    setFilter(event.target.value);
  };

  return (
    <>
      <Select value={filter} onChange={handleChange} id="formSelect">
        <MenuItem value="All">All</MenuItem>
        {categoriesSet?.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default SelectComponent;
