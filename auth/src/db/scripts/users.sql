CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    firstName text COLLATE pg_catalog."default" NOT NULL,
    lastName text COLLATE pg_catalog."default" NOT NULL,
    login text COLLATE pg_catalog."default" default uuid_generate_v4()::text,
    createDate timestamp with time zone default current_timestamp,
    updateDate timestamp with time zone default current_timestamp
)