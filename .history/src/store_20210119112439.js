import React, { createContext, useReducer } from "react";

const initialState = {
  data: [],
  originalData: [],
};

function removeArray(arr, needle){
  const left = arr.filter( (item, index) => {
    console.log("INDEX", index);
    console.log("needle", needle)
    return index !== needle
  })

  return left;
}

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    console.log('intiial state data', initialState.data)
    console.log('orignal', initialState.originalData)
    switch (action.type) {
      case "ADD":
        return {
          ...state,

          // Two states, one for filtered data and keep and original copy for ALL option
          data: [...state.data, action.row],
          originalData: [...state.originalData, action.row],
        };

      case "FILTER":
        return {
          ...state,
          data: state.data.filter((item) => {
            return item.category === action.value;
          }),
        };

      case "DELETE":
        return {
          ...state,
          data: removeArray([...state.data], action.row),
          originalData: removeArray([...state.originalData], action.row)
        };

      case "ALL":
        return {
          ...state,
          data: [...state.originalData],
        };

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
