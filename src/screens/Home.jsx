import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Slideshow from "../Components/Slideshow";
import Items from "../Components/Items";
import Header1 from "../Components/Header1";

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0], response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Header />
      {/* <Slideshow/> */}
      <section className=" angry-grid  mt-11 w-fit   gap-5">
        {foodCat != [] ? (
          foodCat.map((data) => {
            return (
              <>
                {/* <span key={data._id} className=" border-2 border-yellow-500">
                  <span  className="text-4xl mx-2">
                    {data.CategoryName}
                  </span>
                  <hr />
                </span> */}
                {foodItem != [] ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName)
                    .map((filterItem) => {
                      return (
                        <div key={filterItem._id}>
                          <Items
                            foodDetails={filterItem}
                            options={filterItem.options[0]}
                            about={filterItem.description}
                          />
                        </div>
                      );
                    })
                ) : (
                  <>
                    <h4>No such data present</h4>
                  </>
                )}
              </>
            );
          })
        ) : (
          <>-------</>
        )}
      </section>
    </>
  );
};

export default Home;
