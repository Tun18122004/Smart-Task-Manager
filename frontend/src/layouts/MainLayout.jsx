import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function MainLayout() {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-60 bg-white border-r flex flex-col">

        <div className="p-5 border-b">
          <p className="text-lg font-bold text-gray-900">
            Smart Task
          </p>
        </div>

        <nav className="p-3 space-y-1">
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/tasks">Tasks</NavItem>
        </nav>

        {/* USER */}
        <div className="p-4 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-600 hover:underline flex items-center justify-center"
          >
            Đăng xuất
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        <header className="bg-white border-b px-6 py-3 flex justify-between">
          <p className="text-lg font-semibold text-gray-900">
            Workspace
          </p>

          <div className="text-sm text-gray-700">
            {user?.email}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium ${
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}