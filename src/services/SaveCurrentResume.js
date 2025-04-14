import api from "./api";

export const save_resume = async (data) => {
   const response = await api.post( "/save-resume", data);
   return response.data;
}