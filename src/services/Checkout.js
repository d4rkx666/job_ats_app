import api from "./api";

export const create_subscription = async (data) => {
   const response = await api.post( "/create-subscription", data);
   return response.data;
}

export const attach_payment_method = async (data) => {
   const response = await api.post( "/attach-payment-method", data);
   return response.data;
}

export const payment_intent = async () => {
   const response = await api.post( "/payment-intent");
   return response.data;
}