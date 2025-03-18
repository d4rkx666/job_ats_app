import api from "./api";

export const getImprovedResume = async (formData) => {
   try{
      const response = await api.post( "/api/v1/optimize-resume", formData,
      {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      return response.data;
   }catch(error){
      throw error;
  }
}