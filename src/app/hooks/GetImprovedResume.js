import api from "@/services/api";

export const getImprovedResume = async (formData) => {
   const response = await api.post( "/optimize-resume", formData,
   {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });
   return response.data;
}