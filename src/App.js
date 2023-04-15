/** @format */

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbarr from "./components/Navbar/Navbarr";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import { StoreProvider } from "./context/StoreContext";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <StoreProvider>
          <Navbarr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </StoreProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
