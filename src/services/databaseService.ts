
import { toast } from "sonner";

export interface Sample {
  id?: number;
  [key: string]: any;
}

// This service would normally connect to a backend API, but for this example
// we'll simulate database operations with localStorage
export const databaseService = {
  async getColumns(): Promise<string[]> {
    try {
      // In a real app, this would be an API call to get table schema
      // For this example, we'll return some sample columns
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // These would come from the database schema
      // Removed status and created_at
      return ["id", "name", "description"];
    } catch (error) {
      console.error("Failed to fetch columns:", error);
      toast.error("Failed to load table structure");
      return [];
    }
  },

  async getSamples(): Promise<Sample[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, fetch from API
      const storedData = localStorage.getItem("samples");
      if (storedData) {
        return JSON.parse(storedData);
      }
      
      // Return sample data for first load
      // Removed status and created_at fields
      const sampleData = [
        { id: 1, name: "Sample 1", description: "First sample entry" },
        { id: 2, name: "Sample 2", description: "Second sample entry" },
        { id: 3, name: "Sample 3", description: "Third sample entry" },
      ];
      
      localStorage.setItem("samples", JSON.stringify(sampleData));
      return sampleData;
    } catch (error) {
      console.error("Failed to fetch samples:", error);
      toast.error("Failed to load data");
      return [];
    }
  },

  async addSample(sample: Sample): Promise<Sample> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const samples = await this.getSamples();
      
      // Generate new ID (in a real DB this would be automatic)
      const newId = samples.length > 0 
        ? Math.max(...samples.map(s => s.id || 0)) + 1 
        : 1;
      
      const newSample = { ...sample, id: newId };
      const updatedSamples = [...samples, newSample];
      
      localStorage.setItem("samples", JSON.stringify(updatedSamples));
      toast.success("Sample added successfully");
      return newSample;
    } catch (error) {
      console.error("Failed to add sample:", error);
      toast.error("Failed to add new record");
      throw error;
    }
  },

  async updateSample(id: number, updatedSample: Sample): Promise<Sample> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const samples = await this.getSamples();
      const index = samples.findIndex(s => s.id === id);
      
      if (index === -1) {
        throw new Error("Sample not found");
      }
      
      const updatedSamples = [...samples];
      updatedSamples[index] = { ...updatedSample, id };
      
      localStorage.setItem("samples", JSON.stringify(updatedSamples));
      toast.success("Sample updated successfully");
      return updatedSamples[index];
    } catch (error) {
      console.error("Failed to update sample:", error);
      toast.error("Failed to update record");
      throw error;
    }
  },

  async deleteSample(id: number): Promise<void> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const samples = await this.getSamples();
      const updatedSamples = samples.filter(s => s.id !== id);
      
      localStorage.setItem("samples", JSON.stringify(updatedSamples));
      toast.success("Sample deleted successfully");
    } catch (error) {
      console.error("Failed to delete sample:", error);
      toast.error("Failed to delete record");
      throw error;
    }
  }
};
