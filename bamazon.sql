DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(256) NOT NULL,
  department_name VARCHAR(256) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crocs - White", "Shoes", 30, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crocs - Green", "Shoes", 30, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Limitless: 1 dose", "Enhancements", 1200, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gengar", "Pokemon", 7500, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", 199, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ocarina of Time", "Instruments", 3000, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Portal Gun", "Travel", 12, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flux Capacitor", "Travel", 1000, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DeLorean", "Vehicles", 35000, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Forbidden fruit", "Produce", 0, 99999);