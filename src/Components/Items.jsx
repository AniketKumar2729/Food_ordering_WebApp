import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Items(props) {
  let options = props.options;
  let priceOption = Object.keys(options);
  let dispatch = useDispatchCart();
  let data = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodDetails._id) {
        food = item;
        break;
      }
    }
    if (food.length !=[]) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodDetails._id,
          price: finalPrice,
          quantity:quantity,
        });
        return;
      } else if (food.size != size) {
        await dispatch({
          type: "ADD",
          id: props.foodDetails._id,
          name: props.foodDetails.name,
          price: finalPrice,
          img: props.foodDetails.img,
          quantity: quantity,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodDetails._id,
      name: props.foodDetails.name,
      price: finalPrice,
      img: props.foodDetails.img,
      quantity: quantity,
      size: size,
    });
    //console.log("here your item is added to my cart array\n");
    //console.log(data);
  };
  const priceRef = useRef();
  let finalPrice = quantity * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg w-fit h-5/6 object-fill"
            src={props.foodDetails.img}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props.foodDetails.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.about}
          </p>
          <select
            id="Quantity"
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setSize(e.target.value)}
            ref={priceRef}
          >
            {priceOption.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <select
            id="Quantity"
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setQuantity(e.target.value)}
          >
            {Array.from(Array(5), (e, i) => {
              return (
                <>
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                </>
              );
            })}
          </select>
          <span className=" my-1 text-xl font-bold text-gray-900 dark:text-white">
            Total Price :- <span> ₹{finalPrice}/-</span>
          </span>
          {/* <br /> */}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Buy
          </button>
          <button
            type="button"
            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
