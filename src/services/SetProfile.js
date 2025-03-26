import api from "./api";

export const save_profile = async (data) => {
   const response = await api.post( "/api/v1/update-profile", data);
   
   return response;
}