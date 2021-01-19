import React, { createContext, useReducer } from "react";

const initialState = {
  data: [],
  originalData: []
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    console.log("Action", state.originalData);
    switch (action.type) {

      case "ADD":
        return {
          ...state,
          data: [...state.data, action.row],
          originalData: [...state.originalData, action.row]
        };

      case "FILTER":
        return {
          ...state,
          data: [...state.originalData].filter((item) => {
            return item.category === action.value
          }),
        };

      case "ALL":
        return {
          ...state,
          data: [...state.originalData]
        }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
