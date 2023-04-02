CREATE DATABASE planerva;

-- Budget

-- Personal
CREATE TABLE budgetpersonal (
    id INT(11) NOT NULL AUTO_INCREMENT,
    area VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    classing VARCHAR(50) NOT NULL,
    account INT(20) NOT NULL,
    refsalary INT(50) NOT NULL,
    incsalary INT(10) NOT NULL,
    auxtransport INT(50) NOT NULL,
    workersneeded VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

