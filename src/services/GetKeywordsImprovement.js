import api from "./api";

export const get_keywords_optimization = async (data) => {
   const response = await api.post( "/api/v1/extract-keywords", data);
   return response.data;
}