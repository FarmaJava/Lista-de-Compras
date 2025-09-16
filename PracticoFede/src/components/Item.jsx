const Item = ({ producto, onDelete, onToggle, comprado }) => {
  return (
    <div className="list-item">
      <img src={producto.link} alt={producto.NombreProducto} />
      <p>id: #{producto.id}</p>
      <p>Nombre: {producto.NombreProducto}</p>
      <p>Precio: ${producto.Precio}</p>
      <p>Categoría: {producto.categ}</p>

      <button
        onClick={() => onDelete(producto.id)}
        className="action-btn delete-btn"
      >
        🗑
      </button>

      {!comprado && (
        <div>
          <input
            type="checkbox"
            id={producto.id + "-chk"}
            className="checkbox"
            onChange={() => onToggle(producto)}
          />
          <label htmlFor={producto.id + "-chk"} className="checkbox-label">
            Marcar comprado
          </label>
        </div>
      )}
    </div>
  );
};

export default Item;
