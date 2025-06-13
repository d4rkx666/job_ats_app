import api from "@/services/api";

export const save_resume = async (data) => {
   const response = await api.post( "/save-resume", data);
   return response.data;
}