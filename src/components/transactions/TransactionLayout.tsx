
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
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 h-60 w-60 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 h-60 w-60 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 h-40 w-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Main content */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
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
                className="max-h-40 object-contain rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105 duration-300" 
              />
            </div>
          )}
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 transition-all hover:shadow-lg border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TransactionLayout;
