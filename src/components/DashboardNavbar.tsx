
import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">Bankify</span>
          </Link>
        </div>
        
        <div className="flex items-center lg:order-2">
          <Button 
            onClick={handleLogout} 
            variant="ghost" 
            className="text-red-600 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>
        
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link 
                to="/dashboard" 
                className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0 ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/transactions" 
                className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0 ${isActive('/transactions') ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link 
                to="/accounts" 
                className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0 ${isActive('/accounts') ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Accounts
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0 ${isActive('/settings') ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
