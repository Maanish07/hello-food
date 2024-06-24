import React, { useState, useEffect } from "react";
import axios from "axios";
import Counter from "../components/Counter";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Dinein } from "../options/Dinein";
import { Delivery } from "../options/Delivery";
import { Takeaway } from "../options/Takeaway";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from "flowbite-react";



export const Cart = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleRemove = (foodItem) => {
    dispatch(removeItem(foodItem));
    toast.success(`${foodItem.name} removed from cart!`);
  };
  console.log("foodItem", {cartItems})
  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleRepeat = (foodItem) => {
    dispatch(addItem(foodItem));
  };

  const total = cartItems.reduce((sum, foodItem) => sum + foodItem.price *quantity, 0);
  return (
    <>
      <Header />
      <div>
        <h1>Cart Items</h1>
        <div className="">
          <button className="px-4 py-1.5 text-bold border border-gray-300 bg-red-800 hover:bg-red-500 hover : text-white rounded-md shadow-md" onClick={handleClear}>Clear</button>
          <button onClick={handleRepeat}>Repeat</button>
        </div>

        <div className="grid justify-strech">
          <table className="table-auto border-collapse border border-gray-200 mt-8">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100 border border-gray-200">Item</th>
                <th className="px-4 py-2 bg-gray-100 border border-gray-200">Name</th>
                <th className="px-4 py-2 bg-gray-100 border border-gray-200">Quantity</th>
                <th className="px-4 py-2 bg-gray-100 border border-gray-200">Price</th>
                <th className="px-4 py-2 bg-gray-100 border border-gray-200">Action</th>
              </tr>
            </thead>

            <tbody >
              {cartItems.map((foodItem) => (
                <tr key={foodItem._id}>
                  <td className="px-4 py-2 border border-gray-200">
                    <img src={foodItem.image} alt={foodItem.name} className="w-16 h-auto" />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">{foodItem.name}</td>
                  <td className="px-4 py-2 border border-gray-200">
                    <Counter value={quantity} onChange={handleQuantityChange} />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">₹ {foodItem.price * quantity}</td>
                  <td className="px-4 py-2 border border-gray-200">
                    <button className="px-4 py-1.5 border border-gray-300 hover:bg-green-500 rounded-md shadow-md" onClick={() => handleRemove(foodItem)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h5>Total Price: {total}</h5>
      </div>
      <ToastContainer />
    <Tabs aria-label="Pills" style="pills">
      <Tabs.Item active title="Tab 1">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 1</p>
      </Tabs.Item>
      <Tabs.Item title="Tab 2">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 2</p>
      </Tabs.Item>
      <Tabs.Item title="Tab 3">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 3</p>
      </Tabs.Item>
      <Tabs.Item title="Tab 4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 4</p>
      </Tabs.Item>
      <Tabs.Item disabled title="Tab 5">
        <p className="text-sm text-gray-500 dark:text-gray-400">Content 5</p>
      </Tabs.Item>
    </Tabs>



      <Footer />
    </>
  );
};

export default Cart;