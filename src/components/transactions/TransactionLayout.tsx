
import React from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { LucideIcon } from "lucide-react";

interface TransactionLayoutProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
  illustration?: string;
}

const TransactionLayout: React.FC<TransactionLayoutProps> = ({
  children,
  icon,
  title,
  description,
  iconColor,
  illustration
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardNavbar />
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center">
            <div className={`h-6 w-6 ${iconColor} mr-2`}>
              {icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          
          {illustration && (
            <div className="w-full md:w-1/3 flex justify-center">
              <img 
                src={illustration} 
                alt="Financial illustration" 
                className="max-h-40 object-contain rounded-lg shadow-md transition-all hover:shadow-lg" 
              />
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TransactionLayout;
