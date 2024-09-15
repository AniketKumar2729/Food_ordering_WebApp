import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";

export default function Cart() {
  let data = useCart();
  console.log("these elements are added to my cart\n");
  console.log(data);
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <>
        <div className="h-5/6 flex justify-center items-center text-4xl font-sans">
          <h4>No item in Cart!</h4>
        </div>
      </>
    );
  }
  let totalPrice = data.reduce((total, food) => {
    console.log("Price:", food.price);
    return total + parseFloat(food.price), 0;
  });

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:4000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("Order Response:", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  return (
    <>
      <div className=" border-2 border-red-500 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => {
              return (
                <tr
                  key={data._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{food.name}</td>
                  <td className="px-6 py-4">{food.quantity}</td>
                  <td className="px-6 py-4">{food.size}</td>
                  <td className="px-6 py-4">{food.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <img
                        width="26"
                        height="26"
                        src="https://img.icons8.com/glyph-neue/64/trash.png"
                        alt="trash"
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className=" border-2 border-green-500 my-2 flex justify-start ">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </>
  );
}
