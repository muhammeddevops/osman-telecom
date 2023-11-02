import api from "./axios-instance";

export function fetchAllProducts() {
  return api.get("/products").then(({ data }) => data.products);
}
