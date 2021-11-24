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
);

CREATE TABLE public.userImages
(
    id SERIAL PRIMARY KEY,
    userid integer NOT NULL,
    image bytea,
    createDate timestamp with time zone default current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE public.userInfo
(
    id SERIAL PRIMARY KEY,
    userid integer NOT NULL,
    contactEmail text COLLATE pg_catalog."default",
    contactPhone text COLLATE pg_catalog."default",
    photoId bytea,
    avatar bytea,
    birthdayDate timestamp with time zone,
    updateDate timestamp with time zone default current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id),
    CONSTRAINT fk_photo FOREIGN KEY(photoId) REFERENCES userImages(id)
);