import React, { createContext, useReducer } from "react";

const initialState = {
  data: [],
  filter: null,
};

function compare(arr, needles){
  let data = arr.filter((item, index) => )

  return [{category:'TEST', item:"TEST", price:"TEST"}]
}

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
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
          filter: action.value
        };

      case "DELETE":
        return {
          ...state,
          data: compare(state.data, action.rows),
          originalData: compare(state.data, action.rows)
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
