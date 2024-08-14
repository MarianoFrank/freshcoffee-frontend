export const formatPrice = (cant) =>
  cant.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });
