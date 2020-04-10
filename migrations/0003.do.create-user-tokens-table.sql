CREATE TABLE user_access_tokens (
  id serial PRIMARY KEY,
  user_id int NOT NULL REFERENCES users (id),
  token text NOT NULL UNIQUE,
  expires_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP + interval '6h',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX user_tokens_expires_at_idx ON user_access_tokens (expires_at);
CREATE INDEX user_tokens_uid_idx ON user_access_tokens (user_id);
CREATE INDEX user_tokens_token_idx ON user_access_tokens (token);

CREATE TRIGGER update_user_access_tokens_updated_at_column
  BEFORE UPDATE ON user_access_tokens
  FOR EACH ROW
  EXECUTE PROCEDURE updated_at();

