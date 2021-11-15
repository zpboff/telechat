CREATE TABLE public.relationships
(
    id SERIAL PRIMARY KEY,
    createdate timestamp with time zone default current_timestamp,
    changedate timestamp with time zone default current_timestamp
);

CREATE TABLE public.relationshipstates
(
    id SERIAL PRIMARY KEY,
    relationshipid integer NOT NULL,
    userid integer NOT NULL,
    state integer,
    createdate timestamp with time zone default current_timestamp,
    CONSTRAINT userid_user FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT relationid_relationship FOREIGN KEY (relationshipid)
        REFERENCES public.relationships (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE public.relationshipmembers
(
    id SERIAL PRIMARY KEY,
    relationshipid integer NOT NULL,
    userid integer NOT NULL,
    CONSTRAINT userid_user FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT relationid_relationship FOREIGN KEY (relationshipid)
        REFERENCES public.relationships (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
