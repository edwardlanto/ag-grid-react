import React, { createContext, useReducer } from "react";

const initialState = {
  data: [],
  originalData: [],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          data: [...state.data, action.row],
          originalData: [...state.originalData, action.row]
        };

      case "DELETE":
        return {
          ...state,

          data: state.data.filter((element) => {
            return element !== action.data;
          }),

          originalData: state.originalData.filter((element) => {
            return element !== action.data;
          })
        };

      case "ALL":
        return {
          ...state,

          data: [...state.originalData],
        };

      case "FILTER":
        return {
          ...state,

          data: state.originalData.filter((item) => {
            return item.category === action.value;
          })
        };

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
