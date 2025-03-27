import api from "./api";

export const save_personal_information = async (data) => {
   const response = await api.post( "/api/v1/update-personal-information", data);
   
   return response;
}

export const save_skills = async (data) => {
   const response = await api.post( "/api/v1/update-skills", data);
   
   return response;
}

export const save_profile = async (data) => {
   const response = await api.post( "/api/v1/update-profile", data);
   
   return response;
}