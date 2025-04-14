import api from "./api";

export const get_pdf = async (formData) => {
   const response = await api.post( "/export-pdf", formData);
   return response.data;
}

export const get_docx = async (formData) => {
   const response = await api.post( "/export-docx", formData,{
      headers: {
         'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      },
      responseType: 'arraybuffer',
   });
   return response.data;
}