/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    user_email VARCHAR(60),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
);