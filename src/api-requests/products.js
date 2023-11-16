import otApi from './axios-instance';
import products from '@/utils/db-products-list.json';

// Simulate loading by waiting 2 seconds before returning data
function wait(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}

export function fetchAllProducts() {
  // return new Promise((resolve) => resolve(products));
  return otApi.get('/products').then(({ data }) => data.products);
}

export function createProduct(product) {
  return otApi.post('/product', product).then(({ data }) => data.product);
}
