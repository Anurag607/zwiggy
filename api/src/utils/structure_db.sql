CREATE TABLE restaurant (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    address VARCHAR(256),
    rating FLOAT(3, 2)
);

CREATE TABLE fooditem ( 
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(32) ,
    price float 
);

CREATE TABLE user (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    password VARCHAR(128) NOT NULL,
    phone_number VARCHAR(15),
    email VARCHAR(128) NOT NULL UNIQUE,
    user_type VARCHAR(16) NOT NULL,
    token VARCHAR(256)
);

CREATE TABLE customer (
    id INTEGER NOT NULL,
    address VARCHAR(256),
    FOREIGN KEY (id) REFERENCES user(id)
);

CREATE TABLE manager (
    id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES user(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
);

CREATE TABLE delivery_man (
    id INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES user(id)
);
