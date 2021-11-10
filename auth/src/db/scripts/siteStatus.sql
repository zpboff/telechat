CREATE TABLE public.statuses
(
    id SERIAL PRIMARY KEY,
    reason text COLLATE pg_catalog."default" NOT NULL,
    siteAccessible boolean default false
);

CREATE TABLE public.siteStatus
(
    id SERIAL PRIMARY KEY,
    statusId SERIAL NOT NULL,
    createDate timestamp with time zone default current_timestamp,
    CONSTRAINT fk_status FOREIGN KEY(statusId) REFERENCES statuses(id)
);