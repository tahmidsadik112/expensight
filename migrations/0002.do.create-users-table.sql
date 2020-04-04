create table users (
  id SERIAL primary key,
  full_name TEXT not null,
  phone TEXT not null UNIQUE,
  email TEXT not null UNIQUE,
  password TEXT not null,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX users_email_idx ON users (email);

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


