import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Counter from "./Counter";
import { CartContext } from "../context/Cart";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { MenuList } from "./MenuList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";



export const Menuitem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [quantity, setQuantity] = useState();
  const [search, setSearch] = useState("");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const cart = useContext(CartContext);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4000/menuitem")
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const handleAddItem = (foodItem, quantity) => {
    dispatch(addItem(foodItem, quantity));
    toast.success(`${foodItem.name} added to cart!`);
    console.log("hello")
    
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleCheckboxChange = (event) => {
    setShowVegOnly(event.target.checked);
  };

  const filteredItems = showVegOnly
    ? foodItems.filter((item) => item.veg)
    : foodItems;

  const handleSearch = () => {
    console.log(search);
    const filterItem = foodItems.filter(
      (res) => res.name.includes(search)
    )
    setFoodItems(filterItem);
  }

  return (
    <>
      <div>
        <MenuList />
        <div className="flex flex-row items-center justify-around">
          <div class>

            <input
              type="checkbox"
              checked={showVegOnly}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="showVegOnly">Veg</label>
          </div>
          <div>
            <input
              className="px-3 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {foodItems.map((foodItem) => (
                <div key={foodItem.id} className="border :2px solid black">
                  <img src={foodItem.image} alt={foodItem.name} className="w-full" />
                  <div className="aspect-h-1 aspect-w-1 w-full border-2px black overflow-hidden rounded-lg  xl:aspect-h-8 xl:aspect-w-7">

                    <div className="flex justify-between">
                      <div >
                        {foodItem.bestsellers && (
                          <span className="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-l font-medium text-black relative top-0">
                            BestSellers
                          </span>
                        )}
                      </div>

                      <div>
                        {foodItem.veg ? (
                          <img src="/veg-icon.png" alt="Veg" className="h-5 w-5" />
                        ) : (
                          <img src="/nonveg-icon.png" alt="Non-Veg" className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl text-gray-700">{foodItem.name}</h3>

                  <p className="mt-1 text-lg font-medium text-gray-900"> ₹ {foodItem.price}</p>
                  <Counter value={quantity} onChange={handleQuantityChange} />
                  <button className="px-4 py-1.5 border border-gray-300 hover:bg-green-500 rounded-md shadow-md" onClick={() => handleAddItem(foodItem, quantity)}>Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
