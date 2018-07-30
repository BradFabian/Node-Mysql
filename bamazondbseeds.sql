DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)

);

SELECT * FROM products

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gibson Les Paul Standard", "Guitar", 800.99, 5 ),
       ("Fender Telecaster Special", "Guitar", 999.99, 10), 
       ("Martin D-45", "Guitar", 780.99, 8), 
       ("Epiphone SG", "Guitar", 399.99, 3), 
       ("MOOG Grandmother","Synthesizer", 899.00, 4), 
       ("Pearl EX725SPC KIT", "Drum Set", 649.99, 3), 
       ("Ludwig LC175 KIT", "Drum Set", 389.99, 1), 
       ("Pro Co Rat", "Distortion Pedal", 69.99, 2), 
       ("Boss Tube Screamer", "Distortion Pedal", 89.99, 6), 
       ("Dunlop Tortex Standard", "Guitar Picks", .89, 200);