create table users (
  id SERIAL primary key,
  full_name TEXT not null,
  phone TEXT not null UNIQUE,
  email TEXT not null UNIQUE,
  password TEXT not null,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX users_email_idx ON users (email);

CREATE TRIGGER update_users_updated_at_column 
BEFORE UPDATE ON users 
FOR EACH ROW EXECUTE PROCEDURE updated_at();


