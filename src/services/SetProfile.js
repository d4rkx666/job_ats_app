import api from "./api";

export const save_personal_information = async (data) => {
   const response = await api.post( "/update-personal-information", data);
   
   return response.data;
}

export const save_skills = async (data) => {
   const response = await api.post( "/update-skills", data);
   
   return response.data;
}

export const save_profile = async (data) => {
   const response = await api.post( "/update-profile", data);
   
   return response.data;
}