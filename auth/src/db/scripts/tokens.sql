CREATE TABLE public.tokens
(
    id SERIAL PRIMARY KEY,
    email text COLLATE pg_catalog."default" NOT NULL,
    token text COLLATE pg_catalog."default" NOT NULL,
    createDate time with time zone default current_time,
    accessDate time with time zone default current_time,
    lifeTime integer default 0
)