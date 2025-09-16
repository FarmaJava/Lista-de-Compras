import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pendientes from "./pages/Pendientes";
import Comprados from "./pages/Comprados";

function App() {

    const [products, setProducts] = useState([
    {
      id: "001",
      NombreProducto: "Auriculares JBL",
      Precio: "3000",
      categ: "Electrodomestico",
      link: "https://axnsport.com/wp-content/uploads/2024/12/01.JBL_Tune-520BT_Product-Image_Hero_Black.png"
    }, {
      id: "002",
      NombreProducto: "Joystick DualSense PlayStation 5",
      Precio: "3500",
      categ: "Electrodomestico",
      link: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-controller-product-thumbnail-01-en-14sep21?$facebook$"
    }
  ]);


  const precioComprados = products
    .filter(p => p.comprado)
    .reduce((acc, p) => acc + Number(p.Precio), 0);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pendientes"
            element={<Pendientes products={products} setProducts={setProducts} />}
          />
          <Route
            path="/comprados"
            element={
              <Comprados
                products={products}
                setProducts={setProducts}
                precioComprados={precioComprados}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
