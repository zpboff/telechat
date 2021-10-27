CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    createDate timestamp with time zone default current_timestamp,
    updateDate timestamp with time zone default current_timestamp
)