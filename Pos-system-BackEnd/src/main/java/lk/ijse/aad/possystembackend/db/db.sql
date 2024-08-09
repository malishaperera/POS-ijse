show databases;
use I_Pos;


CREATE TABLE Customer (
     id VARCHAR(255) PRIMARY KEY,
     name VARCHAR(255) ,
     address VARCHAR(255),
     salary INT
);


CREATE TABLE Item(
      itemId VARCHAR(255) PRIMARY KEY ,
      itemName VARCHAR(255),
      itemQty INT,
      itemPrice INT

);


CREATE TABLE Orders (
     orderId VARCHAR(255) PRIMARY KEY,
     orderDate DATE,
     customerId VARCHAR(255),
     itemId VARCHAR(255),
     itemPrice INT,
     orderQty INT,
     FOREIGN KEY (customerId) REFERENCES Customer(id),
     FOREIGN KEY (itemId) REFERENCES Item(itemId)
);