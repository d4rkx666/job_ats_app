import api from "./api";

export const fetchLogin = async (idToken) => {
  try{

    console.log("fetchlogin");
    const response = await api.get("/api/v1/login");
    console.log("fetchlogin response", response);
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