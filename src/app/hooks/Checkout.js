import api from "@/services/api";
export const create_session = async () => {
   const response = await api.post( "/create-session");
   return response.data;
}

export const create_portal_session= async () => {
   const response = await api.post( "/create-portal-session");
   return response.data;
}