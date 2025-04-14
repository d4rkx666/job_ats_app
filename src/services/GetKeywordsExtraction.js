import api from "./api";

export const get_keywords_extraction = async (data) => {
   const response = await api.post( "/extract-keywords", data);
   return response.data;
}