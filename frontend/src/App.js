import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./screens/Home";
import MyOrder from "./screens/MyOrder";
import Signup from "./screens/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./screens/Cart";
import { CartProvider } from "./components/ContextReducer";
import Login from "./screens/Login";
import Admin from "./Admin/Admin";
import Adminorders from "./Admin/Adminorders";
import Privateroutes from "./Privateroutes";
import Expense from "./Admin/Expense";
import { useContext, useEffect, useState } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from 'react-redux'
import appStore from "./utils/store";
import { Menumanage } from "./Admin/Menumanage";

function App() {
  const {temp} = useContext(UserContext);

  const [userName,setUserName] = useState();
  useEffect (()=>{
    const data = {
      userName : "hello"
  
    }
    setUserName(data.name);
  },[])
  
  
  return (
    <>
    <Provider store = {appStore}>
    
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            
            <Route element={<Privateroutes />}>
              <Route path="/admin/user" element={<Admin />} />
              <Route path="/menu" element={<Menumanage />} />
              <Route path="/order" element={<Adminorders />} />
              <Route path="/expense" element={<Expense />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
      <h1>{temp}</h1>
    </Provider> 
    </>
  );
}

export default App;