
import React from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { LucideIcon } from "lucide-react";

interface TransactionLayoutProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

const TransactionLayout: React.FC<TransactionLayoutProps> = ({
  children,
  icon,
  title,
  description,
  iconColor
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <div className={`h-6 w-6 ${iconColor} mr-2`}>
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default TransactionLayout;
