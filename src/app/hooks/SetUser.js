import api from "@/services/api";

export const signup = async (request_name, request_country, request_email, request_password) => {
   const response = await api.post( "/signup", {
      name: request_name,
      country: request_country,
      email: request_email,
      password: request_password
   });
   
   return response;
}