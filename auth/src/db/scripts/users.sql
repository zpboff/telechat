CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    createDate time with time zone default current_time,
    updateDate time with time zone default current_time
)