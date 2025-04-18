import api from "./api";

export const CallLogin = async (request_email, request_password) => {
  try{

    const response = await api.post("/login", {
      email: request_email,
      password: request_password
    });
    if(response.data.auth === true){
      return response;
    }else{
      throw new Error("Authentication failed");
      
    }
    
  }catch(error){
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
}