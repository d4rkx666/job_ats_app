import api from "@/services/api";

export const get_ats_score = async (data) => {
   const response = await api.post( "/reoptimize-resume", data);
   return response.data;
}