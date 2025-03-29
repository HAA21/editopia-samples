
import { useState, useEffect } from "react";
import { databaseService, Sample } from "@/services/databaseService";
import TableHeader from "@/components/TableHeader";
import DataTable from "@/components/DataTable";
import SampleForm from "@/components/SampleForm";
import { toast } from "sonner";

const Index = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSample, setEditingSample] = useState<Sample | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch data and columns
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch columns first (table structure)
      const columnsData = await databaseService.getColumns();
      setColumns(columnsData);
      
      // Then fetch the actual data
      const samplesData = await databaseService.getSamples();
      setSamples(samplesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load database information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle creating a new record
  const handleAddNew = () => {
    setEditingSample(undefined);
    setIsFormVisible(true);
  };

  // Handle editing an existing record
  const handleEdit = (sample: Sample) => {
    setEditingSample(sample);
    setIsFormVisible(true);
  };

  // Handle deleting a record
  const handleDelete = async (id: number) => {
    try {
      await databaseService.deleteSample(id);
      // Refresh data after delete
      fetchData();
    } catch (error) {
      console.error("Error deleting sample:", error);
    }
  };

  // Handle form submission (both new and edit)
  const handleFormSubmit = async (data: Sample) => {
    try {
      if (editingSample?.id) {
        // Update existing record
        await databaseService.updateSample(editingSample.id, data);
      } else {
        // Add new record
        await databaseService.addSample(data);
      }
      // Refresh data and close form
      fetchData();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Handle canceling the form
  const handleFormCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 mx-auto px-4">
        <TableHeader onAddNew={handleAddNew} />
        
        {/* Show form when adding/editing */}
        {isFormVisible ? (
          <div className="mb-8">
            <SampleForm
              sample={editingSample}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              columns={columns}
            />
          </div>
        ) : null}
        
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : (
          <DataTable
            data={samples}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
