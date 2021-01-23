import React, { createContext, useReducer } from "react";

const initialState = {
  data: [],
  deletedNodes: []
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          data: [...state.data, action.row]
        };

      case "DELETE":
         return{
          ...state,

          // Two states, one for filtered data and keep and original copy for ALL option
          data: state.data.filter(element => {
            return  element !== action.data
          })
         }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
