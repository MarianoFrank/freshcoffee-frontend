import { jwtDecode } from "jwt-decode";

export const formatPrice = (cant) =>
  cant.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });


export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const now = Date.now() / 1000; // Fecha actual en segundos
  return decodedToken.exp < now;
};