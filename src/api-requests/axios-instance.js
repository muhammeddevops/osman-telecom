import axios from 'axios';

// ! we had baseUrl instead of baseURL
// -> so req went to http://localhost:3000/products
// -> instead of http://localhost:3000/api/products
// ! in /api/products/route.js -> expected to return an object with a products array
const otApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default otApi;
