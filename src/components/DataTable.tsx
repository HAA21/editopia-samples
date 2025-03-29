
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Sample } from "@/services/databaseService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DataTableProps {
  data: Sample[];
  columns: string[];
  onEdit: (sample: Sample) => void;
  onDelete: (id: number) => void;
}

const DataTable = ({ data, columns, onEdit, onDelete }: DataTableProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 mb-4">No records found in the samples table.</p>
        <p className="text-sm text-gray-400">Add a new record to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full bg-white">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider"
              >
                {column.replace(/_/g, " ")}
              </th>
            ))}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={`${row.id}-${column}`} className="px-4 py-3 text-sm text-gray-500">
                  {column === "status" ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row[column] === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : row[column] === "Inactive" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {row[column]}
                    </span>
                  ) : (
                    row[column]
                  )}
                </td>
              ))}
              <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(row)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => confirmDelete(row.id as number)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AlertDialog open={deleteId !== null} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the record
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataTable;
