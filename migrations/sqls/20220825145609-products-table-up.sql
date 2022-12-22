/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL
);