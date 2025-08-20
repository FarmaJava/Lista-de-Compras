const Item = ({ producto, onDelete, onToggle, comprado }) => {
    return (
        <div className="list-item">
        <img src={producto.link} alt={producto.NombreProducto} />
        <p>id: #{producto.id}</p>
        <p>Nombre: {producto.NombreProducto}</p>
        <p>Precio: ${producto.Precio}</p>
        <p>Categoria: {producto.categ}</p>

        <button 
            onClick={() => onDelete(producto.id)} 
            className="action-btn delete-btn"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zm3.46-7.12l1.41-1.41L12 11.59l1.12-1.12 
            1.41 1.41L13.41 13l1.12 1.12-1.41 1.41L12 14.41l-1.12 1.12-1.41-1.41L10.59 13 9.46 11.88zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
            </svg>
        </button>

        {!comprado && (
            <div>
            <input
                type="checkbox"
                id={producto.id + '-chk'}
                className="checkbox"
                onChange={() => onToggle(producto)}
            />
            <label htmlFor={producto.id + '-chk'} className="checkbox-label"></label>
            </div>
        )}
        </div>
    );
    };

export default Item;
