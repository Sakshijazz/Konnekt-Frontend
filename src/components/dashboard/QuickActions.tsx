
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, ArrowDownLeft, ArrowUpRight, ArrowLeftRight, CreditCard, Settings } from "lucide-react";

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  color: string;
}

const QuickActionButton = ({ icon, label, path, color }: QuickActionProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-24 bg-white/80 backdrop-blur-sm hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
      onClick={() => navigate(path)}
    >
      <div className={`h-8 w-8 mb-2 ${color}`}>
        {icon}
      </div>
      <span>{label}</span>
    </Button>
  );
};

const QuickActions = () => {
  const actions: QuickActionProps[] = [
    {
      icon: <ArrowDownLeft />,
      label: "Deposit",
      path: "/deposit",
      color: "text-green-600"
    },
    {
      icon: <ArrowUpRight />,
      label: "Withdraw",
      path: "/withdraw",
      color: "text-red-600"
    },
    {
      icon: <ArrowLeftRight />,
      label: "Transfer",
      path: "/transfer",
      color: "text-blue-600"
    },
    {
      icon: <CreditCard />,
      label: "Add Card",
      path: "/add-card",
      color: "text-purple-600"
    },
    {
      icon: <Settings />,
      label: "Settings",
      path: "/settings",
      color: "text-gray-600"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Activity className="mr-2 h-5 w-5 text-indigo-500" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action, index) => (
          <QuickActionButton 
            key={index}
            icon={action.icon}
            label={action.label}
            path={action.path}
            color={action.color}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
