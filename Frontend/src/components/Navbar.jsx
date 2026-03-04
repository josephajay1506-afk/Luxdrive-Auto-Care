import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ user, unreadCount, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Notifications", path: "/notifications" },
    { label: "Invoices", path: "/invoices" },
    { label: "Reports", path: "/reports" },
    { label: "Membership", path: "/membership" },
    { label: "Services", path: "/services" },
    { label: "Offers", path: "/offers" },
    { label: "Service Catalog", path: "/service-catalog" },
    { label: "Tuning", path: "/tuning-stages" },
    { label: "Contact", path: "/contact-us" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800 px-6 py-4 text-white">

      <div className="flex justify-between items-center">

        {/* LEFT - BRAND */}
        <h1
          onClick={() => navigate("/")}
          className="text-lg md:text-xl font-bold cursor-pointer"
        >
          LuxDrive Signature Auto Care
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex gap-6 text-sm text-gray-300 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative hover:text-white transition"
            >
              {link.label}

              {/* Notification badge */}
              {link.path === "/notifications" && unreadCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* User Info (Desktop Only) */}
          <div className="hidden md:block text-right leading-tight">
            <p className="text-xs text-gray-400">Welcome</p>
            <p className="font-semibold">{user?.name}</p>
          </div>

          {/* Membership Badge */}
          {user?.membership && (
            <span className="hidden sm:inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
              {user.membership.plan}
            </span>
          )}

          {/* Logout Button (Desktop Only) */}
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="lg:hidden mt-4 flex flex-col gap-4 border-t border-gray-800 pt-4 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="text-left text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;