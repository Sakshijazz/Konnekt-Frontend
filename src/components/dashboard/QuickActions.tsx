
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Activity className="mr-2 h-5 w-5 text-indigo-500" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 bg-white/80 backdrop-blur-sm hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
          onClick={() => navigate("/deposit")}
        >
          <ArrowDownLeft className="h-8 w-8 mb-2 text-green-600" />
          <span>Deposit</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 bg-white/80 backdrop-blur-sm hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
          onClick={() => navigate("/withdraw")}
        >
          <ArrowUpRight className="h-8 w-8 mb-2 text-red-600" />
          <span>Withdraw</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 bg-white/80 backdrop-blur-sm hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
          onClick={() => navigate("/transfer")}
        >
          <ArrowLeftRight className="h-8 w-8 mb-2 text-blue-600" />
          <span>Transfer</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
