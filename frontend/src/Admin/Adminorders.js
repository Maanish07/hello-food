import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Header from "./Header";
import { Footer } from "../components/Footer";

const Adminorders = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/menuitem")
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const handleCheckboxChange = (index) => {
    if (!order[index].disabled) {
      const updatedOrder = [...order];
      updatedOrder[index].completed = !updatedOrder[index].completed;
      if (updatedOrder[index].completed) {
        updatedOrder[index]["Completed at"] = new Date().toISOString();
      } else {
        updatedOrder[index]["Completed at"] = null;
      }
      updatedOrder[index].disabled = true;
      setOrder(updatedOrder);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <ul className="list-none">
          {order.map((orderItem, index) => (
            <li
              key={index}
              className="bg-gray-100 border border-gray-200 p-4 mb-2 rounded"
            >
              <input
                type="checkbox"
                checked={orderItem.completed}
                onChange={() => handleCheckboxChange(index)}
                disabled={orderItem.disabled}
                className="mr-2"
              />
              <span
                className={orderItem.completed ? "line-through" : ""}
              >
                {orderItem.name} {orderItem.quantity}
              </span>
              <span className="text-gray-500 ml-2">
                Created at: {new Date().toLocaleString()}
              </span>
              {orderItem.completed && (
                <span className="text-green-600 ml-2">
                  Completed at: {new Date(orderItem["Completed at"]).toLocaleString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Adminorders;
