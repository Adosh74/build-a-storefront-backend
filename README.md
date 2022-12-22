# to start use this project follow this steps
## create .env file like .env_template and complet your informations
 #### 1 follow this command 
    - 1- yarn or npm install
    - 2- yarn migrate:run  or  npm run migrate:run or follow next step
    - 3- yarn start   -> to build code and start server
    - 4 - create two databases  store_dev  and  store_test

### step two (if want create database tables manually)
    - 1- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
         CREATE TABLE users(
            id uuid DEFAULT uuid_generate_v4(),
            email VARCHAR(60) UNIQUE,
            username VARCHAR(50) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL
        );

    - 2- CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price INTEGER NOT NULL,
            category VARCHAR(50) NOT NULL,
            quantity INTEGER NOT NULL
        );

    - 3- CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            product_id INTEGER,
            quantity INTEGER DEFAULT 1,
            user_email VARCHAR(60),
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
        );

## follow the routes.
    - 1- to create new user http://localhost:3000/api/users/  method POST
        send json object in body like this: {
                                                "email": "test@test.com",
                                                "username": "test",
                                                "firs_name": "test",
                                                "last_name": "test",
                                                "password": "123"
                                            } 

    - 2- to get all users http://localhost:3000/api/users method GET
        send bearer and token to access like this: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOTYzMzg1ZGQtNTU4Zi00N2NkLThjZTctOTI2ZTJmZGFmMGRiIiwiZW1haWwiOiJhbGlAZ21haWwuY29tIiwidXNlcm5hbWUiOiJoZW5kaSIsImZpcnN0X25hbWUiOiJBTEkiLCJsYXN0X25hbWUiOiJoYW1hZGEifSwiaWF0IjoxNjYxMzMwNjE5fQ.9sHiRvQNc3HaazKRQ670QfXK0_5C1l3uKGbrqMYppro

    - 3- to delete user http://localhost:3000/api/users/(id) method DELETE
        don't forget send the id in params and send the token

    - 4- to authenticate and access all routes http://localhost:3000/api/users/authenticate POST
        send user's email and password in body 

    - 5- to create product http://localhost:3000/api/products POST
        send the data of product in body like this: {
                                                        "name": "moca",
                                                        "price": 35,
                                                        "category": "drink",
                                                        "quantity": 2
                                                    }
                                
    - 6- to get all products http://localhost:3000/api/products GET

    - 7- to get product by id http://localhost:3000/api/products/(id)
        send id of product in pram



