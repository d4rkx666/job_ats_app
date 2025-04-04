import api from "./api";

export const set_new_resume = async (data) => {
   const response = await api.post( "/api/v1/create-resume", data);
   return response.data;
}