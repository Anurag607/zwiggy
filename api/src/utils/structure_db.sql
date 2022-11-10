CREATE TABLE restaurant (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    address VARCHAR(256),
    rating FLOAT(3, 2),
    city VARCHAR(256) NOT NULL
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

CREATE TABLE fooditem (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    item_name VARCHAR(30) ,
    cat_id INTEGER NOT NULL,
    price FLOAT,
    FOREIGN KEY (cat_id) REFERENCES category(id) 
 );
 
CREATE TABLE category (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    rest_id INTEGER NOT NULL,
    name VARCHAR(32) NOT NULL,FOREIGN KEY (rest_id) REFERENCES restaurant(id)
 );


