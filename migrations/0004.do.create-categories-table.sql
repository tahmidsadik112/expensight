CREATE TABLE expense_categories (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    is_root boolean NOT NULL,
    ancestor_id int,
    is_published boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_expense_categories_updated_at_column
  BEFORE UPDATE ON expense_categories
  FOR EACH ROW
  EXECUTE PROCEDURE updated_at();