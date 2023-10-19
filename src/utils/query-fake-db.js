import db from "./fake-db.json";

export function getAllProducts() {
  return db.products;
}

export function getAllCustomers() {
  return db.customers;
}

export function getAllEmployees() {
  return db.employees;
}

export function getCustomerById(id) {
  return db.customers.find((customer) => customer.id === id);
}

export function getAllUsers() {
  return db.users;
}

export function getAllOrders() {
  return db.orders;
}

export function getOrderById(id) {
  return db.orders.find((order) => order.orderId === id);
}

export function getProductById(id) {
  return db.products.find((product) => product.id === id);
}

export function getAdmin(email, password) {
  return (
    db.users.find(
      (user) =>
        user.role === "superuser" &&
        user.email === email &&
        user.password === password
    ) || "Incorrect credentials"
  );
}

export function getUser(email, password) {
  return (
    db.users.find(
      (user) => user.email === email && user.password === password
    ) || "Incorrect credentials"
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
