CREATE TABLE public.tokens
(
    id SERIAL PRIMARY KEY,
    email text COLLATE pg_catalog."default" NOT NULL,
    token text COLLATE pg_catalog."default" NOT NULL,
    createDate timestamp with time zone default current_timestamp,
    accessDate timestamp with time zone default current_timestamp,
    expirationDate timestamp with time zone NOT NULL
)