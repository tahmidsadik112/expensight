CREATE USER exsuser WITH ENCRYPTED PASSWORD 'root';

CREATE DATABASE expensight;

GRANT ALL PRIVILEGES ON DATABASE expensight TO exsuser;