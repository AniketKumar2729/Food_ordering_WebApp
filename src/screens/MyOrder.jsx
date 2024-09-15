import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

export default function MyOrder() {
  const [orderData, setOrderData] = useState("");
  const fetchMyOrder = async () => {
    try {
      await fetch("http://localhost:4000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
      }).then(async (res) => {
        let respose = await res.json();
        await setOrderData(respose);
      });
    } catch (error) {
      console.error("Error fetching order data:", error.message);
    }
    //console.log(localStorage.getItem("userEmail"));
  };
  useEffect(()=>{fetchMyOrder()},[])
  return (
    <>
      <Header />
      <section className="border-2 border-sky-500 mt-14">
        Order History
        {orderData != {}
          ? Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData) => {
                        return (
                          <div>
                            {arrayData.Order_date ? (
                              <div>
                                {(data = arrayData.Order_date)}
                                <hr />
                              </div>
                            ) : (
                              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img
                                  className="rounded-t-lg"
                                  src={arrayData.img}
                                  alt="food image"
                                />
                                <div className="p-5">
                                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {arrayData.name}
                                  </h5>
                                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Quanity={arrayData.quantity} and Size= {arrayData.size}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      });
                    })
                : "";
            })
          : ""}
      </section>
      {/* <section className="border-2 border-sky-500 mt-14 min-w-fit flex flex-col gap-1">
        {orderData != {}
          ? Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData) => {
                        return (
                          <>
                            {arrayData.Order_data ? (
                              <>
                                <h3 className="absolute  mt-1 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                                  Order On {arrayData.Order_data}
                                </h3>
                                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                              </>
                            ) : (
                              <>
                                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                  <img
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                    src={arrayData.img}
                                    alt="food"
                                  />
                                  <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                      {arrayData.name}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                      Here are the biggest enterprise technology
                                      acquisitions of 2021 so far, in reverse
                                      chronological order.
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        );
                      });
                    })
                : "";
            })
          : ""}
      </section> */}
      {/* <section className="border-2 border-sky-500 mt-14 min-w-fit flex flex-col gap-1">
        {orderData.length > 0 &&
          orderData.map((data, index) => (
            <div key={index}>
              {data.orderData &&
                data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item, index) => (
                    <div key={index}>
                      {item.map((arrayData, index) => (
                        <div key={index}>
                          {arrayData.Order_data ? (
                            <>
                              <h3 className="absolute mt-1 px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                                Order On {arrayData.Order_data}
                              </h3>
                              <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                            </>
                          ) : (
                            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" key={index}>
                              <img
                                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                src={arrayData.img}
                                alt="food"
                              />
                              <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {arrayData.name}
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                  Here are the biggest enterprise technology
                                  acquisitions of 2021 so far, in reverse
                                  chronological order.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
          ))}
      </section> */}
    </>
  );
}
