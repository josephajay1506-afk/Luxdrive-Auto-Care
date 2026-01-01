import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-900 text-white">
      <h1 className="text-xl font-bold">Luxury Car Service</h1>

      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/vehicles">Vehicles</Link>
            <Link to="/add-vehicle">Add Vehicle</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
