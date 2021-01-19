import React, { createContext, useReducer } from "react";

const initialState = {
  data: [],
  originalData: [],
};

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
          data: initialState.data.filter( (item, index) => index  !== action.index),
          originalData: initialState.originalData.filter( (item, index) => index !== action.index)
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
