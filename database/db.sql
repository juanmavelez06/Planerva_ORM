CREATE DATABASE planerva;

-- Budget

-- Personal
CREATE TABLE budgetpersonals (
    id INT(11) NOT NULL AUTO_INCREMENT,
    area VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    classing VARCHAR(50) NOT NULL,
    account INT(20) NOT NULL,
    refsalary INT(50) NOT NULL,
    facperformance INT(10) NOT NULL, 
    workersneeded VARCHAR(255) NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
    PRIMARY KEY(id)
);

--Identificador CSV
CREATE TABLE storecsvs (
    id int (11) NOT NULL auto_increment,
    datacsv VARCHAR (250) NOT NULL, 
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
    PRIMARY KEY(id)
);
