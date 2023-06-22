create database Dashboard

-- for login users

CREATE TABLE Users (
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


-- for project details

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  value VARCHAR(50),
  status VARCHAR(20) NOT NULL
  
);