
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Sample } from "@/services/databaseService";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

interface SampleFormProps {
  sample?: Sample;
  onSubmit: (data: Sample) => void;
  onCancel: () => void;
  columns: string[];
}

const SampleForm = ({ sample, onSubmit, onCancel, columns }: SampleFormProps) => {
  const isEditing = !!sample?.id;
  
  const form = useForm<Sample>({
    defaultValues: sample || {},
  });

  useEffect(() => {
    if (sample) {
      // Reset form with sample data when editing
      form.reset(sample);
    } else {
      // Reset to empty for new record
      form.reset({});
    }
  }, [sample, form]);

  const handleSubmit = (data: Sample) => {
    onSubmit(data);
  };

  // Generate form fields based on columns
  const renderFormFields = () => {
    return columns.filter(col => col !== 'id').map(column => (
      <FormField
        key={column}
        control={form.control}
        name={column}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="capitalize">{column.replace(/_/g, ' ')}</FormLabel>
            <FormControl>
              {column === 'description' ? (
                <Textarea 
                  placeholder={`Enter ${column.replace(/_/g, ' ')}`} 
                  {...field} 
                  value={field.value || ''}
                />
              ) : (
                <Input 
                  placeholder={`Enter ${column.replace(/_/g, ' ')}`} 
                  {...field} 
                  value={field.value || ''}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Edit Record" : "Add New Record"}
        </h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {renderFormFields()}
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-dbBlue hover:bg-dbBlue-dark"
            >
              {isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SampleForm;
