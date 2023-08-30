import db from './fake-db.json';

export function getAllProducts() {
  return db.products;
}

export function getProductById(id) {
  return db.products.find((product) => product.id === id);
}

export function getAdmin(email, password) {
  return (
    db.users.find(
      (user) =>
        user.role === 'superuser' &&
        user.email === email &&
        user.password === password
    ) || 'Incorrect credentials'
  );
}

export function getUser(email, password) {
  return (
    db.users.find(
      (user) => user.email === email && user.password === password
    ) || 'Incorrect credentials'
  );
}

// CRUD
// Add user
// Add product

// Copy to Test
// console.log('getAllProducts:', getAllProducts());
// console.log('getProductById:', getProductById(1));
// console.log('getAdmin:', getAdmin('superuser@email.com', 'Test123!'));
// console.log('getUser', getUser('basic@email.com', 'Test56!'));
