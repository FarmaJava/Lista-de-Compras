import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>🛒 Lista de Compras</h1>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/pendientes">Pendientes</Link>
        <Link to="/comprados">Comprados</Link>
      </div>
    </nav>
  );
}

export default Navbar;
