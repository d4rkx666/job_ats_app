import api from "./api";
export const create_session = async () => {
   const response = await api.post( "/create-session");
   return response.data;
}