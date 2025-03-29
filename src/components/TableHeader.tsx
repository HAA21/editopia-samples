
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TableHeaderProps {
  onAddNew: () => void;
}

const TableHeader = ({ onAddNew }: TableHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Samples Table</h1>
        <p className="text-gray-500 mt-1">
          View, search, edit and manage records from the samples table
        </p>
      </div>
      <Button 
        onClick={onAddNew}
        className="bg-dbBlue hover:bg-dbBlue-dark transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Record
      </Button>
    </div>
  );
};

export default TableHeader;
