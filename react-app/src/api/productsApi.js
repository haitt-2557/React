import axiosClient from "../untils/axiosClient";

export const getProductsByCategory = async (category, filters) => {
  const payload = {
    categories_like: category,
  };
  const products = await axiosClient.get("products", {
    params: { ...filters, ...payload },
  });
  const productsInPage = await axiosClient.get("products", {
    params: { ...payload, _limit: 16, _page: 1 },
  });
  return {
    products: products?.data,
    productsInPage: productsInPage?.data,
    filters: { ...filters, ...payload },
  };
};

export const clearProductByCategory = async (filters) => {
  const payload = { ...filters };
  delete payload.categories_like;
  const products = await axiosClient.get("products", {
    params: payload,
  });
  const productsInPage = await axiosClient.get("products", {
    params: { ...payload, _limit: 16, _page: 1 },
  });
  return {
    products: products?.data,
    productsInPage: productsInPage?.data,
    filters: { ...payload },
  };
};
