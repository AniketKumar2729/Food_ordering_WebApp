import React, { createContext, useContext, useReducer } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          img: action.img,
          quantity: action.quantity,
          size: action.size,
        },
      ];
    case "REMOVE":
      let removeNewArr = [...state];
      removeNewArr.splice(action.index, 1);
      return removeNewArr;
    case "UPDATE":
      console.log("Updating item with ID:", action.id);
      console.log("New quantity:", action.quantity);
      console.log("New price:", action.price);
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            quantity: parseInt(action.quantity),
            price: parseInt(action.price),
          };
        } else {
          return item;
        }
      });
    // let updateNewArr = [...state];
    // updateNewArr.map((item) => {
    //   if (item.id === action.id) {
    //     return [
    //       {
    //         ...item,
    //         quantity: parseInt(action.quantity),
    //         price: parseInt(action.price),
    //       },
    //     ];
    //   } else return item;
    // });
    case "DROP":
      let emptyArr = [];
      return emptyArr;
    default:
      console.log("error in reducer");
  }
};
export const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
