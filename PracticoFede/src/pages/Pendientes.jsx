import { useState } from "react";
import Item from "../components/Item";

function Pendientes({ products, setProducts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    NombreProducto: "",
    Precio: "",
    categ: "",
    link: "",
    comprado: false,
  });

  const handleAdd = () => {
    setProducts([
      ...products,
      { ...formData, Precio: Number(formData.Precio) },
    ]);
    setFormData({ NombreProducto: "", Precio: "", categ: "", link: "", comprado: false });
    setIsOpen(false);
  };

  return (
    <div className="block">
      <h2>Productos Pendientes</h2>
      <div className="list">
        {products.filter(p => !p.comprado).map(producto => (
          <Item
            key={producto.id}
            producto={producto}
            comprado={producto.comprado}
            onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
            onToggle={(prod) =>
              setProducts(
                products.map(p =>
                  p.id === prod.id ? { ...p, comprado: !p.comprado } : p
                )
              )
            }
          />
        ))}
      </div>

      {/* Botón abrir modal */}
      <div className="actions">
        <button className="action-btn add-btn" onClick={() => setIsOpen(true)}>
          +
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="overlay">
          <div className="floating-window">
            <h2>Agregar Producto</h2>
            <div className="containerADD">
              <p>Nombre:</p>
              <input
                type="text"
                value={formData.NombreProducto}
                onChange={(e) =>
                  setFormData({ ...formData, NombreProducto: e.target.value })
                }
              />
              <p>Precio:</p>
              <input
                type="number"
                value={formData.Precio}
                onChange={(e) =>
                  setFormData({ ...formData, Precio: e.target.value })
                }
              />
              <p>Id:</p>
              <input
                type="number"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
              />
              <p>Categoría:</p>
              <select
                value={formData.categ}
                onChange={(e) =>
                  setFormData({ ...formData, categ: e.target.value })
                }
              >
                <option value="">Seleccione</option>
                <option value="Comida">Comida</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Otros">Otros</option>
              </select>
              <p>Link de imagen:</p>
              <input
                type="text"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </div>

            <div className="actions">
              <button className="action-btn add-btn" onClick={handleAdd}>
                ✔
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pendientes;
