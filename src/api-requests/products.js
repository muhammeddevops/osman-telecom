import otApi from './axios-instance';

// Simulate loading by waiting 2 seconds before returning data
function wait(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}

export function fetchAllProducts() {
  return otApi.get('/products').then(({ data }) => data.products);
}

export function createProduct(product) {
  return otApi.post('/product', product).then(({ data }) => data.product);
}
