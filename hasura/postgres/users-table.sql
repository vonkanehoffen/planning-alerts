-- fed by "Add user to Hasura" rule in Auth0
create table users(
    id text primary key,
    name text,
    email text
);
