import React, { createContext, useReducer } from "react";

const initialState = {
  data: [],
  originalData: [],
};

function compare(arr, needles){
  let list = arr.map((item, i) => {
    if(item === needles[i]){
      console.log('item', item);
      console.log('needles', needles[i])
      return item;
    }
  });

  return list;
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
          data: state.originalData.filter((item) => {
            return item.category === action.value;
          }),
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
