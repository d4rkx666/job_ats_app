import api from "./api";

export const feedback = async (request_stars, request_comment) => {
   const response = await api.post( "/api/v1/feedback", {
      stars: request_stars,
      comment: request_comment
   });
   
   return response;
}