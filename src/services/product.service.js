import { api } from "./api";

export const productService = {
  getProducts: (limit, skip) => {
    return api(`/products?limit=${limit}&skip=${skip}`);
  },

  searchProducts: (query, limit, skip) => {
    return api(`/products/search?q=${query}&limit=${limit}&skip=${skip}`);
  },

  getProductById: (id) => {
    return api(`/products/${id}`);
  },
};
