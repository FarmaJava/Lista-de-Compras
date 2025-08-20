import { useState, useEffect } from 'react';
import Item from './Item';

function App() {
  const [showAddPend, setShowAddPend] = useState(false);
  const openWindowPend = () => setShowAddPend(true);
  const closeWindowPend = () => setShowAddPend(false);

  const [precioComprados, setPrecioComprados] = useState(0);


  const [newProductPendError, setNewProductPendError] = useState('');
  const [pendMoveError, setPendMoveError] = useState('');

    // lista completa de pendientes (no se toca nunca salvo para agregar o eliminar)
  const [productsPendAll, setProductsPendAll] = useState([
    {
      id: '002',
      NombreProducto: 'Joystick DualSense PLayStation 5',
      Precio: '3500',
      categ: 'Electrodomestico',
      link: 'https://gmedia.playstation.com/is/image/SIEPDC/dualsense-controller-product-thumbnail-01-en-14sep21?$facebook$'
    }
  ]);

  const moverAComprados = (producto) => {
    const existeEnProductos = products.some((p) => p.id === producto.id);

    if (existeEnProductos) {
      setPendMoveError('No se puede mover: ya existe un producto con ese ID en Almacenados.');
      return;
    }

    // actualizar ambas listas (la completa y la filtrada)
    setProductsPendAll((prev) => prev.filter((p) => p.id !== producto.id));
    setProductsPend((prev) => prev.filter((p) => p.id !== producto.id));

    setProducts((prev) => [...prev, producto]);
    setPendMoveError('');
  };

  const [products, setProducts] = useState([
    {
      id: '001',
      NombreProducto: 'Auriculares JBL',
      Precio: '3000',
      categ: 'Electrodomestico',
      link: 'https://axnsport.com/wp-content/uploads/2024/12/01.JBL_Tune-520BT_Product-Image_Hero_Black.png'
    }
  ]);



  const [productsPend, setProductsPend] = useState([...productsPendAll]);
  const [newProductPend, setNewProductPend] = useState({
    id: '',
    NombreProducto: '',
    Precio: '',
    categ: '',
    link: ''
  });

  const handleNewProductPendChange = (e) => {
    const { name, value } = e.target;
    setNewProductPend((prev) => ({ ...prev, [name]: value }));
    if (newProductPendError) setNewProductPendError('');
  };

  const addlistPend = () => {
    if (!newProductPend.id.toString().trim() || !newProductPend.NombreProducto.trim() || !newProductPend.Precio.toString().trim()) {
      setNewProductPendError('ID, Nombre y Precio son obligatorios.');
      return;
    }

    const idExists =
      products.some((p) => p.id === newProductPend.id) ||
      productsPendAll.some((p) => p.id === newProductPend.id);

    if (idExists) {
      setNewProductPendError('Ya existe un producto con esa ID.');
      return;
    }

    const nuevo = { ...newProductPend };
    setProductsPendAll((prev) => [...prev, nuevo]);
    setProductsPend((prev) => [...prev, nuevo]);
    setNewProductPend({ id: '', NombreProducto: '', Precio: '', categ: 'Carne', link: '' });
    setNewProductPendError('');
    closeWindowPend();
  };

  const filtrarCategoria = (categoria) => {
    if (categoria === "todos") {
      setProductsPend([...productsPendAll]);
    } else {
      const filtrados = productsPendAll.filter((a) => a.categ === categoria);
      setProductsPend(filtrados);
    }
  };

  useEffect(() => {
  const total = products.reduce((acum, producto) => acum + parseFloat(producto.Precio), 0);
  setPrecioComprados(total);
  }, [products]);

  return (
    <>
      <h1 className="title">Lista de Compras</h1>
      <div className="container">
        <div className="block">
          <h2>Productos Almacenados</h2>
          <div className="list">
            {products.map((prod) => (
              
              <Item 
                key={prod.id}
                producto={prod}
                onDelete={(id) => setProducts(prev => prev.filter(p => p.id !== id))}
                comprado={true}
              />
            ))
            
            } 
          </div>
          <div className="actions">
              <h2>Precio total: {precioComprados}</h2>
          </div>
        </div>

        {/* Pendientes */}
        <div className="block">
          <h2>Pendientes</h2>
          <div className='categoria'>
            <p>Categorias</p>
            <select id="Categorias" onChange={(e) => filtrarCategoria(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="Carne">Carne</option>
              <option value="Pescado">Pescado</option>
              <option value="Electrodomestico">Electrodomestico</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Frutas">Frutas</option>
              <option value="Condimentos">Condimentos</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className="list">
            {productsPend.map((prod) => (
              <Item 
                key={prod.id}
                producto={prod}
                onDelete={(id) => {
                  setProductsPendAll(prev => prev.filter(p => p.id !== id));
                  setProductsPend(prev => prev.filter(p => p.id !== id));
                }}
                onToggle={moverAComprados}
                comprado={false}
              />
            ))}
          </div>
          {pendMoveError && <p className="error">{pendMoveError}</p>}
          <div className="actions">
            <button className="action-btn add-btn" onClick={openWindowPend}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 11H13V5h-2v6H5v2h6v6h2v-6h6z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showAddPend && (
        <div className="overlay">
          <div className="floating-window">
            <h2>Agregar Nuevo Pendiente</h2>
            <form className="containerADD" onSubmit={(e) => { e.preventDefault(); addlistPend(); }}>
              <p>ID</p>
              <input type="number" name="id" value={newProductPend.id} onChange={handleNewProductPendChange} />
              <p>Nombre</p>
              <input type="text" name="NombreProducto" value={newProductPend.NombreProducto} onChange={handleNewProductPendChange} />
              <p>Precio</p>
              <input type="number" name="Precio" value={newProductPend.Precio} onChange={handleNewProductPendChange} />
              <p>Categoría</p>
              <select name="categ" value={newProductPend.categ} onChange={handleNewProductPendChange}>
                <option value="-"> --- </option>
                <option value="Carne">Carne</option>
                <option value="Pescado">Pescado</option>
                <option value="Electrodomestico">Electrodomestico</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Herramientas">Herramientas</option>
                <option value="Frutas">Frutas</option>
                <option value="Condimentos">Condimentos</option>
                <option value="Otros">Otros</option>
              </select>
              <p>Imagen de referencia</p>
              <input type="url" name="link" value={newProductPend.link} onChange={handleNewProductPendChange} />
              {newProductPendError && <p className="error">{newProductPendError}</p>}
              <button type="submit">Añadir</button>
              <button type="button" onClick={() => { setNewProductPendError(''); closeWindowPend(); }}>Cerrar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
