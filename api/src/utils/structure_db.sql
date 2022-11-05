CREATE TABLE restaurant (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    address VARCHAR(256),
    rating FLOAT(3, 2)
);
CREATE table FoodItem 
( id int(5) NOT NULL PRIMARY KEY,
 item_name VARCHAR(30) ,
 price float );